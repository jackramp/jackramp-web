import { columns } from "@/components/tables/proof/columns";
import { DataTable } from "@/components/tables/proof/DataTable";
import { TransactionContract } from "@/types";
import { useEffect, useState } from "react";
import dataTransaction from "@/data/mockTransaction.json"
import debounce from "lodash.debounce";
import { useAccount } from "wagmi";
import { toast } from "sonner";

export default function TableProof() {
    const [hasMounted, setHasMounted] = useState(false);
    const { address } = useAccount();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);
    
    const handleRefresh = debounce(() => {
        if (!address) {
            toast.error('Please connect your wallet first');
            return;
        }
        setIsLoading(true);
    }, 300);

    const data: TransactionContract[] = dataTransaction

    if (!hasMounted) {
        return null;
    }

    return (
        <div className="w-full space-y-4 p-5 h-auto z-10">
            <DataTable
                data={data}
                columns={columns()}
                handleRefresh={handleRefresh}
                isLoading={isLoading}
            />
        </div>
    );
}