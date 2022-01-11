import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import environment from '../utils/Environment';
import { GetDeployerAddress } from '../utils/contractHelpers'
import Getweb3  from './Getweb3';

export const DeployContact = () => {
    const { account } = useWeb3React();
    const web3 = Getweb3();
    const contract = GetDeployerAddress(environment.DeployerAddress, web3)
    console.log("hereeeeeeeeeeee",contract);
    const DeployProjectOnLaunchpad= useCallback( (arg, vals) => {
        
        const deployer = contract.methods.deployProjectOnLaunchpad(arg).send({ from: account, value:  web3.utils.toWei(JSON.stringify((vals)), 'ether') })
        .on('transactionHash', (tx) => { return tx.transactionHash });
        return deployer
    }, [ account,contract ])

    return { deployprojectonlaunchpad: DeployProjectOnLaunchpad }
}

export default DeployContact;