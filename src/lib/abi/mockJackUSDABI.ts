export const mockJackUSDABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_underlyingUSD",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_alignedServiceManager",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_paymentServiceAddr",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "_elfCommitment",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "_reclaimHide",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "provingSystemAuxDataCommitment",
                "type": "bytes32"
            }
        ],
        "name": "InvalidElf",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidReclaimProof",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OfframpRequestAlreadyExists",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OfframpRequestAlreadyProved",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OfframpRequestAmountIsZero",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OfframpRequestChannelAccountIsEmpty",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OfframpRequestChannelIdIsEmpty",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OfframpRequestDoesNotExist",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "fullHash",
                "type": "bytes32"
            }
        ],
        "name": "ProofAlreadyUsed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ProofGeneratorAddrMismatch",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ProofNotIncludedInBatch",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "PubInputCommitmentMismatch",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "hashedClaimInfo",
                "type": "bytes32"
            }
        ],
        "name": "ReclaimProofAlreadyUsed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "SafeERC20FailedOperation",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "StaticCallFailed",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "requestOfframpId",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "proof",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "reclaimProof",
                "type": "bytes32"
            }
        ],
        "name": "FillOfframp",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Mint",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "requestOfframpId",
                "type": "bytes32"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountRealWorld",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "channelAccount",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "channelId",
                        "type": "bytes32"
                    }
                ],
                "indexed": false,
                "internalType": "struct Jackramp.OfframpRequestParams",
                "name": "params",
                "type": "tuple"
            }
        ],
        "name": "RequestOfframp",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdraw",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "alignedServiceManager",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "elfCommitment",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "proofCommitment",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "pubInputCommitment",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "provingSystemAuxDataCommitment",
                "type": "bytes32"
            },
            {
                "internalType": "bytes20",
                "name": "proofGeneratorAddr",
                "type": "bytes20"
            },
            {
                "internalType": "bytes32",
                "name": "batchMerkleRoot",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "merkleProof",
                "type": "bytes"
            },
            {
                "internalType": "uint256",
                "name": "verificationDataBatchIndex",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "pubInputBytes",
                "type": "bytes"
            }
        ],
        "name": "fillOfframp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "offrampRequests",
        "outputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountRealWorld",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "channelAccount",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "channelId",
                "type": "bytes32"
            },
            {
                "internalType": "bool",
                "name": "isProved",
                "type": "bool"
            },
            {
                "internalType": "bytes32",
                "name": "proof",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "reclaimProof",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paymentServiceAddr",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "reclaimHide",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountRealWorld",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "channelAccount",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "channelId",
                        "type": "bytes32"
                    }
                ],
                "internalType": "struct Jackramp.OfframpRequestParams",
                "name": "params",
                "type": "tuple"
            }
        ],
        "name": "requestOfframp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "underlyingUSD",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "usedProofs",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "usedReclaimProofs",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]