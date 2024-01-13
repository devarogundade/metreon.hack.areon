// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "../libraries/Data.sol";
import {IMetreonPay} from "../interfaces/IMetreonPay.sol";
import {IMessageReceiver} from "../interfaces/IMessageReceiver.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract MetreonPay is IMetreonPay, Context {
    mapping(address => uint256) public _dapps;

    function deposit(address dapp) external payable override {
        IMessageReceiver receiver = IMessageReceiver(dapp);

        if (_msgSender() != receiver.metreonPayMaster())
            revert InvalidPayMaster(_msgSender());

        uint256 amount = msg.value;

        _dapps[dapp] += amount;

        emit Deposit(dapp, amount);
    }

    function withdraw(address dapp, uint256 amount) external override {
        IMessageReceiver receiver = IMessageReceiver(dapp);

        if (_msgSender() != receiver.metreonPayMaster())
            revert InvalidPayMaster(_msgSender());

        if (_dapps[dapp] < amount) revert InsufficientAmount(amount);

        _dapps[dapp] -= amount;

        // transfer to metreonPayMaster
        payable(receiver.metreonPayMaster()).transfer(amount);

        emit Withdraw(dapp, amount);
    }

    function payGas(
        address dapp,
        uint256 amount,
        bytes32 messageId
    ) external override {
        if (_dapps[dapp] < amount) revert InsufficientAmount(amount);

        _dapps[dapp] -= amount;

        emit PayGas(dapp, amount, messageId);
    }
}
