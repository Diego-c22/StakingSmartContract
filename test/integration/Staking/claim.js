const { expect } = require('chai')
const { ethers } = require('hardhat')
const { time } = require('@nomicfoundation/hardhat-network-helpers')

exports.claim = () => {
  context('#claim', async () => {
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
      await stakingContract.claim()
      expect(await stakingContract.balanceOf(account.address)).to.be.equals(
        ethers.utils.parseEther('2000')
      )
    })
  })
}
