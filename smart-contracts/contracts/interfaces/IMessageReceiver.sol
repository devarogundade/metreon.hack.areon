// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "../libraries/Data.sol";

interface IMessageReceiver {
    function metreonPayMaster() external view returns (address);

    function metreonReceive(Data.IncomingMessage calldata message) external;

    function getMetreon() external view returns (address);
}
