// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract StakeToken is ERC20 {
    constructor() ERC20('StakeToken', 'ST') {
        _mint(address(this), 1_000_000_000 ether);
    }

    function getTokens() external {
        _transfer(address(this), msg.sender, 10000 ether);
    }
}
