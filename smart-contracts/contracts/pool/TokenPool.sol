// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Pool} from "./pool.sol";
import {Data} from "../libraries/Data.sol";

import {IMetreonConfig} from "../interfaces/IMetreonConfig.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenPool is Pool {
    IMetreonConfig private _config;

    constructor(address config_) Pool() {
        _config = IMetreonConfig(config_);
    }

    function _withdrawTo(
        address to,
        Data.IncomingMessage calldata message
    ) internal override {
        for (uint256 index = 0; index < message.tokens.length; index++) {
            Data.Token memory token = message.tokens[index];

            address tokenId = _config.getChainTokenId(
                message.fromChainId,
                token.tokenId
            );

            if (tokenId == address(0)) {
                payable(to).transfer(token.amount);
            } else {
                IERC20 tokenContract = IERC20(tokenId);
                tokenContract.transfer(to, token.amount);
            }
        }
    }
}
