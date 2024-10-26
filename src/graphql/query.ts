import { gql } from "graphql-request";

export const queryMint = gql`{
    mints(orderDirection: desc, orderBy: blockTimestamp) {
        amount
        blockNumber
        blockTimestamp
        transactionHash
        user
        id
    }
}`

export const queryProof = gql`{
    offRamps(orderBy: blockTimestamp, orderDirection: desc) {
        id
        user
        requestedAmount
        requestedAmountRealWorld
        blockNumber
        blockTimestamp
        channelAccount
        channelId
        fillBlockNumber
        fillBlockTimestamp
        fillTransactionHash
        proof
        receiver
        reclaimProof
        status
        transactionHash
    }
}`

export const queryWithdraw = gql`{
    withdraws(orderBy: blockTimestamp, orderDirection: desc) {
        id
        blockTimestamp
        blockNumber
        amount
        transactionHash
        user
    }
}`

export const querySwap = gql`{
    offRamps(orderBy: blockTimestamp, orderDirection: desc) {
        id
        user
        requestedAmount
        requestedAmountRealWorld
        blockNumber
        blockTimestamp
        channelAccount
        channelId
        transactionHash
    }
}`