import { convertBigIntToNumber } from "@/lib/utils";
import { Clock, Info, Wallet } from "lucide-react";

interface ProcessingInfoProps {
    method: string;
    networkFee: string;
    balanceLoading: boolean;
    balance?: bigint;
}

export const ProcessingInfo = ({ method, networkFee, balanceLoading, balance }: ProcessingInfoProps) => (
    <div className="p-4 rounded-lg space-y-2">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Est. processing time</span>
            </div>
            <span className="text-sm font-medium">
                {method === "lido" ? "~10 second" : "~5 minutes"}
            </span>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="text-sm">Your Balance</span>
            </div>
            <span className="text-sm font-medium">
                {balanceLoading ? 'Loading...' : `${(convertBigIntToNumber(balance as bigint))} USDC`}
            </span>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="text-sm">Network fee</span>
            </div>
            <span className="text-sm font-medium">{networkFee} USDC</span>
        </div>
    </div>
);
