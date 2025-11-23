// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * @title PythPriceConsumer
 * @notice Contract to consume Pyth price feeds after they've been updated on-chain
 * This contract reads prices from the Pyth price feed contract
 * Uses the official Pyth SDK for type safety and maintainability
 */
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract PythPriceConsumer {
    IPyth public immutable pyth;
    
    // Price feed IDs for common assets
    // ETH/USD on Base Sepolia: 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace
    bytes32 public constant ETH_USD_PRICE_FEED_ID = 
        0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace;
    
    // BTC/USD on Base Sepolia: 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43
    bytes32 public constant BTC_USD_PRICE_FEED_ID = 
        0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43;

    event PriceUpdated(bytes32 indexed priceId, int64 price, uint64 conf, uint256 timestamp);

    constructor(address _pyth) {
        pyth = IPyth(_pyth);
    }

    /**
     * @notice Update price feeds on-chain using Pyth update data
     * @param updateData The price update data fetched from Hermes API
     */
    function updatePriceFeeds(bytes[] calldata updateData) external payable {
        pyth.updatePriceFeeds{value: msg.value}(updateData);
    }

    /**
     * @notice Get the latest price for a given price feed ID
     * @param priceId The price feed ID
     * @return price The current price
     * @return conf The confidence interval
     * @return publishTime The publish time of the price
     */
    function getLatestPrice(
        bytes32 priceId
    ) public view returns (int64 price, uint64 conf, uint256 publishTime) {
        PythStructs.Price memory pythPrice = pyth.getPrice(priceId);
        return (pythPrice.price, pythPrice.conf, pythPrice.publishTime);
    }

    /**
     * @notice Get ETH/USD price
     */
    function getEthPrice() public view returns (int64 price, uint64 conf, uint256 publishTime) {
        return getLatestPrice(ETH_USD_PRICE_FEED_ID);
    }

    /**
     * @notice Get BTC/USD price
     */
    function getBtcPrice() public view returns (int64 price, uint64 conf, uint256 publishTime) {
        return getLatestPrice(BTC_USD_PRICE_FEED_ID);
    }

    /**
     * @notice Get price with age check (price must be no older than specified age)
     * @param priceId The price feed ID
     * @param age Maximum age of the price in seconds
     */
    function getPriceNoOlderThan(
        bytes32 priceId,
        uint256 age
    ) public view returns (int64 price, uint64 conf, uint256 publishTime) {
        PythStructs.Price memory pythPrice = pyth.getPriceNoOlderThan(priceId, age);
        return (pythPrice.price, pythPrice.conf, pythPrice.publishTime);
    }
    
    /**
     * @notice Get the full price struct for a given price feed ID
     * @param priceId The price feed ID
     * @return price The full Pyth price struct including exponent
     */
    function getPriceStruct(
        bytes32 priceId
    ) public view returns (PythStructs.Price memory price) {
        return pyth.getPrice(priceId);
    }
}


