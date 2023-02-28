const { expect } = require('chai')
const { time } = require('@nomicfoundation/hardhat-network-helpers')

exports.claimAndWithdraw = () => {
  context('#claimAndWithdraw', async () => {
    it('Should set user rewards as 0', async () => {
      const stakingContract = globalThis.stakingContract
      const [account] = globalThis.signers
      const value = 10000
      await stakingContract.stake(value)
      await time.increase(103430034)
      await stakingContract.claimAndWithdraw()
      expect(await stakingContract.getRewards(account.address)).to.be.equals(0)
    })

    it('Should update the last time the account claimed rewards', async () => {
      const $stakingContract = globalThis.$stakingContract
      const [account] = globalThis.signers
      const value = 1000
      await $stakingContract.stake(value)
      await $stakingContract.claimAndWithdraw()
      const lastUpdate = await time.latest()
      expect(await $stakingContract.$_lastUpdate(account.address)).to.be.equals(
        lastUpdate
      )
    })

    it('Should increase user rewards token balance', async () => {
      const stakingContract = globalThis.stakingContract
      const [account] = globalThis.signers
      const value = 100000000
      await stakingContract.stake(value)
      await time.increase(103430034100)
      const rewards = await stakingContract.getRewards(account.address)
      await stakingContract.claimAndWithdraw()
      expect(await stakingContract.balanceOf(account.address)).to.be.equals(
        rewards
      )
    })

    it('Should set user staked tokens as 0', async () => {
      const stakingContract = globalThis.stakingContract
      const [account] = globalThis.signers
      const value = 1000
      await stakingContract.stake(value)
      await stakingContract.claimAndWithdraw()
      expect(await stakingContract.staked(account.address)).to.be.equals(0)
    })
  })
}
