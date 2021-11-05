// Contract address
const contractAddress = '0x3d5ad8ad8a40e1dfb0ea8254ad2e68df66b3dd87';

// Contract ABI
const contractABI = JSON.parse(`[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "contacts",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "hashURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "modelsCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "contact",
				"type": "string"
			}
		],
		"name": "publishContacts",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "modelURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "URIHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "statementsNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "syntInvalidNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "syntIncompleteNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "semInvalidNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "semIncompleteNum",
				"type": "uint256"
			}
		],
		"name": "publishModel",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "semantic",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "invalid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "incomplete",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "statements",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "syntactic",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "invalid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "incomplete",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]`);

// Infura provider
const infuraProvider = "https://ropsten.infura.io/v3/f9079a1b198f42369bf79d33e70a5eba";

/**
 * 
 * Find SHA-256 hash of the provided JSON document
 * 
 */
const findSHA256 = () => {
    const modelURI = $('#modelURI').val().trim();

    if (modelURI) {
        $.get(modelURI, function(data) {
            const hashValue = CryptoJS.SHA256(data).toString();

            $('#URIHash').val(hashValue);
        });
    }
};

/**
 * 
 * Publish a model as new minted NFT token.
 * 
 */
const publishModel = () => {
    try {
        // Injection of a Web3 provider (e.g. MetaMask)
        const web3 = new Web3(window.web3.currentProvider);

        // Contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const modelURI = $('#modelURI').val().trim();
        const URIHash = $('#URIHash').val().trim();

        const statementsNum = Number.parseInt($('#statementsNum').val());

        const syntInvalidNum = Number.parseInt($('#syntInvalidNum').val());
        const syntIncompleteNum = Number.parseInt($('#syntIncompleteNum').val());

        const semInvalidNum = Number.parseInt($('#semInvalidNum').val());
        const semIncompleteNum = Number.parseInt($('#semIncompleteNum').val());

        if (modelURI && URIHash &&
            (!Number.isNaN(statementsNum) &&
                !Number.isNaN(syntInvalidNum) && !Number.isNaN(syntIncompleteNum) &&
                !Number.isNaN(semInvalidNum) && !Number.isNaN(semIncompleteNum)) &&
            (statementsNum >= 0 &&
                syntInvalidNum >= 0 && syntIncompleteNum >= 0 &&
                semInvalidNum >= 0 && semIncompleteNum >= 0) &&
            ((syntInvalidNum + syntIncompleteNum) <= statementsNum &&
                (semInvalidNum && semIncompleteNum) <= statementsNum)) {

            // Sent transaction
            contract.methods.publishModel(
                modelURI,
                URIHash,
                statementsNum,
                syntInvalidNum,
                syntIncompleteNum,
                semInvalidNum,
                semIncompleteNum
            ).send({ from: window.ethereum.selectedAddress }).then(res => {});

            // Clear the input controls
            $('#modelURI').val('');
            $('#URIHash').val('');

            $('#statementsNum').val('');

            $('#syntInvalidNum').val('');
            $('#syntIncompleteNum').val('');

            $('#semInvalidNum').val('');
            $('#semIncompleteNum').val('');

            // Hide the modal window
            $('#publishModal').modal('hide');
        } else {
            alert('Model information should be set for publishing!');
        }
    } catch (err) {
        alert(err.message);
    }
};

/**
 * 
 * Publish your contacts information.
 * 
 */
const publishContacts = () => {
    try {
        // Injection of a Web3 provider (e.g. MetaMask)
        const web3 = new Web3(window.web3.currentProvider);

        // Contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const contactsInfo = $('#contactsInfo').val().trim();

        if (contactsInfo) {
            // Sent transaction
            contract.methods.publishContacts(contactsInfo).send({ from: window.ethereum.selectedAddress }).then(res => {});

            // Clear the input area
            $('#contactsInfo').val('');

            // Hide the modal window
            $('#contactsModal').modal('hide');
        } else {
            alert('Contacts information should be set for publishing!');
        }
    } catch (err) {
        alert(err.message);
    }
};

/**
 * 
 * Get address contacts.
 * 
 */
const reachOwner = (address) => {
    // Injection of a 3rd party Infura Web3 provider
    const web3 = new Web3(new Web3.providers.HttpProvider(infuraProvider));

    // Contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Get the total supply of NFT tokens
    contract.methods.contacts(address).call().then(contactsInfo => {
        // Display contacts
        $('#addressContacts').html(`<div class="form-group">
            <label for="addressInfo"><a href="https://ropsten.etherscan.io/token/${contractAddress}?a=${address}" target="_blank">${address}</a></label>
            <textarea class="form-control" id="addressInfo" rows="3" readonly style="border-radius: 1rem;">${contactsInfo}</textarea>
        </div>`);

        // Show window with contacts information
        $('#infoModal').modal('show');
    });
};

/**
 * 
 * Check model JSON document identity.
 * 
 */
const checkIdentity = (id) => {
    // Injection of a 3rd party Infura Web3 provider
    const web3 = new Web3(new Web3.providers.HttpProvider(infuraProvider));

    // Contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Get the total supply of NFT tokens
    contract.methods.hashURI(id).call().then(hashValue => {
        // Display contacts
        $('#identityData').html(`<div class="form-group">
            <label for="hashValue">Hash value</label>
            <textarea class="form-control" id="hashValue" rows="3" readonly style="border-radius: 1rem;">${hashValue}</textarea>
        </div>`);

        // Show window with contacts information
        $('#identityModal').modal('show');
    });
};

/**
 * 
 * When page is loaded display published models.
 * 
 */
$(document).ready(function() {
    try {
        // Injection of a 3rd party Infura Web3 provider
        const web3 = new Web3(new Web3.providers.HttpProvider(infuraProvider));

        // Contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Enable injected Web3 provider (if MetaMask or another used)
        if (window.ethereum !== undefined) {
            window.ethereum.enable();
        }

        const models = [];

        // Get the total supply of NFT tokens
        contract.methods.totalSupply().call().then(totalSupply => {

            // Iterate over supplied tokens by IDs
            for (let i = 0; i < totalSupply; i++) {
                models[i] = {
                    // NFT data
                    tokenId: i,
                    modelURI: null,
                    owner: null,

                    // Measures
                    statementsNum: 0,
                    syntInvalidNum: 0,
                    syntIncompleteNum: 0,
                    semInvalidNum: 0,
                    semIncompleteNum: 0
                };

                // Get token URI
                contract.methods.tokenURI(i).call().then(tokenURI => {
                    models[i].modelURI = tokenURI;

                    // Get token owner's address
                    contract.methods.ownerOf(i).call().then(ownerOf => {
                        models[i].owner = ownerOf;

                        // Get statements num of the model
                        contract.methods.statements(i).call().then(statementsNum => {
                            models[i].statementsNum = Number.parseFloat(statementsNum);

                            // Get syntactic quality measures
                            contract.methods.syntactic(i).call().then(syntactic => {
                                models[i].syntInvalidNum = Number.parseFloat(syntactic[0]);
                                models[i].syntIncompleteNum = Number.parseFloat(syntactic[1]);

                                // Get syntactic semantic measures
                                contract.methods.semantic(i).call().then(semantic => {
                                    models[i].semInvalidNum = Number.parseFloat(semantic[0]);
                                    models[i].semIncompleteNum = Number.parseFloat(semantic[1]);

                                    // Calculation of validity metrics
                                    const validity = {
                                        syntactic: () => 1 - models[i].syntInvalidNum / models[i].statementsNum,
                                        semantic: () => 1 - models[i].semInvalidNum / models[i].statementsNum
                                    };

                                    // Calculation of completeness metrics
                                    const completeness = {
                                        syntactic: () => 1 - models[i].syntIncompleteNum / models[i].statementsNum,
                                        semantic: () => 1 - models[i].semIncompleteNum / models[i].statementsNum
                                    };

                                    // Color badges for metrics
                                    const getColor = (value) => {
                                        return value >= 0.8 ? 'success' :
                                            value >= 0.63 ? 'warning' :
                                            'danger';
                                    };

                                    const syntValidity = getColor(validity.syntactic());
                                    const syntCompleteness = getColor(completeness.syntactic());

                                    const semValidity = getColor(validity.semantic());
                                    const semCompleteness = getColor(completeness.semantic());

                                    // Fetch the token metadata
                                    $.get(models[i].modelURI, function(data) {
                                        const modelURI = JSON.parse(data);

                                        // Render card with the model information
                                        $('#tokens').append(`<div class="col mb-4">
                                            <div class="card" style="border-radius: 1rem;">
                                                <div class="card-body">
													<img src="${modelURI.image}" class="card-img-top" alt="EtherBPMN NFT #${i}" data-toggle="modal" data-target="#nft${i}" style="cursor: pointer;">
                                                    <h5 class="card-title mt-2">
                                                        <a href="https://ropsten.etherscan.io/token/${contractAddress}?a=${i}" target="_blank" style="font-weight: bold;">EtherBPMN NFT #${i}</a>
                                                    </h5>
                                                    <p class="card-text">
                                                        <small><b>Name:</b> ${modelURI.name}</small>
                                                        <br>

                                                        <small><b>Description:</b> ${modelURI.description}</small>
                                                        <br>

                                                        <small><b>Owner:</b> <a href="https://ropsten.etherscan.io/token/${contractAddress}?a=${models[i].owner}" target="_blank">${models[i].owner}</a></small>
                                                        <br>

                                                        <small>Syntactic validity:</small>
                                                        <span class="badge badge-pill badge-${syntValidity}">${validity.syntactic().toFixed(2)}</span>
                                                        <br>
                                                        
                                                        <small>Syntactic completeness:</small>
                                                        <span class="badge badge-pill badge-${syntCompleteness}">${completeness.syntactic().toFixed(2)}</span>
                                                        <br>
                                                        
                                                        <small>Semantic validity:</small>
                                                        <span class="badge badge-pill badge-${semValidity}">${validity.semantic().toFixed(2)}</span>
                                                        <br>
                                                        
                                                        <small>Semantic completeness:</small>
                                                        <span class="badge badge-pill badge-${semCompleteness}">${completeness.semantic().toFixed(2)}</span>
                                                        <br>

                                                        <button type="button" class="btn btn-info btn-sm mt-2" onclick="reachOwner('${models[i].owner}');" style="border-radius: 1rem; font-weight: bold;">Reach owner</button>
                                                        <button type="button" class="btn btn-danger btn-sm mt-2" onclick="checkIdentity('${i}');" style="border-radius: 1rem; font-weight: bold;">Check identity</button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>`);

                                        // Render hidden modal to show full image of the NFT
                                        $('#modals').append(`<div class="modal fade" id="nft${i}" tabindex="-1" role="dialog" aria-labelledby="nftLabel${i}" aria-hidden="true">
                                            <div class="modal-dialog modal-xl" role="document">
                                                <div class="modal-content" style="border-radius: 1rem;">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="nftLabel${i}">EtherBPMN NFT #${i}</h5>
                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <span><b>Name:</b> ${modelURI.name}</span>
                                                        <br>

                                                        <span><b>Description:</b> ${modelURI.description}</span>
                                                        <br>

                                                        <img src="${modelURI.image}" class="mt-4" style="width: 100%;">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`);
                                    });
                                });
                            });
                        });
                    });
                });
            }
        });
    } catch (err) {
        alert(err.message);
    }
});