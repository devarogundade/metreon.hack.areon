// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "../libraries/Data.sol";
import {IMetreon} from "../interfaces/IMetreon.sol";
import {MetreonReceiver} from "../MetreonReceiver.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Beamre is MetreonReceiver {
    IMetreon private _metreon;

    mapping(address => bytes32[]) public _actions;
    mapping(uint256 => address) public _contracts;

    constructor(
        address config_,
        address metreon_
    ) MetreonReceiver(config_, metreon_) {
        _metreon = IMetreon(getMetreon());
    }

    function setContract(uint256 chainId, address contractId) external {
        _contracts[chainId] = contractId;
    }

    function bridgeToken(
        uint256 toChainId,
        Data.Token[] memory tokens,
        address tokenPool
    ) external payable {
        Data.OutgoingMessage memory message = Data.OutgoingMessage({
            toChainId: toChainId,
            receiver: _contracts[toChainId],
            payload: abi.encode(_msgSender()),
            tokens: tokens,
            payMaster: Data.PayMaster.METREON_PAY
        });

        // uint256 fee = _metreon.estimateFee(toChainId);

        for (uint256 index = 0; index < tokens.length; index++) {
            Data.Token memory token = tokens[index];

            IERC20 tokenContract = IERC20(token.tokenId);

            tokenContract.transferFrom(
                _msgSender(),
                address(this),
                token.amount
            );

            tokenContract.approve(address(_metreon), token.amount);
        }

        bytes32 messageId = _metreon.sendMessage(message, tokenPool);

        _actions[_msgSender()].push(messageId);
    }

    function _metreonReceive(
        Data.IncomingMessage memory message
    ) internal override {
        address receiver = abi.decode(message.payload, (address));

        for (uint256 index = 0; index < message.tokens.length; index++) {
            Data.Token memory token = message.tokens[index];

            if (token.tokenId == 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE) {
                payable(receiver).transfer(token.amount);
            } else {
                IERC20 tokenContract = IERC20(token.tokenId);
                tokenContract.transfer(receiver, token.amount);
            }
        }
    }
}
