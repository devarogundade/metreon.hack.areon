// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Pool} from "./pool.sol";
import {Data} from "../libraries/Data.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenPool is Pool {
    constructor() Pool() {}

    function _withdrawTo(
        address to,
        Data.Token[] memory tokens
    ) internal override {
        for (uint256 index = 0; index < tokens.length; index++) {
            Data.Token memory token = tokens[index];

            if (token.tokenId == address(0)) {
                payable(to).transfer(token.amount);
            } else {
                IERC20 tokenContract = IERC20(token.tokenId);
                tokenContract.transfer(to, token.amount);
            }
        }
    }
}
