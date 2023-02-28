const { ethers } = require('hardhat')
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const {
  deployStakingFixture,
  deployStakeTokenFixture,
} = require('../shared/fixtures')
const { setRewardsRate } = require('./Staking/setRewardsRate')
const { stake } = require('./Staking/stake')
const { getRewards } = require('./Staking/getRewards')
const { withdraw } = require('./Staking/withdraw')
const { claim } = require('./Staking/claim')
const { claimAndWithdraw } = require('./Staking/ClaimAndWithdraw')
const { getTokens } = require('./StakeToken/getTokens')

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
    claimAndWithdraw()
  })

  describe('StakeToken Contract', async () => {
    beforeEach(async () => {
      const { stakeToken } = await loadFixture(deployStakeTokenFixture)
      globalThis.stakeToken = stakeToken
    })

    getTokens()
  })
})
