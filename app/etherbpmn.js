const contractAddress = '0x3fb05e46308064211c5dc968f437f308b5bb6a45';

const contractABI = JSON.parse(`[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_Title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Link",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Annotation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Industry",
				"type": "string"
			}
		],
		"name": "AddModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "CheckMyPermission",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_User",
				"type": "address"
			}
		],
		"name": "CheckPermission",
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
		"name": "GetModelsCount",
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
				"name": "_User",
				"type": "address"
			}
		],
		"name": "GivePermission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ReadModels",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "Title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Link",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Hash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Annotation",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "Industry",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "DateTime",
						"type": "uint256"
					}
				],
				"internalType": "struct ModelsCollection.ModelRecord[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_User",
				"type": "address"
			}
		],
		"name": "RevokePermission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_User",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_Permission",
				"type": "bool"
			}
		],
		"name": "SetPermission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]`);

const infuraProvider = "https://ropsten.infura.io/v3/f9079a1b198f42369bf79d33e70a5eba";

$(document).ready(function() {
    try {
        const web3 = new Web3(new Web3.providers.HttpProvider(infuraProvider));

        const contract = new web3.eth.Contract(contractABI, contractAddress);

        contract.methods.ReadModels().call().then(data => {
            for (let i = 0; i < data.length; i++) {
                const title = data[i][0];
                const link = data[i][1];
                const hash = data[i][2];
                const annotation = data[i][3];
                const industry = data[i][4];

                const bpmnCode = $.ajax({
                    type: this.GET_REQUEST,
                    url: data[i][1],
                    async: false
                }).responseText;

                const calcHash = CryptoJS.SHA256(bpmnCode).toString();

                $('#models-list').append(`<span class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">${title}</h5>
                            <small><a href="${link}" target="_blank">BPMN File</a></small>
                        </div>
                        ${hash === calcHash ? '<span class="badge badge-pill badge-success">Authentic</span>' : '<span class="badge badge-pill badge-danger">Tampered</span>'}
                        <p class="mb-1">${annotation}</p>
                        <small>${industry}</small>
                    </span>`);
            }
        });
    } catch (err) {
        alert(err.message);
    }
});