const { expect } = require('chai')

exports.setRewardsRate = () => {
  context('#setRewardsRate', async () => {
    it('Should change rewards rate', async () => {
      const stakingContract = globalThis.stakingContract
      const value = 1000
      await stakingContract.setRewardsRate(value)
      expect(await stakingContract.rewardRate()).to.be.equals(value)
    })

    it('Should revert when executor is not the owner', async () => {
      const [, noOwnerAccount] = globalThis.signers
      const stakingContract = globalThis.stakingContract.connect(noOwnerAccount)
      await expect(stakingContract.setRewardsRate(200)).to.be.revertedWith(
        'Ownable: caller is not the owner'
      )
    })
  })
}
