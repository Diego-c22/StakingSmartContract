const { ethers } = require('hardhat')

exports.calculateMappingSlot = (slot, key, keyType) => {
  return ethers.utils.solidityKeccak256(
    ['bytes'],
    [ethers.utils.defaultAbiCoder.encode([keyType, 'uint256'], [key, slot])]
  )
}
