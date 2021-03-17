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

    if (Web3Account.address !== null && rawAsset.length > 0) {
        const encryptedAsset = CryptoJS.AES.encrypt(rawAsset, Web3Account.address);

        $("#encrypted-asset").val(encryptedAsset);
    }
};

const decryptAsset = function(encryptedAsset) {
    if (Web3Account.address !== null) {
        return CryptoJS.AES.decrypt(encryptedAsset, Web3Account.address).toString(CryptoJS.enc.Utf8);
    }
}

const findAsset = function() {
    if (Web3Account.address !== null) {
        const tokenId = $("#asset-id").val();

        if (tokenId.length > 0) {
            const metaData = NeblioBlockchainDAO.getTokenMetadata(tokenId);
            const icon = NeblioBlockchainDAO.getTokenIcon(tokenId);

            for (let i = 0; i < metaData.length; i++) {
                const key = metaData[i]["key"];
                const value = metaData[i]["value"];

                switch (key) {
                    case "Title":
                        $("#model-title").val(value);
                        break;
                    case "File":
                        const decryptedAsset = decryptAsset(value);

                        $("#model-file").attr("onclick",
                            `window.open('${decryptedAsset}', 'newwindow', 'width=640,height=480'); return false;`);

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