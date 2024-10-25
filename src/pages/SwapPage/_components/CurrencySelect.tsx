import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CoinItem } from "@/types";

interface CurrencySelectProps {
    selectedCoin: CoinItem;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (coinId: string) => void;
    coins: CoinItem[];
}

interface CurrencyOptionProps {
    coin: CoinItem;
    onSelect: () => void;
}

const CurrencyOption = ({ coin, onSelect }: CurrencyOptionProps) => (
    <Button
        variant="ghost"
        className="w-full flex justify-between items-center px-4 py-8 rounded-[20px] min-w-20"
        onClick={onSelect}
        type="button"
    >
        <div className="flex items-center gap-3">
            <img
                src={coin.image}
                alt={`${coin.name} logo`}
                className="w-8 h-8"
                loading="lazy"
            />
            <div className="flex flex-col items-start">
                <span className="font-medium">{coin.symbol}</span>
                <span className="text-sm text-muted-foreground">
                    {coin.name} ({coin.network})
                </span>
            </div>
        </div>
    </Button>
);

export const CurrencySelect = ({
    selectedCoin,
    isOpen,
    onOpenChange,
    onSelect,
    coins
}: CurrencySelectProps) => (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
            <Button
                className="w-auto h-[80%] absolute top-1/2 left-2 -translate-y-1/2 rounded-xl text-white bg-secondary/80 hover:bg-gray-700 shadow-none"
                variant="zinc"
                type="button"
            >
                {selectedCoin && (
                    <img
                        src={selectedCoin.image}
                        alt={selectedCoin.name}
                        className="w-5 h-5 rounded-full mr-2"
                        loading="lazy"
                    />
                )}
                {selectedCoin?.symbol || "Select Coin"}
            </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[80vw] sm:max-w-[500px] h-auto rounded-[20px] sm:rounded-[20px] shadow-lg">
            <DialogHeader>
                <DialogTitle className="flex justify-center text-center">Select a currency</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[400px] pr-4">
                <div className="flex flex-col gap-2">
                    {coins.map((coin) => (
                        <CurrencyOption
                            key={coin.id}
                            coin={coin}
                            onSelect={() => onSelect(coin.id)}
                        />
                    ))}
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
);