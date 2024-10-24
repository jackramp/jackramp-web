import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { defaultCoin } from "@/constants/default-coin";
import { CurrencyInput } from "./CurrencyInput";
import { MintMethod } from "./MintMethod";
import { ProcessingInfo } from "./ProcessingInfo";

export interface MintData {
    amount: string;
    coin: string;
    method: string;
}


interface MintFormProps {
    onSubmit: (data: MintData) => void;
}

export const MintForm = ({ onSubmit }: MintFormProps) => {
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
                        <MintMethod
                            value="jackramp"
                            title="Jackramp"
                            duration="~1 day"
                            rate="1:1"
                            onClick={(value) => form.setValue("method", value)}
                        />
                        <MintMethod
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
                        Mint Now
                    </Button>
                </div>
            </form>
        </Form>
    );
};