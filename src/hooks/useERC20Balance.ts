import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { config } from "@/lib/wagmi";
import { HexAddress } from "@/types";
import { mockERC20ABI } from "@/lib/abi/mockERC20ABI";

export const useERC20Balance = (address: HexAddress, token: HexAddress) => {
    const [balance, setBalance] = useState<bigint | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            setLoading(true);
            try {
                const result = await readContract(config, {
                    address: token,
                    abi: mockERC20ABI,
                    functionName: 'balanceOf',
                    args: [address],
                });
                setBalance(result as bigint);
            } catch (err: unknown) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        if (address) {
            fetchBalance();
        }
    }, [address, token]);

    return { balance, loading, error };
};