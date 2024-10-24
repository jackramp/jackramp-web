import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { TbCircleArrowDownFilled } from "react-icons/tb";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CurrencyInput } from "./CurrencyInput";
import { WithdrawMethod } from "./WithdrawMethod";
import { ProcessingInfo } from "./ProcessingInfo";
import { defaultCoin } from "@/constants/default-coin";
import { jackrampCoin } from "@/constants/jackramp-coin";

export interface WithdrawData {
    amount: string;
    coin: string;
    method: string;
}


interface WithdrawFormProps {
    onSubmit: (data: WithdrawData) => void;
}

export const WithdrawForm = ({ onSubmit }: WithdrawFormProps) => {
    const [amount, setAmount] = useState("0");

    const form = useForm({
        defaultValues: {
            amount: "",
            coin: "",
            method: "jackramp"
        }
    });

    const handleAmountChange = useCallback((value: string) => {
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        }
    }, []);

    const estimatedReceive = useMemo(() => {
        if (amount) {
            return (parseFloat(amount) * 1).toFixed(8);
        }
        return "0";
    }, [amount]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
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
                                            field={field}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <TbCircleArrowDownFilled className="w-9 h-9 text-gray-600 dark:text-gray-400 bg-white dark:bg-black rounded-full" />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                    >
                                        <CurrencyInput
                                            value={estimatedReceive}
                                            onChange={() => { }}
                                            disabled
                                            coin={defaultCoin}
                                            field={field}
                                        />
                                    </motion.div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <WithdrawMethod
                            value="jackramp"
                            title="Jackramp"
                            duration="~1 day"
                            rate="1:1"
                            onClick={(value) => form.setValue("method", value)}
                        />
                        <WithdrawMethod
                            value="dex"
                            title="DEX"
                            duration="~5 mins"
                            rate="1:0.9996"
                            onClick={(value) => form.setValue("method", value)}
                        />
                    </div>

                    <ProcessingInfo
                        method={form.watch("method")}
                        networkFee="$62.25"
                    />

                    <Button type="submit" className="w-full rounded-xl">
                        Withdraw Now
                    </Button>
                </div>
            </form>
        </Form>
    );
};