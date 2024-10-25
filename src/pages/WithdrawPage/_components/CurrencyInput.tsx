import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CoinItem } from "@/types";
import { useCallback } from "react";

interface CurrencyInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    coin?: CoinItem;
    className?: string;
    maxDecimals?: number;
}

export const CurrencyInput = ({
    value,
    onChange,
    disabled = false,
    coin,
    className,
    maxDecimals = 6,
}: CurrencyInputProps) => {
    // Format the displayed value
    const formatDisplayValue = useCallback((val: string) => {
        if (!val) return "";
        
        let cleaned = val.replace(/[^\d.]/g, '');
        
        const parts = cleaned.split('.');
        if (parts.length > 2) {
            cleaned = parts[0] + '.' + parts.slice(1).join('');
        }
        
        if (parts.length === 2 && parts[1].length > maxDecimals) {
            cleaned = parts[0] + '.' + parts[1].slice(0, maxDecimals);
        }
        
        const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const decimalPart = parts[1] ? '.' + parts[1] : '';
        
        return wholePart + decimalPart;
    }, [maxDecimals]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        
        const rawValue = input.replace(/,/g, '');
        
        if (rawValue === '' || /^\d*\.?\d*$/.test(rawValue)) {
            onChange(rawValue);
        }
    }, [onChange]);

    const displayValue = formatDisplayValue(value);

    return (
        <div className="relative h-[70px]">
            <Input
                type="text"
                value={displayValue}
                onChange={handleInputChange}
                disabled={disabled}
                placeholder="0.00"
                inputMode="decimal"
                className={cn(
                    "h-full relative text-end text-2xl border-[3px] rounded-2xl border-slate-500",
                    "placeholder:text-gray-400",
                    className
                )}
            />
            {coin && (
                <Button
                    className="w-auto h-[80%] absolute top-1/2 left-2 -translate-y-1/2 rounded-xl text-white 
                    bg-secondary/80 hover:bg-gray-700 shadow-none"
                    variant="zinc"
                >
                    <img
                        src={coin.image}
                        alt={coin.symbol}
                        className="w-5 h-5 rounded-full mr-2"
                    />
                    {coin.symbol}
                </Button>
            )}
        </div>
    );
};