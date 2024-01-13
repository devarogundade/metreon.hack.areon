// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IMetreonConfig} from "./interfaces/IMetreonConfig.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MetreonConfig is IMetreonConfig, Ownable {
    mapping(uint256 => uint256) private _fees;
    uint256[] private _supportedChains;
    address[] private _supportedTokens;

    constructor() Ownable(_msgSender()) {}

    function getFee(
        uint256 toChainId
    ) external view override returns (uint256) {
        return _fees[toChainId];
    }

    function setFee(
        uint256 toChainId,
        uint256 amount
    ) external override onlyOwner {
        if (amount == 0) revert InvalidAmount(amount);
        if (toChainId == 0) revert InvalidChainId(toChainId);

        _fees[toChainId] = amount;

        emit SetFee(toChainId, amount);
    }

    function supportedChains() external view returns (uint256[] memory) {
        return _supportedChains;
    }

    function updateSupportedChains(uint256[] memory chains) external onlyOwner {
        _supportedChains = chains;

        emit SupportedChains(chains);
    }

    function supportedTokens() external view returns (address[] memory) {
        return _supportedTokens;
    }

    function updateSupportedTokens(address[] memory tokens) external onlyOwner {
        _supportedTokens = tokens;

        emit SupportedTokens(tokens);
    }
}
