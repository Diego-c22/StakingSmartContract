const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { deploySystemFixture } = require('../shared/fixtures')
const { stake } = require('./Staking/stake')

describe('Integration Test', async () => {
  before(async () => {
    const signers = await ethers.getSigners()
    globalThis.signers = signers
  })

  describe('Staking Contract', async () => {
    beforeEach(async () => {
      const { stakingContract, stakeToken } = await loadFixture(
        deploySystemFixture
      )
      globalThis.stakingContract = stakingContract
      globalThis.stakeToken = stakeToken
    })

    stake()
  })
})
