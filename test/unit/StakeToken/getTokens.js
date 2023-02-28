const { expect } = require('chai')
const { ethers } = require('hardhat')

exports.getTokens = () => {
  context('#getTokens', async () => {
    it('Should increse user balance', async () => {
      const stakeToken = globalThis.stakeToken
      const [account] = globalThis.signers
      await stakeToken.getTokens()
      const value = ethers.utils.parseEther('10000')
      expect(await stakeToken.balanceOf(account.address)).to.be.equals(value)
    })
  })
}
