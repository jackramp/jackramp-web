import { Clock, Info } from "lucide-react";

interface ProcessingInfoProps {
    method: string;
    networkFee: string;
}

export const ProcessingInfo = ({ method, networkFee }: ProcessingInfoProps) => (
    <div className="p-4 rounded-lg space-y-2">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Est. processing time</span>
            </div>
            <span className="text-sm font-medium">
                {method === "lido" ? "~1 day" : "~5 minutes"}
            </span>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="text-sm">Network fee</span>
            </div>
            <span className="text-sm font-medium">{networkFee}</span>
        </div>
    </div>
);
