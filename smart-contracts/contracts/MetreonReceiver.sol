// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "./libraries/Data.sol";
import {IPool} from "./interfaces/Ipool.sol";
import {IMessageReceiver} from "./interfaces/IMessageReceiver.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

abstract contract MetreonReceiver is IMessageReceiver, Context, Ownable {
    address private immutable _metreon;

    mapping(bytes32 => bool) private _executed;

    constructor(address metreon_) Ownable() {
        if (metreon_ == address(0)) revert InvalidRouter(address(0));
        _metreon = metreon_;
    }

    function metreonPayMaster() external view override returns (address) {
        return owner();
    }

    function metreonReceive(
        Data.IncomingMessage calldata message,
        address tokenPool
    ) external virtual override onlyMetreon {
        if (_executed[message.messageId]) {
            revert AlreadyExecuted(message.messageId);
        }

        if (message.tokens.length > 0) {
            IPool pool = IPool(tokenPool);
            pool.withdrawTo(address(this), message);
        }

        _metreonReceive(message);

        _executed[message.messageId] = true;
    }

    function _metreonReceive(
        Data.IncomingMessage memory message
    ) internal virtual;

    function getMetreon() public view override returns (address) {
        return _metreon;
    }

    error InvalidRouter(address router);

    modifier onlyMetreon() {
        if (_metreon != _msgSender()) revert InvalidRouter(_msgSender());
        _;
    }
}
