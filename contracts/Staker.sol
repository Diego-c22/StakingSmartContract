// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Staking is Ownable, ERC20 {
    /**
     * @notice Error to revert when amount exceeds balance
     */
    error AmountExceedsBalance();

    /**
     * @notice Save the address of the token to stake as an instance of IERC20.
     */
    IERC20 public immutable stakingToken;

    /**
     * @notice Reward tokens earn for each token staked in a period of one year.
     */
    uint256 public rewardRate;

    /**
     * @dev Save reward tokens accumulated util the last time "updateRewards" was executed
     * Account => Amount of rewards token accumulated
     */
    mapping(address => uint256) private _lastRewardsAmount;

    /**
     * @dev Save amount of tokens staked for each account.
     * Account => Amount of tokens staked.
     */
    mapping(address => uint256) private _staked;

    /**
     * @dev Save last time and account deposited tokens to stake.
     * Account => Timestamp
     */
    mapping(address => uint256) private _lastUpdate;

    /**
     * @notice Check if an account already has staked tokens, save and
     * calculates the rewards accumulated util the execution.
     * @dev Execute in all the functions that modify the amount of staked tokens.
     * @param address_ Address to update rewards
     */
    modifier updateRewards(address address_) {
        if (_staked[address_] > 0) {
            unchecked {
                _lastRewardsAmount[address_] = getRewards(address_);
            }
        }
        _;
    }

    /**
     * @notice Start staking contract and ERC20 used as rewards.
     * @param stakingToken_ Address of token to stake in this smart contract.
     * @param rewardRate_ The rewards get for token each year.
     */
    constructor(
        address stakingToken_,
        uint256 rewardRate_
    ) ERC20('Rewards', 'RWRS') {
        stakingToken = IERC20(stakingToken_);
        rewardRate = rewardRate_;
    }

    /**
     * @notice Calculate the rewards per token accumulated from certain date.
     * @param startTime_ timestamp when tokens were staked.
     * @return uint256 Return the rewards accumulated for each token.
     */
    function _getRewardsPerToken(
        uint256 startTime_
    ) private view returns (uint256) {
        uint256 timePassed = block.timestamp - startTime_;
        return ((timePassed * rewardRate * 1e18) / 365 days);
    }

    /**
     * @notice Get rewards accumulated by address_.
     * @param address_ Address of account to calculate rewards.
     * @return rewards Return the amount of rewards accumulated by and address.
     */
    function getRewards(
        address address_
    ) public view returns (uint256 rewards) {
        rewards =
            _lastRewardsAmount[address_] +
            (_getRewardsPerToken(_lastUpdate[address_]) * _staked[address_]);
    }

    /**
     * @notice Save tokens to start accumulating rewards.
     * @dev The smart contract's address must have enough allowance in ERC20.
     * @param amount_ Amount of tokens for staking
     */
    function stake(uint256 amount_) external updateRewards(msg.sender) {
        stakingToken.transferFrom(msg.sender, address(this), amount_);
        unchecked {
            _staked[msg.sender] += amount_;
        }

        _lastUpdate[msg.sender] = block.timestamp;
    }

    /**
     * @notice Transfer tokens to owner and save the rewards accumulated.
     * @param amount_ Amount of tokens to withdraw.
     */
    function withdraw(uint256 amount_) external updateRewards(msg.sender) {
        _withdraw(amount_);
    }

    /**
     * @notice Mints all the rewards accumulated and restarts counters.
     */
    function claim() external updateRewards(msg.sender) {
        _claim();
    }

    /**
     * @notice Withdraws all the tokens of the sender and mints all the rewards accumulated.
     */
    function claimAndWithdraw() external updateRewards(msg.sender) {
        uint256 staked = _staked[msg.sender];
        _withdraw(staked);
        _claim();
    }

    /**
     * @notice Change rewards rate.
     * WARNING: CHANGE THIS VARIABLE IS GOING TO AFFECT THE REWARDS THAT HAVE NOT BEEN SAVED
     * EXECUTING "updateRewards", TAKING THE NEW VALUE AS PARAMETER TO CALCULATE THE E
     * @param rate_ Amount of tokens earn per token each year.
     */
    function setRewardsRate(uint256 rate_) external onlyOwner {
        rewardRate = rate_;
    }

    /**
     * @notice Transfer tokens staked to tokens' owner
     * @dev This function must be executed inside a function that uses updateRewards modifier.
     * @param amount_ Amount of tokens to withdraw
     */
    function _withdraw(uint256 amount_) internal {
        uint256 staked = _staked[msg.sender];
        if (amount_ > staked) {
            revert AmountExceedsBalance();
        }

        unchecked {
            _staked[msg.sender] -= amount_;
        }

        _lastUpdate[msg.sender] = block.timestamp;
    }

    /**
     * @notice Mint rewards token to the sender address and set state to default.
     * @dev This function must be executed inside a function that uses updateRewards modifier.
     */
    function _claim() internal {
        _mint(msg.sender, _lastRewardsAmount[msg.sender]);
        delete _lastRewardsAmount[msg.sender];
        _lastUpdate[msg.sender] = block.timestamp;
    }
}
