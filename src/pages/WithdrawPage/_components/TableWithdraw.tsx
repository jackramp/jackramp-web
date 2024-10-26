import { columns } from "@/components/tables/withdraw/columns";
import { DataTable } from "@/components/tables/withdraw/DataTable";
import { useEffect, useState } from "react";
import { gql, request } from 'graphql-request';
import { useQuery } from "@tanstack/react-query";
import { Withdraw } from "@/types";
import { useAccount } from "wagmi";

const query = gql`{
    withdraws(orderBy: blockTimestamp, orderDirection: desc) {
        id
        blockTimestamp
        blockNumber
        amount
        transactionHash
        user
    }
}`

type QueryData = {
    mints: Withdraw[];
};

export default function TableWithdraw() {
    const [hasMounted, setHasMounted] = useState(false);
    const { address } = useAccount();

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const url = 'https://api.studio.thegraph.com/query/91582/jackramp-web/version/latest';

    const { data, isLoading, refetch } = useQuery<QueryData>({
        queryKey: ['data'],
        queryFn: async () => {
            return await request(url, query);
        },
        refetchInterval: 10000,
    });

    const handleRefresh = () => {
        refetch();
    };

    const filteredMints = data?.mints && address ? data?.mints.filter((mint: Withdraw) => mint.user.toLocaleLowerCase() === address.toLocaleLowerCase()) : [];

    if (!hasMounted) {
        return null;
    }

    return (
        <div className="w-full space-y-4 p-5 h-auto z-10">
            <DataTable
                data={filteredMints || []}
                columns={columns()}
                handleRefresh={handleRefresh}
                isLoading={isLoading}
            />
        </div>
    );
}
