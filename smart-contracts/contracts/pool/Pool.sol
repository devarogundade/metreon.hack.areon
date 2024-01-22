// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "../libraries/Data.sol";
import {IPool} from "../interfaces/IPool.sol";

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Pool is IPool, Context, Ownable {
    constructor() Ownable() {}

    function withdrawTo(
        address to,
        Data.IncomingMessage calldata message
    ) external virtual override onlyOwner {
        _withdrawTo(to, message);
    }

    function _withdrawTo(
        address to,
        Data.IncomingMessage calldata message
    ) internal virtual;

    error InvalidRouter(address router);
}
