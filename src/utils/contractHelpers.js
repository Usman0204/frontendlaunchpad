import web3NoAccount from './web3'
import yfEthAbi from './yfethAbi.json';
import bep20 from './bep20.json';
import launchpadDeployerABI from './launchpadDeployerABI.json' 
import IERC20 from './IERC20.json'
const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount;
 

        return new _web3.eth.Contract(abi, address)
   
}

export const getBep20Contract = (address, web3) => {
    return getContract(yfEthAbi, address, web3)
}


export const getBep20ContractToken = (address, web3) => {
    return getContract(bep20, address, web3)
}
export const GetDeployerAddress = (address, web3) => {
    return getContract(launchpadDeployerABI, address, web3)
}

export const GetTokenContract = (address, web3) => {
    return getContract(IERC20, address, web3)
}