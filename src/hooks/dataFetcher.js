import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { getBep20Contract } from '../utils/contractHelpers'
import Getweb3 from './Getweb3'
import useRefresh from './useRefresh'
import environment from '../utils/Environment';

const useTokenBalance = () => {
    console.log("useRefresh",useRefresh)
    const [balance, setBalance] = useState(new BigNumber(0))
    const { account } = useWeb3React()
    const web3 = Getweb3()
    const { fastRefresh } = useRefresh()
    const tokenAddress = environment.YfethContractAddress;
    useEffect(() => {
        const fetchBalance = async () => {
            const contract = getBep20Contract(tokenAddress, web3)
            const res = await contract.methods.balanceOf(account).call()
            setBalance(new BigNumber(res))
        }

        if (account) {
            fetchBalance()
        }
    }, [account, tokenAddress, web3, fastRefresh])

    return balance
}

const useContractBalance = () => {
    const [balance, setBalance] = useState(new BigNumber(0))
    const web3 = Getweb3()
    const { fastRefresh } = useRefresh()
    const tokenAddress = environment.YfethContractAddress;
    useEffect(() => {
        const fetchBalance = async () => {
            const res = await web3.eth.getBalance(environment.YfethContractAddress)
            setBalance(new BigNumber(res))
        }
        fetchBalance()
    }, [tokenAddress, web3, fastRefresh])

    return balance
}

const useUserReward = () => {
    const [balance, setBalance] = useState(new BigNumber(0))
    const { account } = useWeb3React()
    const web3 = Getweb3()
    const { fastRefresh } = useRefresh()
    const tokenAddress = environment.YfethContractAddress;
    useEffect(() => {
        const fetchBalance = async () => {
            const contract = getBep20Contract(tokenAddress, web3)
            const res = await contract.methods.calculateBNBReward(account).call()
            setBalance(new BigNumber(res))
        }
        if (account) {
            fetchBalance()
        }
    }, [account, tokenAddress, web3, fastRefresh])

    return balance
}

const useMaxTx = () => {
    const [balance, setBalance] = useState(new BigNumber(0))
    const web3 = Getweb3()
    const { fastRefresh } = useRefresh()
    const tokenAddress = environment.YfethContractAddress;
    useEffect(() => {
        const fetchBalance = async () => {
            const contract = getBep20Contract(tokenAddress, web3)
            const res = await contract.methods._maxTxAmount().call()
            setBalance(new BigNumber(res))
        }
        fetchBalance()
    }, [tokenAddress, web3, fastRefresh])

    return balance
}

export default useTokenBalance

export { useContractBalance, useUserReward, useMaxTx };