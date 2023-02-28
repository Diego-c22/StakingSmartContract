const { ethers } = require('hardhat')
const { deployMockERC20 } = require('./mocks')

const deployStakingFixture = async () => {
  const { erc20 } = await deployMockERC20()
  const StakingContract = await ethers.getContractFactory('Staking')
  const stakingContract = await StakingContract.deploy(erc20.address, 2000)
  const $StakingContract = await ethers.getContractFactory('$Staking')
  const $stakingContract = await $StakingContract.deploy(erc20.address, 2000)

  return { stakingContract, $stakingContract, erc20 }
}

const deployStakeTokenFixture = async () => {
  const StakeToken = await ethers.getContractFactory('StakeToken')
  const stakeToken = await StakeToken.deploy()

  return { stakeToken }
}

const deploySystemFixture = async () => {
  const { stakeToken } = await deployStakeTokenFixture()
  const StakingContract = await ethers.getContractFactory('Staking')
  const stakingContract = await StakingContract.deploy(stakeToken.address, 2000)

  return { stakingContract, stakeToken }
}

module.exports = {
  deployStakingFixture,
  deployStakeTokenFixture,
  deploySystemFixture,
}
