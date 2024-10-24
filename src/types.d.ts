export type HexAddress = `0x${string}`;

export interface CoinItem {
    id: string;
    symbol: string;
    name: string;
    network: string;
    network_symbol: string;
    chain_id: number;
    is_maintenance: boolean;
    is_token: boolean;
    contract_address: string;
    decimals: number;
    max_trade_decimals: number;
    image: string;
}

export interface TransactionContract {
    account: string;
    productId: number;
    timestamp: number;
    marketplaceId: number;
    proved: boolean;
    link: string;
}

export interface LiquidityContract {
    token: string;
    platform: string;
    depositor: string;
    amount: number;
    conversionRate: number;
}