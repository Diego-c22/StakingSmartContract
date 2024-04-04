const hre = require('hardhat')

async function main() {
  const StakeToken = await hre.ethers.getContractFactory('StakeToken')
  const stakeToken = await StakeToken.deploy()
  await stakeToken.deployed()

  const StakingContract = await hre.ethers.getContractFactory('Staking')
  const stakingContract = await StakingContract.deploy(stakeToken.address, 2000)
  await stakingContract.deployed()

  console.log('First rate: ', await stakingContract.rewardRate())

  await stakingContract.setRewardsRate(1000)

  console.log('First rate: ', await stakingContract.rewardRate())

  console.log(`Token ${stakeToken.address}`)
  console.log(`Staking ${stakingContract.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
