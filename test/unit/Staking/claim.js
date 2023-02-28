const { expect } = require('chai')
const { time } = require('@nomicfoundation/hardhat-network-helpers')
const { ethers } = require('hardhat')

exports.claim = () => {
  context('#claim', async () => {
    it('Should set user rewards as 0', async () => {
      const stakingContract = globalThis.stakingContract
      const [account] = globalThis.signers
      const value = 10000
      await stakingContract.stake(value)
      await time.increase(103430034)
      await stakingContract.claim()
      expect(await stakingContract.getRewards(account.address)).to.be.equals(0)
    })

    it('Should update the last time the account claimed rewards', async () => {
      const $stakingContract = globalThis.$stakingContract
      const [account] = globalThis.signers
      const value = 1000
      await $stakingContract.stake(value)
      await $stakingContract.claim()
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
      await stakingContract.claim()
      const balance = await stakingContract.balanceOf(account.address)
      expect(balance).to.be.equals(rewards)
    })
  })
}
