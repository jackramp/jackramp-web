import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAccount } from "wagmi";
import { ADDRESS_MOCKERC20 } from "@/constants/config";
import { useSwap } from "@/hooks/useSwap";
import { toast } from "sonner";
import { useInsufficientBalance } from "@/hooks/useInsufficientBalance";
import { HexAddress } from "@/types";
import { LoadingTransaction } from "@/components/loader/LoadingTransaction";
import { jackrampCoin } from "@/constants/jackramp-coin";
import { CurrencyInput } from "@/components/card/CurrencyInput";
import { Method } from "@/components/card/Method";
import { ProcessingInfo } from "@/components/card/ProcessingInfo";
import { SuccessDialog } from "@/components/dialog/SuccessDialog";
import { m0Coin } from "@/constants/m0-coin";
import { ArrowDownUp } from "lucide-react";

interface FormData {
    confirmed: boolean;
}

export const SwapForm = () => {
    const [amount, setAmount] = useState("");
    const { address } = useAccount();
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const {
        insufficientBalance,
    } = useInsufficientBalance(
        address as HexAddress,
        ADDRESS_MOCKERC20,
        amount
    );

    const {
        swapHash,
        isSwapPending,
        isSwapConfirming,
        isSwapConfirmed,
        handleSwap,
    } = useSwap();

    const form = useForm<FormData>({
        defaultValues: {}
    });

    const handleAmountChange = useCallback((value: string) => {
        setAmount(value);
    }, []);

    useEffect(() => {
        if (isSwapConfirmed && !isSwapConfirming) {
            setShowSuccessDialog(true);
            form.reset();
        }
    }, [isSwapConfirming, isSwapConfirmed, form]);

    const handleSubmit = useCallback(async () => {
        if (insufficientBalance) {
            toast.error('Invalid amount or not enough balance!');
            return;
        }
        setShowSuccessDialog(false);
        await handleSwap(amount);
    }, [amount, insufficientBalance, handleSwap]);

    const isSubmitDisabled = useMemo(() =>
        isSwapPending ||
        isSwapConfirming ||
        insufficientBalance ||
        typeof amount === 'undefined' ||
        amount === '',
        [
            isSwapPending,
            isSwapConfirming,
            insufficientBalance,
            amount
        ]
    );

    const buttonText = useMemo(() => {
        if (isSwapPending || isSwapConfirming) {
            return 'Swaping...';
        }
        if (insufficientBalance) {
            return 'Insufficient balance';
        }
        return 'Swap';
    }, [isSwapPending, isSwapConfirming, insufficientBalance]);

    return (
        <>
            {(isSwapPending || isSwapConfirming) && (
                <LoadingTransaction
                    message={
                        isSwapPending
                            ? 'Swapping...'
                            : 'Confirming swapping...'
                    }
                />
            )}
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
                                    coin={jackrampCoin}
                                />
                            </motion.div>
                            <motion.div className="flex items-center justify-center">
                                <ArrowDownUp />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <CurrencyInput
                                    value={amount}
                                    onChange={handleAmountChange}
                                    coin={m0Coin}
                                    disabled
                                />
                            </motion.div>
                        </div>
                        <div className="flex flex-row gap-5">
                            <Method
                                value={"jackramp"}
                                title={"JackRamp"}
                                duration={"Realtime"}
                                rate={"0%"}
                                onClick={() => { }}
                            />
                            <Method
                                value={"-"}
                                title={"Available Soon"}
                                duration={"-"}
                                rate={"-"}
                                onClick={() => { }}
                            />
                        </div>
                        <ProcessingInfo
                            method={"jackramp"}
                            networkFee={"-"}
                        />
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
            <SuccessDialog
                isOpen={showSuccessDialog}
                onClose={() => setShowSuccessDialog(false)}
                txHash={swapHash || ''}
                amount={amount}
                processName={'Swap'}
            />
        </>
    );
};