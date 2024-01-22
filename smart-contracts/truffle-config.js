const HDWalletProvider = require('@truffle/hdwallet-provider');

const dotenv = require("dotenv");
dotenv.config();

const MNEMONIC = process.env.MNEMONIC;

module.exports = {
  plugins: [
    'truffle-contract-size',
    'truffle-plugin-stdjsonin'
  ],

  networks: {
    bscTestnet: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://bsc-testnet.public.blastapi.io'),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 9999999,
      skipDryRun: true,
      networkCheckTimeout: 999999999
    },

    mumbai: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://polygon-testnet.public.blastapi.io'),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 9999999,
      skipDryRun: true,
      networkCheckTimeout: 999999999
    },

    areonTestnet: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://testnet-rpc.areon.network'),
      network_id: 462,
      confirmations: 2,
      timeoutBlocks: 9999999,
      skipDryRun: true,
      networkCheckTimeout: 999999999
    }
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.17", // Fetch exact version from solc-bin (default: truffle's version)
      settings: { // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        viaIR: true,
        evmVersion: "byzantium"
      }
    }
  }
};