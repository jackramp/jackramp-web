import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { CurrencyInput } from "./CurrencyInput";
import { WithdrawMethod } from "./WithdrawMethod";
import { ProcessingInfo } from "./ProcessingInfo";
import { useAccount } from "wagmi";
import { useERC20Balance } from "@/hooks/useERC20Balance";
import { HexAddress } from "@/types";
import { ADDRESS_JACKUSD, USDC_DECIMALS } from "@/constants/config";
import { Label } from "@/components/ui/label";
import { AlertDialogTransaction } from "../../MintPage/_components/AlertDialogTransaction";
import { useWithdraw } from "@/hooks/useWithdraw";
import { convertBigIntToNumber } from "@/lib/utils";
import { toast } from "sonner";
import { jackrampCoin } from "@/constants/jackramp-coin";

interface FormData {
    confirmed: boolean;
}

export const WithdrawForm = (props: any) => {
    const [amount, setAmount] = useState("0");
    const { address } = useAccount();
    const { balance, loading: balanceLoading } = useERC20Balance(address as HexAddress, ADDRESS_JACKUSD);

    const {
        isAlertOpen,
        isWithdrawPending,
        withdrawHash,
        isWithdrawConfirming,
        handleWithdraw
    } = useWithdraw();

    const form = useForm<FormData>({
        defaultValues: {
            confirmed: false
        }
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

    const handleSubmit = useCallback(async (data: FormData) => {
        if (!data.confirmed || insufficientBalance) {
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

    const handleAlertClose = useCallback(() => {
        if (isWithdrawPending || isWithdrawConfirming) {
            toast.dismiss();
        }

        if (isAlertOpen) {
            form.reset();
        }
    }, [form, isWithdrawPending, isWithdrawConfirming, isAlertOpen]);

    return (
        <>
            <Form {...form} {...props}>
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

                        <div className="grid grid-cols-2 gap-4">
                            <WithdrawMethod
                                value="jackramp"
                                title="Jackramp"
                                duration="~10 second"
                                rate="1:1"
                            />
                            <WithdrawMethod
                                value=""
                                title="Available soon"
                                duration="-"
                                rate="-"
                            />
                        </div>

                        <ProcessingInfo
                            method={"lido"}
                            networkFee="0.5"
                            balanceLoading={balanceLoading}
                            balance={balance}
                        />

                        <FormField
                            control={form.control}
                            name="confirmed"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 pt-3">
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="accent-primary cursor-pointer"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="cursor-pointer">Confirm transaction</FormLabel>
                                        <FormDescription>
                                            I understand this action cannot be undone
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
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
            <AlertDialogTransaction
                isOpen={isAlertOpen}
                transactionHash={withdrawHash || ''}
                onClose={handleAlertClose}
            />
        </>
    );
};