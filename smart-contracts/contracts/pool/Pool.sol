// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "../libraries/Data.sol";
import {IPool} from "../interfaces/IPool.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Pool is IPool, Context, Ownable {
    constructor() Ownable(_msgSender()) {}

    function withdrawTo(
        address to,
        Data.Token[] memory tokens
    ) external virtual override onlyOwner {
        _withdrawTo(to, tokens);
    }

    function _withdrawTo(
        address to,
        Data.Token[] memory tokens
    ) internal virtual;

    error InvalidRouter(address router);
}
