import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAccount } from "wagmi";
import { useBalance } from "@/hooks/useBalance";
import { HexAddress } from "@/types";
import { ADDRESS_JACKUSD, USDC_DECIMALS } from "@/constants/config";
import { Label } from "@/components/ui/label";
import { useWithdraw } from "@/hooks/useWithdraw";
import { convertBigIntToNumber } from "@/lib/utils";
import { toast } from "sonner";
import { jackrampCoin } from "@/constants/jackramp-coin";
import { SuccessDialog } from "../../../components/dialog/SuccessDialog";
import { ProcessingInfo } from "@/components/card/ProcessingInfo";
import { Method } from "@/components/card/Method";
import { CurrencyInput } from "@/components/card/CurrencyInput";
import { LoadingTransaction } from "@/components/loader/LoadingTransaction";

export const WithdrawForm = () => {
    const [amount, setAmount] = useState("");
    const { address } = useAccount();
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const { balance } = useBalance(address as HexAddress, ADDRESS_JACKUSD);

    const {
        isWithdrawPending,
        withdrawHash,
        isWithdrawConfirming,
        handleWithdraw
    } = useWithdraw();

    const form = useForm<FormData>({
        defaultValues: {}
    });

    const handleAmountChange = useCallback((value: string) => {
        const numericValue = value.replace(/[^0-9.]/g, '');
        const parts = numericValue.split('.');
        if (parts.length > 2) return;
        if (parts[1]?.length > USDC_DECIMALS) return;
        setAmount(numericValue);
    }, []);

    const insufficientBalance = useMemo(() => {
        if (balance === undefined || amount === '') return false;
        return convertBigIntToNumber(balance) < convertBigIntToNumber(BigInt(amount));
    }, [balance, amount]);

    const handleSubmit = useCallback(async () => {
        if (insufficientBalance) {
            toast.error('Invalid amount or not enough balance!');
            return;
        }
        await handleWithdraw(amount);
    }, [amount, insufficientBalance, handleWithdraw]);

    const isSubmitDisabled = useMemo(() =>
        isWithdrawPending ||
        isWithdrawConfirming ||
        insufficientBalance ||
        typeof amount === 'undefined' ||
        amount === '0' ||
        amount === '',
        [
            isWithdrawPending,
            isWithdrawConfirming,
            insufficientBalance,
            amount
        ]
    );

    return (
        <>
            {(isWithdrawPending || isWithdrawConfirming) && (
                <LoadingTransaction
                    message={
                        isWithdrawPending
                            ? 'Withdrawing...'
                            : 'Confirming withdrawal...'
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
                            {isWithdrawPending || isWithdrawConfirming ? 'Withdrawing...' : 'Withdraw'}
                        </Button>
                        {insufficientBalance && (
                            <Label className="text-red-500 text-sm font-medium">
                                Insufficient balance to complete this purchase.
                            </Label>
                        )}
                    </div>
                </form>
            </Form>
            <SuccessDialog
                isOpen={showSuccessDialog}
                onClose={() => setShowSuccessDialog(false)}
                txHash={withdrawHash || ''}
                amount={amount}
            />
        </>
    );
};