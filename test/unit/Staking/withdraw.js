const { expect } = require('chai')
const { time } = require('@nomicfoundation/hardhat-network-helpers')
const { ethers } = require('hardhat')

exports.withdraw = () => {
  context('#withdraw', async () => {
    it('Should decrease user staked tokens', async () => {
      const stakingContract = globalThis.stakingContract
      const [account] = globalThis.signers
      const value = 1000
      await stakingContract.stake(value)
      await stakingContract.withdraw(value / 2)
      expect(await stakingContract.staked(account.address)).to.be.equals(
        value / 2
      )
    })

    it('Should update the last time the account withdraw tokens', async () => {
      const $stakingContract = globalThis.$stakingContract
      const [account] = globalThis.signers
      const value = 1000
      await $stakingContract.stake(value)
      await $stakingContract.withdraw(value / 2)
      const lastUpdate = await time.latest()
      expect(await $stakingContract.$_lastUpdate(account.address)).to.be.equals(
        lastUpdate
      )
    })

    it('Should save the rewards earn at the moment before withdraw tokens', async () => {
      const $stakingContract = globalThis.$stakingContract
      const [account] = globalThis.signers
      const value = ethers.utils.parseEther('1')
      await $stakingContract.stake(value)

      await time.increase(31536000)
      await $stakingContract.withdraw(value)
      const rewards = await $stakingContract.rewardRate()

      expect(
        await $stakingContract.$_lastRewardsAmount(account.address)
      ).to.be.equals(rewards.mul(ethers.BigNumber.from('1000000000000000000')))
    })

    it('Should revert when user tries to withdraw more tokens than his balance', async () => {
      const stakingContract = globalThis.stakingContract

      await expect(stakingContract.withdraw(100)).to.be.revertedWithCustomError(
        stakingContract,
        'AmountExceedsBalance'
      )
    })
  })
}
