// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "../libraries/Data.sol";

interface IMessageReceiver {
    error AlreadyExecuted(bytes32 messageId);

    function metreonPayMaster() external view returns (address);

    function metreonReceive(
        Data.IncomingMessage calldata message,
        address tokenPool
    ) external;

    function getMetreon() external view returns (address);
}
