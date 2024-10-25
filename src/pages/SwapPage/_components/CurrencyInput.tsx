import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CoinItem } from "@/types";

interface FieldProps {
    name: string;
    value: string;
}

interface CurrencyInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    coin?: CoinItem;
    className?: string;
    field: FieldProps
}

export const CurrencyInput = ({
    value,
    onChange,
    disabled = false,
    coin,
    className,
    field
}: CurrencyInputProps) => (
    <div className="relative h-[70px]">
        <Input
            {...field}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={cn(
                "h-full relative text-end text-2xl border-[3px] rounded-2xl border-slate-500",
                className
            )}
        />
        {coin && (
            <Button
            className="w-auto h-[80%] absolute top-1/2 left-2 -translate-y-1/2 rounded-xl text-white bg-secondary/80 hover:bg-gray-700 shadow-none"
            variant={"zinc"}
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