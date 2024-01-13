// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Data} from "../libraries/Data.sol";

interface IMetreon {
    error UnsupportedChain(uint256 chainId);
    error InsufficientGasFee();
    error InvalidMessage();

    event SendMessage(
        bytes32 messageId,
        uint256 fee,
        address feeToken,
        uint256 sequenceNumber,
        uint256 toChainId,
        address sender,
        address receiver,
        Data.Token[] tokens,
        Data.PayMaster payMaster,
        bytes payload
    );

    function isChainSupported(uint256 chainId) external view returns (bool);

    function isTokenSupported(address tokenId) external view returns (bool);

    function estimateFee(uint256 toChainId) external view returns (uint256);

    function sendMessage(
        Data.OutgoingMessage calldata message
    ) external payable returns (bytes32);
}
