import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { defaultCoin } from "@/constants/default-coin";
import { CurrencyInput } from "./CurrencyInput";
import { useAccount } from "wagmi";
import { ADDRESS_MOCKERC20 } from "@/constants/config";
import { AlertDialogTransaction } from "../../WithdrawPage/_components/AlertDialogTransaction";
import { useMint } from "@/hooks/useMint";
import { toast } from "sonner";
import { useInsufficientBalance } from "@/hooks/useInsufficientBalance";
import { HexAddress } from "@/types";

interface FormData {
    confirmed: boolean;
}

export const MintForm = () => {
    const [amount, setAmount] = useState("");
    const { address } = useAccount();
    
    const {
        insufficientBalance,
    } = useInsufficientBalance(
        address as HexAddress,
        ADDRESS_MOCKERC20,
        amount
    );

    const {
        isAlertOpen,
        mintHash,
        isApprovalPending,
        isMintPending,
        isApprovalConfirming,
        isMintConfirming,
        allowance,
        handleMint
    } = useMint();

    const form = useForm<FormData>({
        defaultValues: {}
    });

    const handleAmountChange = useCallback((value: string) => {
        setAmount(value);
    }, []);

    const handleSubmit = useCallback(async () => {
        if (insufficientBalance) {
            toast.error('Invalid amount or not enough balance!');
            return;
        }
        await handleMint(amount);
    }, [amount, insufficientBalance, handleMint]);

    const isSubmitDisabled = useMemo(() =>
        isApprovalPending ||
        isMintPending ||
        isApprovalConfirming ||
        isMintConfirming ||
        insufficientBalance ||
        typeof allowance === 'undefined' ||
        typeof amount === 'undefined' ||
        amount === '',
        [
            isApprovalPending,
            isMintPending,
            isApprovalConfirming,
            isMintConfirming,
            insufficientBalance,
            allowance,
            amount
        ]
    );

    const handleAlertClose = useCallback(() => {
        if (isMintPending || isMintConfirming) {
            toast.dismiss();
        }

        if (isApprovalPending || isApprovalConfirming) {
            toast.dismiss();
        }

        if (isAlertOpen) {
            form.reset();
        }
    }, [form, isMintPending, isMintConfirming, isApprovalPending, isApprovalConfirming, isAlertOpen]);

    const buttonText = useMemo(() => {
        if (isMintPending || isApprovalPending || isMintConfirming || isApprovalConfirming) {
            return 'Minting...';
        }
        if (insufficientBalance) {
            return 'Insufficient balance';
        }
        return 'Mint';
    }, [isMintPending, isApprovalPending, isMintConfirming, isApprovalConfirming, insufficientBalance]);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex relative flex-col h-fit w-auto gap-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <CurrencyInput
                                    value={amount}
                                    onChange={handleAmountChange}
                                    coin={defaultCoin}
                                />
                            </motion.div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full rounded-xl"
                            disabled={isSubmitDisabled}
                        >
                            {buttonText}
                        </Button>
                    </div>
                </form>
            </Form>
            <AlertDialogTransaction
                isOpen={isAlertOpen}
                transactionHash={mintHash || ''}
                onClose={handleAlertClose}
            />
        </>
    );
};