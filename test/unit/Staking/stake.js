const { expect } = require('chai')
const { time } = require('@nomicfoundation/hardhat-network-helpers')
const { ethers } = require('hardhat')

exports.stake = () => {
  context('#stake', async () => {
    it('Should increase user staked tokens', async () => {
      const stakingContract = globalThis.stakingContract
      const [account] = globalThis.signers
      const value = 1000
      await stakingContract.stake(value)
      expect(await stakingContract.staked(account.address)).to.be.equals(value)
    })

    it('Should update the last time the account staked tokens', async () => {
      const $stakingContract = globalThis.$stakingContract
      const [account] = globalThis.signers
      const value = 1000
      await $stakingContract.stake(value)
      const lastUpdate = await time.latest()
      expect(await $stakingContract.$_lastUpdate(account.address)).to.be.equals(
        lastUpdate
      )
    })

    it('Should save the rewards earn at the moment before stake more tokens', async () => {
      const $stakingContract = globalThis.$stakingContract
      const [account] = globalThis.signers
      const value = ethers.utils.parseEther('1')
      await $stakingContract.stake(value)

      await time.increase(31536000)
      await $stakingContract.stake(value)
      const rewards = await $stakingContract.rewardRate()

      expect(
        await $stakingContract.$_lastRewardsAmount(account.address)
      ).to.be.equals(rewards.mul(ethers.BigNumber.from('1000000000000000000')))
    })
  })
}
