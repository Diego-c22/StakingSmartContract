const {
  deployStakingFixture,
  deployStakeTokenFixture,
} = require('../shared/fixtures')

describe('Integration Test', async () => {
  before(async () => {
    const signers = await ethers.getSigners()
    globalThis.signers = signers
  })

  describe('Staking Contract', async () => {
    beforeEach(async () => {
      const { stakingContract } = await loadFixture(deployStakingFixture)
      const { stakeToken } = await loadFixture(deployStakeTokenFixture)
      globalThis.stakingContract = stakingContract
      globalThis.stakeToken = stakeToken
    })
  })
})
