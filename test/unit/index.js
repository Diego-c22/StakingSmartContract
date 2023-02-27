const { ethers } = require('hardhat')
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { deployStakingFixture } = require('../shared/fixtures')
const { setRewardsRate } = require('./Staker/setRewardsRate')
const { stake } = require('./Staker/stake')
const { getRewards } = require('./Staker/getRewards')
const { withdraw } = require('./Staker/withdraw')
const { claim } = require('./Staker/claim')

describe('Unit Test', async () => {
  before(async () => {
    const signers = await ethers.getSigners()
    globalThis.signers = signers
  })

  describe('Staking Contract', async () => {
    beforeEach(async () => {
      const { stakingContract, $stakingContract, erc20 } = await loadFixture(
        deployStakingFixture
      )
      globalThis.stakingContract = stakingContract
      globalThis.erc20 = erc20
      globalThis.$stakingContract = $stakingContract
    })

    setRewardsRate()
    stake()
    getRewards()
    withdraw()
    claim()
  })
})
