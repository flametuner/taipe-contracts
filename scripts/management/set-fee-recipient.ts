import { FEE_RECIPIENT_ADDRESS, Network, Tier } from '../../src';
import { getSaleContract } from '../utils/contract';

async function main() {
  const network = Network.Ethereum;
  const tier = Tier.Tier1;
  const feeRecipient = FEE_RECIPIENT_ADDRESS[network];
  const contract = await getSaleContract(network, tier);
  console.log({feeRecipient})
  const gas = await contract.estimateGas.updateFeeRecipient(feeRecipient);
  console.log('Estimated gas:', gas.toString());
  const tx = await contract.updateFeeRecipient(feeRecipient, { gasLimit: gas });
  await tx.wait();

  console.log('Updated fee Recipient. Tx Hash:', tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
