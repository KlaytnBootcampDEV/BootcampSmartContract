pragma solidity ^0.8.4;
contract Add3 {
uint256 ourNumber;
function initialize() public {
ourNumber = 0x64;
}
function getNumber() public view returns (uint256) {
return ourNumber;
}
function addThree() public {
ourNumber = ourNumber + 3;
}
}