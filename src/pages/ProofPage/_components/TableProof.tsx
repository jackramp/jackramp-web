import { columns } from "@/components/tables/proof/columns";
import { DataTable } from "@/components/tables/proof/DataTable";
import { useEffect, useState } from "react";
import { gql, request } from 'graphql-request';
import { useQuery } from "@tanstack/react-query";
import { RequestOffRamps } from "@/types";

const query = gql`{
    requestOfframps(orderBy: blockTimestamp, orderDirection: desc) {
        blockNumber
        blockTimestamp
        id
        params_amount
        params_amountRealWorld
        params_channelAccount
        params_channelId
        params_user
        requestOfframpId
        transactionHash
    }
}`

type QueryData = {
    requestOfframps: RequestOffRamps[];
};

export default function TableProof() {
    const [hasMounted, setHasMounted] = useState(false);

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

    if (!hasMounted) {
        return null;
    }

    return (
        <div className="w-full space-y-4 p-5 h-auto z-10">
            <DataTable
                data={data?.requestOfframps || []}
                columns={columns()}
                handleRefresh={handleRefresh}
                isLoading={isLoading}
            />
        </div>
    );
}
