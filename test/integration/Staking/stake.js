const { expect } = require('chai')
const { ethers } = require('hardhat')

exports.stake = () => {
  context('#stake', async () => {
    beforeEach(async () => {
      const stakeToken = globalThis.stakeToken
      await stakeToken.getTokens()
    })
    it('Should decrease user token balance', async () => {
      const stakingContract = globalThis.stakingContract
      const stakeToken = globalThis.stakeToken
      const [account] = globalThis.signers
      const value = ethers.utils.parseEther('1')
      await stakeToken.approve(stakingContract.address, value)
      await stakingContract.stake(value)
      expect(await stakeToken.balanceOf(account.address)).to.be.equals(
        ethers.utils.parseEther('9999')
      )
    })

    it('Should increase Staking Contract token balance', async () => {
      const stakingContract = globalThis.stakingContract
      const stakeToken = globalThis.stakeToken
      const value = ethers.utils.parseEther('1')
      await stakeToken.approve(stakingContract.address, value)
      await stakingContract.stake(value)
      expect(await stakeToken.balanceOf(stakingContract.address)).to.be.equals(
        value
      )
    })
  })
}
