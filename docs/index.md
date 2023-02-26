# Solidity API

## Staking

### AmountExceedsBalance

```solidity
error AmountExceedsBalance()
```

Error to revert when amount exceeds balance

### stakingToken

```solidity
contract IERC20 stakingToken
```

Save the address of the token to stake as an instance of IERC20.

### rewardRate

```solidity
uint256 rewardRate
```

Reward tokens earn for each token staked in a period of one year.

### updateRewards

```solidity
modifier updateRewards(address address_)
```

Check if an account already has staked tokens, save and
calculates the rewards accumulated util the execution.

_Execute in all the functions that modify the amount of staked tokens._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| address_ | address | Address to update rewards |

### constructor

```solidity
constructor(address stakingToken_, uint256 rewardRate_) public
```

Start staking contract and ERC20 used as rewards.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| stakingToken_ | address | Address of token to stake in this smart contract. |
| rewardRate_ | uint256 | The rewards get for token each year. |

### getRewards

```solidity
function getRewards(address address_) public view returns (uint256 rewards)
```

Get rewards accumulated by address_.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| address_ | address | Address of account to calculate rewards. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| rewards | uint256 | Return the amount of rewards accumulated by and address. |

### stake

```solidity
function stake(uint256 amount_) external
```

Save tokens to start accumulating rewards.

_The smart contract's address must have enough allowance in ERC20._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | uint256 | Amount of tokens for staking |

### withdraw

```solidity
function withdraw(uint256 amount_) external
```

Transfer tokens to owner and save the rewards accumulated.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | uint256 | Amount of tokens to withdraw. |

### claim

```solidity
function claim() external
```

Mints all the rewards accumulated and restarts counters.

### claimAndWithdraw

```solidity
function claimAndWithdraw() external
```

Withdraws all the tokens of the sender and mints all the rewards accumulated.

### setRewardsRate

```solidity
function setRewardsRate(uint256 rate_) external
```

Change rewards rate.
WARNING: CHANGE THIS VARIABLE IS GOING TO AFFECT THE REWARDS THAT HAVE NOT BEEN SAVED
EXECUTING "updateRewards", TAKING THE NEW VALUE AS PARAMETER TO CALCULATE THE E

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| rate_ | uint256 | Amount of tokens earn per token each year. |

### _withdraw

```solidity
function _withdraw(uint256 amount_) internal
```

Transfer tokens staked to tokens' owner

_This function must be executed inside a function that uses updateRewards modifier._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount_ | uint256 | Amount of tokens to withdraw |

### _claim

```solidity
function _claim() internal
```

Mint rewards token to the sender address and set state to default.

_This function must be executed inside a function that uses updateRewards modifier._

## StakeToken

### constructor

```solidity
constructor() public
```

