// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "../libraries/Data.sol";

interface IMetreonPay {
    error InvalidPayMaster(address payer);
    error InsufficientAmount(uint256 amount);
    error OverflowAmount();

    event Deposit(address dapp, uint256 amount);
    event Withdraw(address dapp, uint256 amount);
    event PayGas(address dapp, uint256 amount, bytes32 messageId);

    function balanceOf(address dapp) external view returns (uint256);

    function deposit(address dapp) external payable;

    function withdraw(address dapp, uint256 amount) external;

    function payGas(address dapp, uint256 amount, bytes32 messageId) external;
}
