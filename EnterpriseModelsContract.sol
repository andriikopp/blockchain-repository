// SPDX-License-Identifier: MIT-License
// https://ropsten.etherscan.io/address/0x1fc7aba9679c8e35e723cc82f8b5e39889692198

pragma solidity >=0.7.0 <0.8.0;

contract EnterpriseModelsContract {
    mapping(address => mapping(string => string)) private permissions;
    address private owner;

    constructor() public {
        owner = msg.sender;
    }

    function setPermission(
        address pAddress,
        string memory pAsset,
        string memory pKey
    ) public {
        if (msg.sender == owner) {
            permissions[pAddress][pAsset] = pKey;
        }
    }

    function getPermission(string memory pAsset)
        public
        view
        returns (string memory)
    {
        return permissions[msg.sender][pAsset];
    }
}
