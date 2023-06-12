import TokenContract from '../abi/TokenContract.json'
import VotingContract from '../abi/VotingContract.json'

export const tokenContractInstance = (web3) => {
    return new web3.eth.Contract(
        TokenContract.abi, // abi of SC voting token
        "0x360f303647d3e89CB8222eFC10a68b463884881d" // address of Voting token
    )
}

export const votingContractInstance = web3 => {
    return new web3.eth.Contract(
        VotingContract.abi, // abi of SC governance contract
        "0x6D657355a6C54B07eC5277Bd47aE2c9342a4Dac1"  // address of governance contract
    )
}