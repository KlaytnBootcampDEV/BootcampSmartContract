pragma solidity ^0.8.4;

contract Implementation_v1 {
    uint256 public number;

    constructor(uint256 _number){
        number = _number;
    }

    function addTwo() public  {
        number = number+2;
    }
}