// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Hash} from "./libraries/Hash.sol";
import {Data} from "./libraries/Data.sol";
import {IMetreon} from "./interfaces/IMetreon.sol";
import {IMetreonPay} from "./interfaces/IMetreonPay.sol";
import {IMetreonConfig} from "./interfaces/IMetreonConfig.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract Metreon is IMetreon, Context {
    uint256 private _msgIndex;
    IMetreonPay private _pay;
    IMetreonConfig private _config;
    address private _tokenPool;

    constructor(address pay_, address config_, address tokenPool_) {
        _pay = IMetreonPay(pay_);
        _config = IMetreonConfig(config_);
        _tokenPool = tokenPool_;
    }

    function isChainSupported(uint256 chainId) external view returns (bool) {
        uint256[] memory chainIds = _config.supportedChains();

        for (uint256 index = 0; index < chainIds.length; index++) {
            if (chainIds[index] == chainId) return true;
        }

        return false;
    }

    function isTokenSupported(address tokenId) external view returns (bool) {
        address[] memory tokenIds = _config.supportedTokens();

        for (uint256 index = 0; index < tokenIds.length; index++) {
            if (tokenIds[index] == tokenId) return true;
        }

        return false;
    }

    function estimateFee(uint256 toChainId) external view returns (uint256) {
        return _config.getFee(toChainId);
    }

    function sendMessage(
        Data.OutgoingMessage calldata message
    ) external payable returns (bytes32) {
        bytes32 combinedMsgIndex = (Hash.addressToBytes32(_msgSender()) << 96) |
            bytes32(_msgIndex);

        bytes32 messageId = Hash.getHash(message, combinedMsgIndex);

        uint256 estimatedFee = _config.getFee(message.toChainId);

        if (message.payMaster == Data.PayMaster.METREON_PAY) {
            require(
                msg.value == 0,
                "Dont pass in any value for PayMaster.METREON_PAY"
            );

            _pay.payGas(_msgSender(), estimatedFee, messageId);
        } else {
            if (msg.value < estimatedFee) revert InsufficientGasFee();
        }

        for (uint256 index = 0; index < message.tokens.length; index++) {
            Data.Token memory token = message.tokens[index];

            if (token.tokenId == 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) {
                payable(_tokenPool).transfer(msg.value);
            } else {
                IERC20 tokenContract = IERC20(token.tokenId);
                tokenContract.transferFrom(
                    _msgSender(),
                    _tokenPool,
                    token.amount
                );
            }
        }

        emit Dispatch(
            messageId,
            estimatedFee,
            address(0), // native coin
            _msgIndex, // message sequence
            message.toChainId,
            _msgSender(),
            message.receiver,
            message.tokens,
            message.payMaster,
            message.payload
        );

        _msgIndex++;

        return messageId;
    }
}
