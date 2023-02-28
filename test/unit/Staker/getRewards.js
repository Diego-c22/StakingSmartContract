const { expect } = require('chai')
const { time } = require('@nomicfoundation/hardhat-network-helpers')
const { ethers } = require('hardhat')

const { BigNumber } = ethers

exports.getRewards = () => {
  context('#getRewards', async () => {
    it('Should returns rewards accumulated', async () => {
      const stakingContract = globalThis.stakingContract
      const [account] = globalThis.signers
      const value = ethers.utils.parseEther('1')
      await stakingContract.stake(value)

      await time.increase(31536000)
      const rewards = await stakingContract.rewardRate()

      expect(await stakingContract.getRewards(account.address)).to.be.equals(
        rewards.mul(BigNumber.from('1000000000000000000'))
      )
    })

    it('Should increase rewards, starting with a new counting each time user stake tokens', async () => {
      const stakingContract = globalThis.stakingContract
      const [account] = globalThis.signers
      const value = ethers.utils.parseEther('1')
      await stakingContract.stake(value)
      await time.increase(31536000)
      await stakingContract.stake(value)
      await time.increase(31536000)
      const rewards = await stakingContract.rewardRate()

      expect(await stakingContract.getRewards(account.address)).to.be.equals(
        rewards
          .mul(BigNumber.from('1000000000000000000'))
          .mul(BigNumber.from('3'))
      )
    })

    it('Should increase rewards, starting with a new counting each time user withdraw tokens', async () => {
      const stakingContract = globalThis.stakingContract
      const [account] = globalThis.signers
      const value = ethers.utils.parseEther('1')
      await stakingContract.stake(value)
      await time.increase(31536000)
      await stakingContract.withdraw(value.div(BigNumber.from('2')))
      await time.increase(31536000)
      const rewards = await stakingContract.rewardRate()

      expect(await stakingContract.getRewards(account.address)).to.be.equals(
        rewards
          .mul(BigNumber.from('1000000000000000000'))
          .mul(BigNumber.from('3'))
          .div(BigNumber.from('2'))
      )
    })
  })
}
