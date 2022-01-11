import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance, decimals) => {
    const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
    return displayBalance.toNumber()
}

export const getWeiNumber = (balance, decimals) => {
    const displayBalance = new BigNumber(balance).multipliedBy(new BigNumber(10).pow(decimals))
    return displayBalance
}

export const getFullDisplayBalance = (balance, decimals) => {
    return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}
