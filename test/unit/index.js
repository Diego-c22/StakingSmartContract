const { ethers } = require('hardhat')
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { deployStakingFixture } = require('../shared/fixtures')
const { setRewardsRate } = require('./Staker/setRewardsRate')

describe('Unit Test', async () => {
  before(async () => {
    const signers = await ethers.getSigners()
    globalThis.signers = signers
  })

  describe('Staking Contract', async () => {
    beforeEach(async () => {
      const { stakingContract, erc20 } = await loadFixture(deployStakingFixture)
      globalThis.stakingContract = stakingContract
      globalThis.erc20 = erc20
    })

    setRewardsRate()
  })
})
