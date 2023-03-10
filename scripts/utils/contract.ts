import { ethers } from 'hardhat';
import { MINTER_ADDRESS, Network, SALE_ADDRESS, TAIPE_ADDRESS, Tier, Tier1Sale__factory, Tier3Sale__factory } from '../../src';
import {
  getRelayerSigner,
  isEthereumNetwork,
  isPolygonNetwork
} from './signers';

export async function getPolygonContract(network: Network) {
  if (!isPolygonNetwork(network)) throw new Error('Network is not Polygon');
  const signer = getRelayerSigner(network);

  const taipeAddress = TAIPE_ADDRESS[network];

  const Contract = await ethers.getContractFactory('PolygonTaipe');
  return Contract.attach(taipeAddress).connect(signer);
}

export async function getEthereumContract(network: Network) {
  if (!isEthereumNetwork(network)) throw new Error('Network is not Ethereum');
  const signer = getRelayerSigner(network);

  const taipeAddress = TAIPE_ADDRESS[network];

  const Contract = await ethers.getContractFactory('EthereumTaipe');
  return Contract.attach(taipeAddress).connect(signer);
}

export async function getVRFMinter(network: Network, tier: Tier) {
  const signer = getRelayerSigner(network);

  const contractAddress = MINTER_ADDRESS[tier][network];
  if (!contractAddress)
    throw new Error('`Contract not found for tier ${tier} on ${network}`');
  const Contract = await ethers.getContractFactory('VRFMinter');
  return Contract.attach(contractAddress).connect(signer);
}

export async function getSaleContract(network: Network, tier: Tier) {
  const signer = getRelayerSigner(network);

  const contractAddress = SALE_ADDRESS[tier][network];
  if (!contractAddress)
    throw new Error('`Contract not found for tier ${tier} on ${network}`');
  let Contract: Tier1Sale__factory | Tier3Sale__factory;
  if (tier === Tier.Tier1)
    Contract = await ethers.getContractFactory('Tier1Sale');
  else
    Contract = await ethers.getContractFactory('Tier3Sale');
  return Contract.attach(contractAddress).connect(signer);
}

