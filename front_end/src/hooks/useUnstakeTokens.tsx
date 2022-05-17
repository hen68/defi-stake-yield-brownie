import { useContractFunction, useEthers } from "@usedapp/core"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants, utils } from "ethers"
import { Contract } from "@ethersproject/contracts"


export const useUnstakeTokens = () => {
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterace = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterace)


    const { send: unstake, state: unstakeState } =
        useContractFunction(tokenFarmContract, "unstakeTokens", {
            transactionName: "Unstake Tokens"
        })

    const approveAndStake = (tokenAddress: string) => {
        return unstake(tokenAddress)
    }

    return { approveAndStake, unstakeState }

    // return useContractFunction(tokenFarmContract, "unstakeTokens", {
    //     transactionName: "Unstake Tokens"
    // })
}