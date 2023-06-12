pragma solidity >0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenV2 is ERC20 {
    mapping(address => uint256) public depositOf;

    constructor() ERC20("Community Token", "COM"){
    }

    function deposit() payable public {
        depositOf[msg.sender] = msg.value;
        // 0.1 ether 1000 token
        uint256 totalTokenReceive = (msg.value * 1000) * 10;
        _mint(msg.sender, totalTokenReceive);
    }
}