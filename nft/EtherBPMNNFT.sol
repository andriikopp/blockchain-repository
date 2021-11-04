// SPDX-License-Identifier: MIT-License

pragma solidity ^0.7.6;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/access/Ownable.sol";

/**
 *
 * ERC721 token to store BPMN business process models on the Ethereum blockchain as NFTs.
 *
 */
contract EtherBPMNNFT is ERC721 {
    // Number of models published to the blockchain
    uint256 public modelsCount;

    // Syntactic statements
    struct SyntacticStatements {
        uint256 invalid;
        uint256 incomplete;
    }

    // Semantic statements
    struct SemanticStatements {
        uint256 invalid;
        uint256 incomplete;
    }

    // Total statements in models
    mapping(uint256 => uint256) public statements;

    // Syntactic statements in models
    mapping(uint256 => SyntacticStatements) public syntactic;

    // Semantic statements in models
    mapping(uint256 => SemanticStatements) public semantic;

    // Owner contacts for cooperation
    mapping(address => string) public contacts;

    // Hash values of token URI JSON documents stored to keep tamper resistance
    mapping(uint256 => string) public hashURI;

    constructor() ERC721("EtherBPMN NFT", "ETHBPMNNFT") {
        // Initially there are 0 models published
        modelsCount = 0;
    }

    /**
     *
     * Publishing a BPMN model to the blockchain.
     *
     */
    function publishModel(
        string memory modelURI,
        string memory URIHash,
        uint256 statementsNum,
        uint256 syntInvalidNum,
        uint256 syntIncompleteNum,
        uint256 semInvalidNum,
        uint256 semIncompleteNum
    ) public returns (uint256) {
        // Check total statements number
        require(statementsNum > 0);

        // Check syntactic properties
        require((syntInvalidNum + syntIncompleteNum) <= statementsNum);

        // Check semantic properties
        require((semInvalidNum + semIncompleteNum) <= statementsNum);

        // Set the new model ID
        uint256 id = modelsCount;

        // Set minting data (sender, token ID)
        _safeMint(msg.sender, id);

        // Set token URI (to a model's file image/XML/etc.)
        _setTokenURI(id, modelURI);

        // Set model URI hash
        hashURI[id] = URIHash;

        // Set statements
        statements[id] = statementsNum;

        // Set syntactic measures
        syntactic[id] = SyntacticStatements(syntInvalidNum, syntIncompleteNum);

        // Set semantic measures
        semantic[id] = SemanticStatements(semInvalidNum, semIncompleteNum);

        // Increase the number of models
        modelsCount += 1;

        return id;
    }

    /**
     *
     * Set contact data for the address.
     *
     */
    function publishContacts(string memory contact) public {
        contacts[msg.sender] = contact;
    }
}
