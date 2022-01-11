import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import Getweb3 from './Getweb3';
import environment from '../utils/Environment';
import { getBep20ContractToken } from '../utils/contractHelpers'
import { getWeiNumber } from '../utils/formatBalance'


const spender='0x68cba4E61288E7D9244739c293B9571E6A873F7c'; //static

export const useApprove = (tokenAddress, amountIn , decimals) => {
    const { account } = useWeb3React();
    const web3 = Getweb3();
    const contractToken = getBep20ContractToken(tokenAddress, web3)
    amountIn = getWeiNumber(amountIn , decimals);
    const ApproveTokens= useCallback( () => {
        const approved = contractToken.methods.approve(spender,amountIn).send({ from: account })
        .on('transactionHash', (tx) => { return tx.transactionHash });
        return approved
    }, [account,amountIn ])

    return { Approve: ApproveTokens }
}

export default useApprove;