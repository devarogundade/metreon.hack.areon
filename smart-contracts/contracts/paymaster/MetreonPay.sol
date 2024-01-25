// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "../libraries/Data.sol";
import {IMetreonPay} from "../interfaces/IMetreonPay.sol";
import {IMessageReceiver} from "../interfaces/IMessageReceiver.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract MetreonPay is IMetreonPay, Context {
    mapping(address => uint256) private _balances;
    uint256 private MAX_BALANCE = 100_000_000_000_000_000_000;

    function balanceOf(address dapp) public view override returns (uint256) {
        return _balances[dapp];
    }

    function deposit(address dapp) external payable override {
        uint256 balance = balanceOf(dapp);

        if ((balance + msg.value) > MAX_BALANCE) revert OverflowAmount();

        IMessageReceiver receiver = IMessageReceiver(dapp);

        if (_msgSender() != receiver.metreonPayMaster())
            revert InvalidPayMaster(_msgSender());

        uint256 amount = msg.value;

        _balances[dapp] += amount;

        emit Deposit(dapp, amount);
    }

    function withdraw(address dapp, uint256 amount) external override {
        IMessageReceiver receiver = IMessageReceiver(dapp);

        if (_msgSender() != receiver.metreonPayMaster())
            revert InvalidPayMaster(_msgSender());

        if (_balances[dapp] < amount) revert InsufficientAmount(amount);

        _balances[dapp] -= amount;

        // transfer to metreonPayMaster
        payable(receiver.metreonPayMaster()).transfer(amount);

        emit Withdraw(dapp, amount);
    }

    function payGas(
        address dapp,
        uint256 amount,
        bytes32 messageId
    ) external override {
        if (_balances[dapp] < amount) revert InsufficientAmount(amount);

        _balances[dapp] -= amount;

        emit PayGas(dapp, amount, messageId);
    }
}
