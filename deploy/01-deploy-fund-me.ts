import type { HardhatRuntimeEnvironment } from 'hardhat/types';
import type { DeployFunction } from 'hardhat-deploy/types';
import { network } from "hardhat";
import { networkConfig } from "../helper-hardhat-config";
import verify from "../utils/verify";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    // deployer
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdFeedAddress: string
    if (chainId === 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdFeedAddress = networkConfig[`${chainId}`]["ethUsdPriceFeed"]
    }

    const fundMeArgs = [
        ethUsdFeedAddress
    ]

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: fundMeArgs,
        log: true,
        waitConfirmations: 5
    })

    if (chainId !== 31337) {
        await verify(fundMe.address, fundMeArgs)
    }
};

func.tags = ["all"]
export default func