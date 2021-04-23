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
    address: "0xb3d647380638baa6b569652758c11a5d5a28ce4d",
    abi: `[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"string","name":"_Title","type":"string"},{"internalType":"string","name":"_Link","type":"string"},{"internalType":"string","name":"_Hash","type":"string"}],"name":"AddModel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"CheckMyPermission","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_User","type":"address"}],"name":"CheckPermission","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GetModelsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_User","type":"address"}],"name":"GivePermission","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ReadModels","outputs":[{"components":[{"internalType":"string","name":"Title","type":"string"},{"internalType":"string","name":"Link","type":"string"},{"internalType":"string","name":"Hash","type":"string"}],"internalType":"struct ModelsLedger.ModelRecord[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"RemoveModel","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_User","type":"address"}],"name":"RevokePermission","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_User","type":"address"},{"internalType":"bool","name":"_Access","type":"bool"}],"name":"SetPermission","outputs":[],"stateMutability":"nonpayable","type":"function"}]`,

    readAllModels: function() {
        const web3 = new Web3(Web3Account.web3);
        const contract = new web3.eth.Contract(JSON.parse(this.abi), this.address);

        contract.methods.CheckMyPermission().call({ from: Web3Account.address }, function(err, data) {
            $("#models-list").empty();
            $("#selected-model").empty();
            $("#message").empty();

            if (err === null) {
                const accessGranted = data;

                if (accessGranted) {
                    $("#message").html(`<div class="alert alert-success" role="alert">Access granted!</div>`);

                    contract.methods.ReadModels().call({ from: Web3Account.address }, function(err, data) {
                        if (err === null) {
                            for (let i = 0; i < data.length; i++) {
                                const title = data[i][0];
                                const link = data[i][1];
                                const hash = data[i][2];
                                const annotation = data[i][3];
                                const industry = data[i][4];
                                const timestamp = data[i][5];

                                $("#models-list").append(`<a href="javascript:void(0);" 
                                        class="list-group-item list-group-item-action" 
                                        onclick="showModelData('${title}', '${link}', '${hash}', 
                                        '${annotation}', '${industry}', '${timestamp}');" data-toggle="list">${title}</a>`);
                            }
                        }
                    });
                } else {
                    $("#message").html(`<div class="alert alert-danger" role="alert">Access denied!</div>`);
                }
            } else {
                $("#message").html(`<div class="alert alert-danger" role="alert">${err}</div>`);
            }
        });
    }
};

// ==================================== Event-handling functions =======================================

const showModelData = function(title, link, hash, annotation, industry, timestamp) {
    timestamp = new Date(timestamp * 1000).toString();

    $("#selected-model").html(`
    <form>
        <div class="form-group row">
            <label for="model-title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="model-title" readonly value="${title}">
            </div>
        </div>
        <div class="form-group row">
            <label for="model-title" class="col-sm-2 col-form-label">Link</label>
            <div class="col-sm-10">
                <a class="btn btn-link" href="${link}" target="_blank" role="button">Link</a>
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
        <button type="button" class="btn btn-primary" onclick="checkAuthenticity('${link}', '${hash}');">Check Authenticity</button>
        <button type="button" class="btn btn-success" onclick="downloadModel('${link}', '${title}');">Downolad</button>
    </form>
    <br>
    <div id="authenticity-info"></div>
    <div class="canvas">
        <div id="js-canvas"></div>
    </div>`);

    const viewer = new BpmnJS({
        container: $('#js-canvas'),
        height: 600
    });

    $.ajax(link, { dataType: "text" }).done(async function(xml) {
        try {
            await viewer.importXML(xml);
            viewer.get('canvas').zoom('fit-viewport');
        } catch (err) {
            alert(err);
        }
    });
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
            $("#authenticity-info").html(`<div class="alert alert-success" role="alert">Business process model is authentic!</div>`);
        } else {
            $("#authenticity-info").html(`<div class="alert alert-danger" role="alert">Business process model is not authentic!</div>`);
        }
    });
}

const connectWeb3Provider = function() {
    Web3Account.connect();
};

const loginUsingWeb3 = function() {
    Web3Account.login();

    if (Web3Account.address === null) {
        Web3Account.address = "Please authorize to access your account";
    } else {
        const contractAddress = $("#contractAddr").val();
        const contractABI = $("#contractABI").val();

        if ((contractAddress !== undefined && contractAddress !== null && contractAddress.length > 0) &&
            (contractABI !== undefined && contractABI !== null && contractABI.length > 0)) {
            ModelsContractDAO.address = contractAddress;
            ModelsContractDAO.abi = contractABI;

            ModelsContractDAO.readAllModels();
        } else {
            $("#message").html(`<div class="alert alert-danger" role="alert">Smart contract cannot be accessed!</div>`);
        }
    }

    $("#user-address").text(Web3Account.address);
};

const encryptSHA256 = function() {
    const input = $("#original").val();
    const output = CryptoJS.SHA256(input).toString();
    $("#encrypted").val(output);
    return false;
}

// ========================================== Event-handlers ===========================================

$("#connect-web3").click(connectWeb3Provider);
$("#login-web3").click(loginUsingWeb3);
$("#use-sha256").click(encryptSHA256);

$("#message").append(`<div class="alert alert-warning" role="alert">Access undefined!</div>`);