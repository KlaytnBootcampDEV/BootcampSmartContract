pragma solidity ^0.8.4;

contract Proxy {
    uint256 public ourNumber;
    address public contractImplementation;

    constructor(uint256 number){
        ourNumber= number;
    }

    function setImplementation(address contractAddress) public {
        contractImplementation = contractAddress;
    }

    fallback() external {
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr,0,calldatasize())
            let result := delegatecall(gas(), sload(contractImplementation.slot),
            ptr,
            calldatasize(),
            0,
            0)
            let size := returndatasize()
            returndatacopy(ptr,0,size)
            switch result
                case 0 {
                    revert(ptr,size)
                }
                default {
                    return(ptr, size)
                }
        }
    }
}