const Web3 = require("web3")
const TelegramBot = require("node-telegram-bot-api")

const provider_eth = new Web3.providers.WebsocketProvider(
    "wss://eth-mainnet.g.alchemy.com/v2/thm7q9I_LFw_F2X5GXkAmfU4gcLS9M52"
)

const web3 = new Web3(provider_eth)

const bot = new TelegramBot("5973987480:AAG6pf9eQ4UqsPSp454IVF3LNVuf2xFy_tw", {
    polling: true,
})
let lastActiveChatId = null

const trackedWords = new Set()

bot.onText(/\/track (.+)/, (msg, match) => {
    lastActiveChatId = msg.chat.id
    const chatId = msg.chat.id
    const word = match[1]
    trackedWords.add(word)
    bot.sendMessage(
        chatId,
        `Now tracking tokens with "${[...trackedWords]}" in the name.`
    )
    console.log(trackedWords)
})

bot.onText(/\/t (.+)/, (msg, match) => {
    lastActiveChatId = msg.chat.id
    const chatId = msg.chat.id
    const word = match[1]
    trackedWords.add(word)

    bot.sendMessage(
        chatId,
        `Now tracking tokens with "${[...trackedWords]}" in the name.`
    )
    console.log(trackedWords)
})

bot.onText(/\/untrack (.+)/, (msg, match) => {
    lastActiveChatId = msg.chat.id
    const chatId = msg.chat.id
    const word = match[1]
    trackedWords.delete(word)
    bot.sendMessage(
        chatId,
        `No longer tracking tokens with "${word}" in the name.`
    )
    if (trackedWords.size > 0) {
        bot.sendMessage(
            chatId,
            `Still tracking tokens with "${[...trackedWords]}" in the name.`
        )
    }
    console.log(trackedWords)
})

bot.onText(/\/ut (.+)/, (msg, match) => {
    lastActiveChatId = msg.chat.id
    const chatId = msg.chat.id
    const word = match[1]
    trackedWords.delete(word)
    bot.sendMessage(
        chatId,
        `No longer tracking tokens with "${word}" in the name.`
    )
    if (trackedWords.size > 0) {
        bot.sendMessage(
            chatId,
            `Still tracking tokens with "${[...trackedWords]}" in the name.`
        )
    }
    console.log(trackedWords)
})

bot.onText(/\/list/, (msg) => {
    lastActiveChatId = msg.chat.id
    const chatId = msg.chat.id
    if (trackedWords.size > 0) {
        bot.sendMessage(
            chatId,
            `Currently tracking tokens with "${[...trackedWords]}" in the name.`
        )
    } else {
        bot.sendMessage(chatId, "No tracked words.")
    }
    console.log(trackedWords)
})

bot.onText(/\/l/, (msg) => {
    lastActiveChatId = msg.chat.id
    const chatId = msg.chat.id
    if (trackedWords.size > 0) {
        bot.sendMessage(
            chatId,
            `Currently tracking tokens with "${[...trackedWords]}" in the name.`
        )
    } else {
        bot.sendMessage(chatId, "No tracked words.")
    }
    console.log(trackedWords)
})

bot.onText(/\/help/, (msg) => {
    lastActiveChatId = msg.chat.id
    const chatId = msg.chat.id
    bot.sendMessage(
        chatId,
        `Commands:
        /track <word> - track tokens with <word> in the name
        /untrack <word> - stop tracking tokens with <word> in the name
        /list - list all tracked words
        /help - show this message`
    )
})

bot.onText(/\/h/, (msg) => {
    lastActiveChatId = msg.chat.id
    const chatId = msg.chat.id
    bot.sendMessage(
        chatId,
        "Commands:\n/list or /l - list all tracked words\n/clear or /c - clear all tracked words\n/help or /h - show this message\n/track or /t <word> - track tokens with <word> in the name\n/untrack or /ut <word> - stop tracking tokens with <word> in the name"
    )
})

bot.onText(/\/clear/, (msg) => {
    lastActiveChatId = msg.chat.id
    const chatId = msg.chat.id
    trackedWords.clear()
    bot.sendMessage(chatId, `Cleared all tracked words.`)
    console.log(trackedWords)
})

bot.onText(/\/c/, (msg) => {
    lastActiveChatId = msg.chat.id
    const chatId = msg.chat.id
    trackedWords.clear()
    bot.sendMessage(chatId, `Cleared all tracked words.`)
    console.log(trackedWords)
})

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

const main = () => {
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
                        (error, receipt) => {
                            if (error) {
                                if (
                                    !error.message.includes(
                                        "execution reverted"
                                    )
                                ) {
                                }
                            } else {
                                const tokenContract = new web3.eth.Contract(
                                    tokenABI,
                                    receipt.contractAddress
                                )
                                tokenContract.methods
                                    .name()
                                    .call((err, tokenName) => {
                                        if (err) {
                                            if (
                                                !err.message.includes(
                                                    "execution reverted"
                                                ) ||
                                                !err.message.includes(
                                                    "Returned values aren't valid"
                                                )
                                            ) {
                                            }
                                        } else {
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
                                                if (lastActiveChatId) {
                                                    bot.sendMessage(
                                                        lastActiveChatId,
                                                        `⚠️⚠️⚠️ TOKEN FOUND ⚠️⚠️⚠️\n\nToken created: <a href="https://etherscan.io/token/${receipt.contractAddress}">${tokenName}</a>\nAddress:<code><a href="copy:${receipt.contractAddress}"> ${receipt.contractAddress}</a></code>\nBlock Number: <a href="https://etherscan.io/block/${blockNumber}">${blockNumber}</a>\nTransaction Hash: <a href="https://etherscan.io/tx/${transaction.hash}">TxHash</a>`,
                                                        {
                                                            parse_mode: "HTML",
                                                            disable_web_page_preview: true,
                                                        }
                                                    )
                                                }
                                                console.log(
                                                    `⚠️⚠️⚠️ TOKEN FOUND ⚠️⚠️⚠️\n\nToken created: <a href="https://etherscan.io/token/${receipt.contractAddress}">${tokenName}</a>\nAddress:<code><a href="copy:${receipt.contractAddress}">${receipt.contractAddress}</a></code>\nBlock Number: <a href="https://etherscan.io/block/${blockNumber}">${blockNumber}</a>\nTransaction Hash: <a href="https://etherscan.io/tx/${transaction.hash}">TxHash</a>`,
                                                    {
                                                        parse_mode: "HTML",
                                                        disable_web_page_preview: true,
                                                    }
                                                )
                                            }
                                        }
                                    })
                            }
                        }
                    )
                }
            })
        } catch (err) {
            console.error("Error fetching block:", err)
            main()
            console.log("Listening for new tokens...")
        }
    })
}

main()

console.log("Listening for new tokens...")
