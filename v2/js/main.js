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

const ModelsContractDAO = {
    address: "0x28285675fcc8750576C74bF5cA17529133804110",
    abi: `[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_link","type":"string"},{"internalType":"string","name":"_hash","type":"string"},{"internalType":"string","name":"_annotation","type":"string"},{"internalType":"string","name":"_industry","type":"string"}],"name":"addModel","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyTokens","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimAirdrop","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deploymentTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"modelsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"readModels","outputs":[{"components":[{"internalType":"string","name":"Title","type":"string"},{"internalType":"string","name":"Link","type":"string"},{"internalType":"string","name":"Hash","type":"string"},{"internalType":"string","name":"Annotation","type":"string"},{"internalType":"string","name":"Industry","type":"string"},{"internalType":"uint256","name":"DateTime","type":"uint256"}],"internalType":"struct ModelsCollection.ModelRecord[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sellTokens","outputs":[{"internalType":"uint256","name":"revenue","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setBuyPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setSellPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"revenue","type":"uint256"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}]`,

    getBalance: function() {
        const web3 = new Web3(Web3Account.web3);
        const contract = new web3.eth.Contract(JSON.parse(this.abi), this.address);

        contract.methods.balanceOf(Web3Account.address).call({ from: Web3Account.address }, function(err, data) {
            if (err === null) {
                $("#user-balance").text(data);
            } else {
                alert(err);
            }
        });
    },

    claimTokens: function() {
        const web3 = new Web3(Web3Account.web3);
        const contract = new web3.eth.Contract(JSON.parse(this.abi), this.address);

        contract.methods.claimAirdrop().send({ from: Web3Account.address }, (e, d) => {});
    },

    totalSupply: function() {
        const web3 = new Web3(Web3Account.web3);
        const contract = new web3.eth.Contract(JSON.parse(this.abi), this.address);

        contract.methods.totalSupply().call(null, function(err, data) {
            if (err === null) {
                $("#total-supply").text(data);
                const tokensTotal = data;

                contract.methods.buyPrice().call(null, function(err, data) {
                    if (err === null) {
                        const eth = tokensTotal * (data / 1000000000000000000);
                        $("#total-cap").text(eth);

                        $.get("https://api.coingecko.com/api/v3/coins/ethereum", function(data) {
                            const usd = data.market_data.current_price.usd;
                            $("#total-cap-usd").text((eth * usd).toFixed(2));
                        });
                    } else {
                        alert(err);
                    }
                });
            } else {
                alert(err);
            }
        });
    },

    buyPrice: function(eth, output) {
        const web3 = new Web3(Web3Account.web3);
        const contract = new web3.eth.Contract(JSON.parse(this.abi), this.address);

        contract.methods.buyPrice().call(null, function(err, data) {
            if (err === null) {
                $(output).val(parseInt(eth * 1000000000000000000 / data));
            } else {
                alert(err);
            }
        });
    },

    sellPrice: function(token, output) {
        const web3 = new Web3(Web3Account.web3);
        const contract = new web3.eth.Contract(JSON.parse(this.abi), this.address);

        contract.methods.sellPrice().call(null, function(err, data) {
            if (err === null) {
                $(output).val(token * data / 1000000000000000000);
            } else {
                alert(err);
            }
        });
    },

    liquidity: function() {
        const web3 = new Web3(Web3Account.web3);
        const contract = new web3.eth.Contract(JSON.parse(this.abi), this.address);

        web3.eth.getBalance(contract.options.address).then(v => {
            const balance = v / 1000000000000000000;
            $("#liquidity").text(balance);

            $.get("https://api.coingecko.com/api/v3/coins/ethereum", function(data) {
                const usd = data.market_data.current_price.usd;
                $("#liquidity-usd").text((balance * usd).toFixed(2));
            });
        });
    },

    buyTokens: function(eth) {
        const web3 = new Web3(Web3Account.web3);
        const contract = new web3.eth.Contract(JSON.parse(this.abi), this.address);

        contract.methods.buyTokens().send({ from: Web3Account.address, value: (eth * 1000000000000000000) },
            (e, d) => {});
    },

    sellTokens: function(tokens) {
        const web3 = new Web3(Web3Account.web3);
        const contract = new web3.eth.Contract(JSON.parse(this.abi), this.address);

        contract.methods.sellTokens(tokens).send({ from: Web3Account.address }, (e, d) => {});
    },

    readAllModels: function() {
        this.searchModels(null);
    },

    searchModels: function(searchText) {
        const web3 = new Web3(Web3Account.web3);
        const contract = new web3.eth.Contract(JSON.parse(this.abi), this.address);

        $("#models-list").empty();
        $("#selected-model").empty();

        contract.methods.readModels().call({ from: Web3Account.address }, function(err, data) {
            if (err === null) {
                if (data.length < 1) {
                    alert("Insufficient balance! Buy ETHBPMN tokens in the exchange or claim through the airdrop!");
                }

                for (let i = 0; i < data.length; i++) {
                    const title = data[i][0];
                    const link = data[i][1];
                    const hash = data[i][2];
                    const annotation = data[i][3];
                    const industry = data[i][4];
                    const timestamp = data[i][5];

                    let showModel = true;

                    if (searchText !== null) {
                        showModel = false;

                        if (title.toLowerCase().includes(searchText.toLowerCase()) ||
                            annotation.toLowerCase().includes(searchText.toLowerCase()) ||
                            industry.toLowerCase().includes(searchText.toLowerCase())) {

                            showModel = true;
                        }
                    }

                    if (showModel) {
                        $("#models-list").append(`<a href="javascript:void(0);" 
                            class="list-group-item list-group-item-action" 
                            onclick="showModelData('${title}', '${link}', '${hash}', 
                            '${annotation}', '${industry}', '${timestamp}');" data-toggle="list">${title}</a>`);
                    }
                }
            } else {
                alert(err);
            }
        });
    }
};

// ==================================== Event-handling functions =======================================

const showModelData = function(title, link, hash, annotation, industry, timestamp) {
    timestamp = new Date(timestamp * 1000).toString();

    $("#view-model").modal("show");

    $("#selected-model").html(`
    <form>
        <div class="form-group row">
            <label for="model-title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="model-title" readonly value="${title}">
            </div>
        </div>
        <div class="form-group row">
            <label for="model-hash" class="col-sm-2 col-form-label">Hash</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="model-hash" rows="3" readonly>${hash}</textarea>
            </div>
        </div>
        <div class="form-group row">
            <label for="model-annotation" class="col-sm-2 col-form-label">Annotation</label>
            <div class="col-sm-10">
                <textarea class="form-control" id="model-annotation" rows="5" readonly>${annotation}</textarea>
            </div>
        </div>
        <div class="form-group row">
            <label for="model-industry" class="col-sm-2 col-form-label">Industry</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="model-industry" readonly value="${industry}">
            </div>
        </div>
        <div class="form-group row">
            <label for="model-timestamp" class="col-sm-2 col-form-label">Timestamp</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="model-timestamp" readonly value="${timestamp}">
            </div>
        </div>
        <a href="javascript:void(0);" class="badge badge-pill badge-primary" onclick="checkAuthenticity('${link}', '${hash}');">Verify</a>
        <a href="javascript:void(0);" class="badge badge-pill badge-success" onclick="downloadModel('${link}', '${title}');">Downolad</a>
    </form>`);
}

const downloadModel = (link, title) => {
    $.ajax(link, { dataType: "text" }).done(async function(xml) {
        var element = document.createElement('a');
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(xml));
        element.setAttribute("download", title + ".bpmn");

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    });
};

const checkAuthenticity = function(link, hash) {
    $.get(link, function(data) {
        const content = data.trim();
        const check = CryptoJS.SHA256(content).toString();

        if (hash === check.toLowerCase()) {
            alert("Model is authentic!");
        } else {
            alert("Model is not authentic!");
        }
    });
}

const connectWeb3Provider = function() {
    $("#models-list").empty();
    $("#selected-model").empty();
    $("#search-text").val("");

    Web3Account.connect();
    loginUsingWeb3();
};

const loginUsingWeb3 = function() {
    Web3Account.login();

    if (Web3Account.address === null) {
        alert("Please authorize to access your account!");
    } else {
        $("#connect-web3").text(Web3Account.address.substring(0, 4) + "..." +
            Web3Account.address.substring(Web3Account.address.length - 4));
        ModelsContractDAO.getBalance();
        ModelsContractDAO.readAllModels();
    }
};

const encryptSHA256 = function() {
    const input = $("#original").val();
    const output = CryptoJS.SHA256(input).toString();
    $("#encrypted").val(output);
    return false;
}

const searchModel = () => {
    const searchText = $("#search-text").val();

    if (searchText !== undefined && searchText !== null && searchText.length > 0) {
        ModelsContractDAO.searchModels(searchText);
    } else {
        ModelsContractDAO.readAllModels();
    }
};

const claimTokens = () => {
    ModelsContractDAO.claimTokens();
};

const ethInputChange = () => {
    ModelsContractDAO.buyPrice($("#ethInput").val(), "#tokenOutput");
};

const tokenOutputChange = () => {
    ModelsContractDAO.sellPrice($("#tokenOutput").val(), "#ethInput");
};

const buyTokens = () => {
    ModelsContractDAO.buyTokens($("#ethInput").val());
};

const sellTokens = () => {
    ModelsContractDAO.sellTokens($("#tokenOutput").val());
};

// ========================================== Event-handlers ===========================================

$("#connect-web3").click(connectWeb3Provider);
$("#login-web3").click(loginUsingWeb3);
$("#use-sha256").click(encryptSHA256);

ModelsContractDAO.totalSupply();
ModelsContractDAO.liquidity();