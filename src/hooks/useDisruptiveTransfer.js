import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { getBep20Contract } from '../utils/contractHelpers'


export const useDisruptiveTransfer = (recipient, amount) => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const tokenAddress = environment.YfethContractAddress;
    const contract = getBep20Contract(tokenAddress, web3)
    const handleTransfer = useCallback(async () => {
        return contract.methods.disruptiveTransfer(recipient, amount).send({ from: account, value: '2000000000000000000' }).on('transactionHash', (tx) => { return tx.transactionHash })
    }, [account, contract, recipient, amount])

    return { onTransfer: handleTransfer }
}

export default useDisruptiveTransfer;