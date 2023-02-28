const { expect } = require('chai')
const { ethers } = require('hardhat')
const { time } = require('@nomicfoundation/hardhat-network-helpers')

exports.claimAndWithdraw = () => {
  context('#claimAndWithdraw', async () => {
    beforeEach(async () => {
      const stakingContract = globalThis.stakingContract
      const value = ethers.utils.parseEther('1')
      await stakeToken.approve(stakingContract.address, value)
      await stakingContract.stake(value)
    })

    it('Should increase user rewards balance', async () => {
      const stakingContract = globalThis.stakingContract
      const [account] = globalThis.signers
      await time.increase(31536000)
      await stakingContract.claimAndWithdraw()
      expect(await stakingContract.balanceOf(account.address)).to.be.equals(
        ethers.utils.parseEther('2000')
      )
    })

    it('Should increase user token balance', async () => {
      const stakingContract = globalThis.stakingContract
      const stakeToken = globalThis.stakeToken
      const [account] = globalThis.signers
      await stakingContract.claimAndWithdraw()
      expect(await stakeToken.balanceOf(account.address)).to.be.equals(
        ethers.utils.parseEther('10000')
      )
    })

    it('Should decrease Staking Contract token balance', async () => {
      const stakingContract = globalThis.stakingContract
      const stakeToken = globalThis.stakeToken
      await stakingContract.claimAndWithdraw()
      expect(await stakeToken.balanceOf(stakingContract.address)).to.be.equals(
        ethers.utils.parseEther('0')
      )
    })
  })
}
