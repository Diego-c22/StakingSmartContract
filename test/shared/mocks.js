const { smock } = require('@defi-wonderland/smock')

const deployMockERC20 = async () => {
  const erc20 = await smock.fake('StakeToken')
  await erc20.deployed()
  return { erc20 }
}

module.exports = { deployMockERC20 }
