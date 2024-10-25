import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { MdSwapVerticalCircle } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import coins from "@/data/coins.json";
import { defaultCoin } from "@/constants/default-coin";
import { CurrencyInput } from "./CurrencyInput";
import { CurrencySelect } from "./CurrencySelect";
import { SwapMethod } from "./SwapMethod";
import { ProcessingInfo } from "./ProcessingInfo";
import { jackrampCoin } from "@/constants/jackramp-coin";

export interface SwapData {
    amount: string;
    coin: string;
    method: string;
}

interface SwapFormProps {
    onSubmit: (data: SwapData) => void;
}

export const SwapForm = ({ onSubmit }: SwapFormProps) => {
    const [amount, setAmount] = useState("0");
    const [selectedCoin, setSelectedCoin] = useState(defaultCoin);
    const [selectedCoinTarget, setSelectedCoinTarget] = useState(jackrampCoin);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogOpenTarget, setIsDialogOpenTarget] = useState(false);

    const form = useForm({
        defaultValues: {
            amount: "",
            coin: defaultCoin.id,
            targetCoin: jackrampCoin.id,
            method: "jackramp"
        }
    });

    const handleAmountChange = useCallback((value: string) => {
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
            form.setValue("amount", value);
        }
    }, [form]);

    const estimatedReceive = useMemo(() => {
        if (amount) {
            return (parseFloat(amount) * 1).toFixed(8);
        }
        return "0";
    }, [amount]);

    const handleCoinSelection = useCallback((coinId: string, isTarget: boolean) => {
        const selectedCoinObj = coins.find((c) => c.id === coinId);
        
        if (!selectedCoinObj) return;

        if (isTarget) {
            if (selectedCoin.id === coinId) {
                // If selecting same coin as source, swap them
                setSelectedCoinTarget(selectedCoin);
                setSelectedCoin(selectedCoinTarget);
                form.setValue("coin", selectedCoinTarget.id);
                form.setValue("targetCoin", selectedCoin.id);
            } else {
                setSelectedCoinTarget(selectedCoinObj);
                form.setValue("targetCoin", coinId);
            }
        } else {
            if (selectedCoinTarget.id === coinId) {
                // If selecting same coin as target, swap them
                setSelectedCoin(selectedCoinTarget);
                setSelectedCoinTarget(selectedCoin);
                form.setValue("coin", selectedCoinTarget.id);
                form.setValue("targetCoin", selectedCoin.id);
            } else {
                setSelectedCoin(selectedCoinObj);
                form.setValue("coin", coinId);
            }
        }
        
        // Close the appropriate dialog
        if (isTarget) {
            setIsDialogOpenTarget(false);
        } else {
            setIsDialogOpen(false);
        }
    }, [selectedCoin, selectedCoinTarget, form]);

    const handleSwapPositions = useCallback(() => {
        const tempCoin = selectedCoin;
        setSelectedCoin(selectedCoinTarget);
        setSelectedCoinTarget(tempCoin);
        form.setValue("coin", selectedCoinTarget.id);
        form.setValue("targetCoin", selectedCoin.id);
    }, [selectedCoin, selectedCoinTarget, form]);

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
                                    <div className="relative">
                                        <CurrencyInput
                                            value={amount}
                                            onChange={handleAmountChange}
                                            coin={selectedCoin}
                                            field={field}
                                            className="border-[3px] border-slate-600 focus:border-slate-500 outline-0"
                                        />
                                        <CurrencySelect
                                            selectedCoin={selectedCoin}
                                            isOpen={isDialogOpen}
                                            onOpenChange={setIsDialogOpen}
                                            onSelect={(coinId) => handleCoinSelection(coinId, false)}
                                            coins={coins}
                                        />
                                    </div>

                                    <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <button 
                                            type="button" 
                                            onClick={handleSwapPositions}
                                            className="bg-transparent border-none p-0 cursor-pointer"
                                        >
                                            <MdSwapVerticalCircle className="w-8 h-8 text-gray-600 dark:text-gray-400 bg-white dark:bg-black rounded-full" />
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <CurrencyInput
                                            value={estimatedReceive}
                                            onChange={handleAmountChange}
                                            disabled
                                            coin={selectedCoinTarget}
                                            field={field}
                                            className="border-[3px] border-slate-600"
                                        />
                                        <CurrencySelect
                                            selectedCoin={selectedCoinTarget}
                                            isOpen={isDialogOpenTarget}
                                            onOpenChange={setIsDialogOpenTarget}
                                            onSelect={(coinId) => handleCoinSelection(coinId, true)}
                                            coins={coins}
                                        />
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <SwapMethod
                            value="jackramp"
                            title="Jackramp"
                            duration="~1 day"
                            rate="1:1"
                            onClick={(value) => form.setValue("method", value)}
                        />
                        <SwapMethod
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

                    <Button type="submit" className="w-full">
                        Swap Now
                    </Button>
                </div>
            </form>
        </Form>
    );
};