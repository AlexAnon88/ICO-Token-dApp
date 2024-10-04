// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Web3Degens is ERC20{
    constructor() ERC20("Web3Degens", "@WDGN"){
        _mint(msg.sender, 10000000000000000000000000);
    }
}
