import dotenv from 'dotenv';
dotenv.config();
import contractArtifact from "./ContractAbi.json" assert { type: "json" }

const config = {
  jsonRpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
  contractAddress: "0x5AC678E6B87d7BE04293B822b4eB093CB7c57Ee2",
  contractAbi: contractArtifact.abi,
  mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
}

export default config;