import { deployments, ethers, getNamedAccounts } from "hardhat"
import type { Contract } from "ethers";
import { describe, beforeEach } from "mocha"
import { assert } from "chai";

describe("FundMe",async () => {
  let fundMe: Contract
  let deployer: string
  let mockV3Aggreator: Contract
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer
    await deployments.fixture(["all"])

    fundMe = await ethers.getContract("FundMe", deployer)
    mockV3Aggreator = await ethers.getContract("MockV3Aggreator", deployer)
  })
  describe("contructor", () => {
    it("set the aggreator addresses correctly", async () => {
      const response = await fundMe.priceFeed()
      assert.equal(response, mockV3Aggreator.address)
    })
  })
})