const { expect } = require('chai')
const { ethers } = require('hardhat')

exports.withdraw = () => {
  context('#withdraw', async () => {
    beforeEach(async () => {
      const stakingContract = globalThis.stakingContract
      const value = ethers.utils.parseEther('1')
      await stakeToken.approve(stakingContract.address, value)
      await stakingContract.stake(value)
    })

    it('Should increase user token balance', async () => {
      const stakingContract = globalThis.stakingContract
      const stakeToken = globalThis.stakeToken
      const [account] = globalThis.signers
      const value = ethers.utils.parseEther('.5')
      await stakingContract.withdraw(value)
      expect(await stakeToken.balanceOf(account.address)).to.be.equals(
        ethers.utils.parseEther('9999.5')
      )
    })

    it('Should decrease Staking Contract token balance', async () => {
      const stakingContract = globalThis.stakingContract
      const stakeToken = globalThis.stakeToken
      const value = ethers.utils.parseEther('.5')
      await stakingContract.withdraw(value)
      expect(await stakeToken.balanceOf(stakingContract.address)).to.be.equals(
        value
      )
    })
  })
}
