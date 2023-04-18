const Web3 = require("web3")
const TelegramBot = require("node-telegram-bot-api")

const provider_eth = new Web3.providers.WebsocketProvider(
    "wss://eth-mainnet.g.alchemy.com/v2/thm7q9I_LFw_F2X5GXkAmfU4gcLS9M52"
)

const web3 = new Web3(provider_eth)

const bot = new TelegramBot("5973987480:AAG6pf9eQ4UqsPSp454IVF3LNVuf2xFy_tw", {
    polling: true,
})

let logAll = false

const trackedWordsByChatId = {}

bot.onText(/\/(track|t) (.+)/, (msg, match) => {
    const chatId = msg.chat.id
    const word = match[2]

    // Check if the chatId exists in trackedWordsByChatId, otherwise create a new Set
    if (!trackedWordsByChatId[chatId]) {
        trackedWordsByChatId[chatId] = new Set()
    }

    trackedWordsByChatId[chatId].add(word)

    bot.sendMessage(
        chatId,
        `Now tracking tokens with "${[
            ...trackedWordsByChatId[chatId],
        ]}" in the name.`
    )
    console.log(trackedWordsByChatId)
})

bot.onText(/\/(untrack|ut) (.+)/, (msg, match) => {
    const chatId = msg.chat.id
    const word = match[2]

    // Check if the chatId exists in trackedWordsByChatId, otherwise create a new Set
    if (!trackedWordsByChatId[chatId]) {
        trackedWordsByChatId[chatId] = new Set()
    }

    trackedWordsByChatId[chatId].delete(word)
    bot.sendMessage(
        chatId,
        `No longer tracking tokens with "${word}" in the name.`
    )
    if (trackedWordsByChatId[chatId].size > 0) {
        bot.sendMessage(
            chatId,
            `Still tracking tokens with "${[
                ...trackedWordsByChatId[chatId],
            ]}" in the name.`
        )
    }
    console.log(trackedWordsByChatId)
})

bot.onText(/\/(all|a)/, (msg) => {
    const chatId = msg.chat.id

    // Check if the chatId exists in trackedWordsByChatId, otherwise create a new Set
    if (!trackedWordsByChatId[chatId]) {
        trackedWordsByChatId[chatId] = new Set()
    }

    if (logAll) {
        bot.sendMessage(chatId, `Logging all tokens is already enabled.`)
        return
    }

    logAll = true

    bot.sendMessage(chatId, `Now logging all token deployments.`)
})

bot.onText(/\/(none|n)/, (msg) => {
    const chatId = msg.chat.id

    // Check if the chatId exists in trackedWordsByChatId, otherwise create a new Set
    if (!trackedWordsByChatId[chatId]) {
        trackedWordsByChatId[chatId] = new Set()
    }

    if (!logAll) {
        bot.sendMessage(chatId, `Logging all tokens was already disabled.`)
        return
    }

    logAll = false

    bot.sendMessage(chatId, `No longer logging all token deployments.`)
})

bot.onText(/\/(list|l)/, (msg) => {
    const chatId = msg.chat.id

    // Check if the chatId exists in trackedWordsByChatId, otherwise create a new Set
    if (!trackedWordsByChatId[chatId]) {
        trackedWordsByChatId[chatId] = new Set()
    }

    if (trackedWordsByChatId[chatId].size > 0) {
        bot.sendMessage(
            chatId,
            `Currently tracking tokens with "${[
                ...trackedWordsByChatId[chatId],
            ]}" in the name.`
        )
    } else {
        bot.sendMessage(chatId, "No tracked words.")
    }
    console.log(trackedWordsByChatId)
})

bot.onText(/\/(help|h)/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(
        chatId,
        "Commands:\n/list or /l - list all tracked words\n/clear or /c - clear all tracked words\n/help or /h - show this message\n/all or /a - tracks all tokens being deployed\n/none or /n stops tracking all tokens being deployed\n/track or /t <word> - track tokens with <word> in the name\n/untrack or /ut <word> - stop tracking tokens with <word> in the name"
    )
})

bot.onText(/\/(clear|c)/, (msg) => {
    const chatId = msg.chat.id

    // Check if the chatId exists in trackedWordsByChatId, otherwise create a new Set
    if (!trackedWordsByChatId[chatId]) {
        trackedWordsByChatId[chatId] = new Set()
    }

    trackedWordsByChatId[chatId].clear()
    bot.sendMessage(chatId, `Cleared all tracked words.`)
    console.log(trackedWordsByChatId)
})

// const factoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"

// const factoryABI = [
//     {
//         inputs: [
//             { internalType: "address", name: "_feeToSetter", type: "address" },
//         ],
//         payable: false,
//         stateMutability: "nonpayable",
//         type: "constructor",
//     },
// {
//     anonymous: false,
//     inputs: [
//         {
//             indexed: true,
//             internalType: "address",
//             name: "token0",
//             type: "address",
//         },
//         {
//             indexed: true,
//             internalType: "address",
//             name: "token1",
//             type: "address",
//         },
//         {
//             indexed: false,
//             internalType: "address",
//             name: "pair",
//             type: "address",
//         },
//         {
//             indexed: false,
//             internalType: "uint256",
//             name: "",
//             type: "uint256",
//         },
//     ],
//     name: "PairCreated",
//     type: "event",
// },
//     {
//         constant: true,
//         inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//         name: "allPairs",
//         outputs: [{ internalType: "address", name: "", type: "address" }],
//         payable: false,
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         constant: true,
//         inputs: [],
//         name: "allPairsLength",
//         outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//         payable: false,
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         constant: false,
//         inputs: [
//             { internalType: "address", name: "tokenA", type: "address" },
//             { internalType: "address", name: "tokenB", type: "address" },
//         ],
//         name: "createPair",
//         outputs: [{ internalType: "address", name: "pair", type: "address" }],
//         payable: false,
//         stateMutability: "nonpayable",
//         type: "function",
//     },
//     {
//         constant: true,
//         inputs: [],
//         name: "feeTo",
//         outputs: [{ internalType: "address", name: "", type: "address" }],
//         payable: false,
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         constant: true,
//         inputs: [],
//         name: "feeToSetter",
//         outputs: [{ internalType: "address", name: "", type: "address" }],
//         payable: false,
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         constant: true,
//         inputs: [
//             { internalType: "address", name: "", type: "address" },
//             { internalType: "address", name: "", type: "address" },
//         ],
//         name: "getPair",
//         outputs: [{ internalType: "address", name: "", type: "address" }],
//         payable: false,
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         constant: false,
//         inputs: [{ internalType: "address", name: "_feeTo", type: "address" }],
//         name: "setFeeTo",
//         outputs: [],
//         payable: false,
//         stateMutability: "nonpayable",
//         type: "function",
//     },
//     {
//         constant: false,
//         inputs: [
//             { internalType: "address", name: "_feeToSetter", type: "address" },
//         ],
//         name: "setFeeToSetter",
//         outputs: [],
//         payable: false,
//         stateMutability: "nonpayable",
//         type: "function",
//     },
// ]

const tokenABI = [
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
]

// const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress)

web3.eth.subscribe("newBlockHeaders", async (error, blockHeader) => {
    if (error) {
        console.error("Error:", error)
        return
    }

    const blockNumber = blockHeader.number
    try {
        const block = await web3.eth.getBlock(blockNumber, true)
        const transactionCount = block.transactions.length
        console.log(
            `Block number: ${blockNumber} - Transaction count: ${transactionCount}`
        )

        block.transactions.forEach((transaction) => {
            if (transaction.to === null) {
                web3.eth.getTransactionReceipt(
                    transaction.hash,
                    async (error, receipt) => {
                        if (error) {
                            console.error(
                                "Error in transaction receipt:",
                                error
                            )
                        } else {
                            console.log("Transaction receipt:", receipt)

                            const PairCreatedEventSignature =
                                web3.eth.abi.encodeEventSignature({
                                    anonymous: false,
                                    inputs: [
                                        {
                                            indexed: true,
                                            internalType: "address",
                                            name: "token0",
                                            type: "address",
                                        },
                                        {
                                            indexed: true,
                                            internalType: "address",
                                            name: "token1",
                                            type: "address",
                                        },
                                        {
                                            indexed: false,
                                            internalType: "address",
                                            name: "pair",
                                            type: "address",
                                        },
                                        {
                                            indexed: false,
                                            internalType: "uint256",
                                            name: "",
                                            type: "uint256",
                                        },
                                    ],
                                    name: "PairCreated",
                                    type: "event",
                                })
                            console.log(
                                "PairCreatedEventSignature",
                                PairCreatedEventSignature
                            )
                            const pairCreatedEvent = receipt.logs.find(
                                (log) =>
                                    log.topics[0] === PairCreatedEventSignature
                            )

                            console.log("pairCreatedEvent", pairCreatedEvent)

                            if (pairCreatedEvent) {
                                const tokenContract = new web3.eth.Contract(
                                    tokenABI,
                                    receipt.contractAddress
                                )
                                tokenContract.methods
                                    .name()
                                    .call((err, tokenName) => {
                                        if (err) {
                                            console.error(
                                                "Error in token name:",
                                                err
                                            )
                                        } else {
                                            Object.entries(
                                                trackedWordsByChatId
                                            ).forEach(
                                                ([chatId, trackedWords]) => {
                                                    if (logAll) {
                                                        bot.sendMessage(
                                                            chatId,
                                                            `⚠️⚠️⚠️ TOKEN FOUND ⚠️⚠️⚠️\n\nToken created: <a href="https://etherscan.io/token/${receipt.contractAddress}">${tokenName}</a>\nAddress:<code><a href="copy:${receipt.contractAddress}"> ${receipt.contractAddress}</a></code>\nBlock Number: <a href="https://etherscan.io/block/${blockNumber}">${blockNumber}</a>\nTransaction Hash: <a href="https://etherscan.io/tx/${transaction.hash}">TxHash</a>`,
                                                            {
                                                                parse_mode:
                                                                    "HTML",
                                                                disable_web_page_preview: true,
                                                            }
                                                        )
                                                    }
                                                    let shouldLog = false
                                                    for (let word of trackedWords) {
                                                        if (
                                                            tokenName
                                                                .toLowerCase()
                                                                .includes(
                                                                    word.toLowerCase()
                                                                )
                                                        ) {
                                                            shouldLog = true
                                                            break
                                                        }
                                                    }
                                                    if (shouldLog) {
                                                        bot.sendMessage(
                                                            chatId,
                                                            `⚠️⚠️⚠️ TOKEN FOUND ⚠️⚠️⚠️\n\nToken created: <a href="https://etherscan.io/token/${receipt.contractAddress}">${tokenName}</a>\nAddress:<code><a href="copy:${receipt.contractAddress}"> ${receipt.contractAddress}</a></code>\nBlock Number: <a href="https://etherscan.io/block/${blockNumber}">${blockNumber}</a>\nTransaction Hash: <a href="https://etherscan.io/tx/${transaction.hash}">TxHash</a>`,
                                                            {
                                                                parse_mode:
                                                                    "HTML",
                                                                disable_web_page_preview: true,
                                                            }
                                                        )
                                                    }
                                                }
                                            )
                                        }
                                    })
                            }
                        }
                    }
                )
            }
        })
    } catch (err) {
        console.error("Error fetching block:", err)
    }
})

console.log("Listening for new tokens...")
