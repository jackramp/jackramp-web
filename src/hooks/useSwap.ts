import { ADDRESS_JACKUSD } from "@/constants/config";
import { mockJackUSDABI } from "@/lib/abi/mockJackUSDABI";
import { toast } from "sonner";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { keccak256, toHex } from 'viem';
import { HexAddress } from "@/types";

export const useSwap = () => {
    const { address } = useAccount();
    
    const {
        data: swapHash,
        isPending: isSwapPending,
        writeContract: writeSwap
    } = useWriteContract();

    const {
        isLoading: isSwapConfirming,
        isSuccess: isSwapConfirmed
    } = useWaitForTransactionReceipt({
        hash: swapHash,
    });

    const rekeningBank = "1234567890"
    const hashRekening = keccak256(toHex(rekeningBank));

    const channelId = keccak256(toHex("1"))

    const handleSwap = async (amount: string) => {
        try {
            await writeSwap({
                abi: mockJackUSDABI,
                address: ADDRESS_JACKUSD,
                functionName: 'requestOfframp',
                args: [{
                    user: address as HexAddress,
                    amount: BigInt(amount),
                    amountRealWorld: BigInt(amount),
                    channelAccount: hashRekening,
                    channelId: channelId
                }],
            });

            while (!isSwapConfirmed) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            toast.success('Tokens minted successfully!');
        } catch (error) {
            console.error('Transaction error:', error);
            toast.error(error instanceof Error ? error.message : 'Transaction failed. Please try again.');
        }
    };

    return {
        swapHash,
        isSwapPending,
        isSwapConfirming,
        isSwapConfirmed,
        handleSwap
    }
}