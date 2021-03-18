// ============================================== Objects ==============================================

const Web3Account = {
    web3: window.ethereum,
    address: null,

    connect: function() {
        this.web3.enable();
    },

    login: function() {
        if (this.web3.isConnected()) {
            this.address = this.web3.selectedAddress;
        }
    }
};

const NeblioBlockchainDAO = {
    getTokenMetadata: function(tokenId) {
        const getTokenMetadataURL = "https://ntp1node.nebl.io/testnet/ntp1/tokenmetadata/" + tokenId;

        let tokenMetadata = null;

        $.ajaxSetup({ async: false });
        $.get(getTokenMetadataURL, function(data) {
            tokenMetadata = data.metadataOfIssuance.data.userData.meta;
        });

        return tokenMetadata;
    },

    getTokenIcon: function(tokenId) {
        const getTokenIconURL = "https://ntp1node.nebl.io/testnet/ntp1/tokenmetadata/" + tokenId;

        let tokenIcon = null;

        $.ajaxSetup({ async: false });
        $.get(getTokenIconURL, function(data) {
            tokenIcon = data.metadataOfIssuance.data.urls[0].url;
        });

        return tokenIcon;
    },

    getTokenIssuanceData: function(tokenId) {
        const getTokenIssuanceDataURL = "https://ntp1node.nebl.io/testnet/ntp1/tokenmetadata/" + tokenId;

        let tokenIssuanceData = null;

        $.ajaxSetup({ async: false });
        $.get(getTokenIssuanceDataURL, function(data) {
            tokenIssuanceData = {
                "address": data.issueAddress,
                "issuer": data.metadataOfIssuance.data.issuer,
                "tx": data.issuanceTxid
            };
        });

        return tokenIssuanceData;
    }
};

const LocalStorageDAO = {
    saveRegisteredAssets: function() {
        localStorage.removeItem("regAssets");
        localStorage.setItem("regAssets", $("#reg-list").html());
    },

    getRegisteredAssets: function() {
        $("#reg-list").html(localStorage.getItem("regAssets"));
    }
};

const EnterpriseModelsContractDAO = {
    address: "0x1fc7aba9679c8e35e723cc82f8b5e39889692198",

    abi: `[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"pAsset","type":"string"}],"name":"getPermission","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"pAddress","type":"address"},{"internalType":"string","name":"pAsset","type":"string"},{"internalType":"string","name":"pKey","type":"string"}],"name":"setPermission","outputs":[],"stateMutability":"nonpayable","type":"function"}]`,

    getPermission: function(assetId, decryption) {
        const web3 = new Web3(Web3Account.web3);
        const contract = new web3.eth.Contract(JSON.parse(this.abi), this.address);

        contract.methods.getPermission(assetId).call({ from: Web3Account.address }, function(err, data) {
            decryption(data);
        });
    }
};

// ==================================== Event-handling functions =======================================

const connectWeb3Provider = function() {
    Web3Account.connect();
};

const loginUsingWeb3 = function() {
    Web3Account.login();

    if (Web3Account.address === null) {
        Web3Account.address = "Please authorize to access your account";
    } else {
        $("#nav-tab").show();
        $("#nav-content").show();
    }

    $("#user-address").text(Web3Account.address);
};

const encryptAsset = function() {
    const rawAsset = $("#raw-asset").val();
    const key = $("#raw-key").val();

    if (Web3Account.address !== null && rawAsset.length > 0 && key.length > 0) {
        const encryptedAsset = CryptoJS.AES.encrypt(rawAsset, key);

        $("#encrypted-asset").val(encryptedAsset);
    }
};

const decryptAsset = function(encryptedAsset, key) {
    if (Web3Account.address !== null) {
        try {
            return CryptoJS.AES.decrypt(encryptedAsset, key).toString(CryptoJS.enc.Utf8);
        } catch {
            alert("Invalid decryption key!");
        }
    }
}

const findAsset = function() {
    if (Web3Account.address !== null) {
        const tokenId = $("#asset-id").val();

        if (tokenId.length > 0) {
            const metaData = NeblioBlockchainDAO.getTokenMetadata(tokenId);
            const icon = NeblioBlockchainDAO.getTokenIcon(tokenId);
            const issuanceData = NeblioBlockchainDAO.getTokenIssuanceData(tokenId);

            for (let i = 0; i < metaData.length; i++) {
                const key = metaData[i]["key"];
                const value = metaData[i]["value"];

                switch (key) {
                    case "Title":
                        $("#model-title").val(value);
                        break;
                    case "File":
                        EnterpriseModelsContractDAO.getPermission(tokenId, function(key) {
                            const decryptedAsset = decryptAsset(value, key);

                            $("#model-file").text(decryptedAsset);
                        });

                        break;
                    case "Industry":
                        $("#model-industry").val(value);
                        break;
                    case "Organization":
                        $("#model-organization").val(value);
                        break;
                    case "Type":
                        $("#model-type").val(value);
                        break;
                }
            }

            $("#asset-icon").html(`<br><img src="${icon}" width="300">`);

            $("#iss-addr").attr("href", "https://testnet-explorer.nebl.io/address/" + issuanceData.address);
            $("#iss-addr").text(issuanceData.issuer);

            $("#iss-tx").attr("href", "https://testnet-explorer.nebl.io/tx/" + issuanceData.tx);
            $("#iss-tx").text(issuanceData.tx);
        }
    }
};

const registerAsset = function() {
    if (Web3Account.address !== null) {
        const assetName = $("#reg-name").val();
        const assetId = $("#reg-id").val();

        if (assetName.length > 0 && assetId.length > 0) {
            $("#reg-list").append(`<nav aria-label="breadcrumb" id="asset-${assetId}">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page">
                        <div style="margin-bottom: 10px;">${assetName}</div>
                        <button type="button" class="btn btn-success btn-sm" onclick="loadAsset('${assetId}')">Load</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="removeAsset('${assetId}');">Remove</button>
                    </li>
                </ol>
            </nav>`);

            $("#reg-name").val("");
            $("#reg-id").val("");

            LocalStorageDAO.saveRegisteredAssets();
        }
    }
};

const loadAsset = function(assetId) {
    if (Web3Account.address !== null) {
        $("#asset-id").val(assetId);
        findAsset();
    }
};

const removeAsset = function(assetId) {
    $("#asset-" + assetId).remove();
    LocalStorageDAO.saveRegisteredAssets();
};

// ========================================== Event-handlers ===========================================

$("#connect-web3").click(connectWeb3Provider);
$("#login-web3").click(loginUsingWeb3);
$("#find-asset").click(findAsset);
$("#encrypt-asset").click(encryptAsset);
$("#reg-asset").click(registerAsset);

// ===================================== Actions when page loaded ======================================

$("#nav-tab").hide();
$("#nav-content").hide();

LocalStorageDAO.getRegisteredAssets();