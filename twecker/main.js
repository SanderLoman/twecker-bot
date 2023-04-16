const Web3 = require("web3")
const TelegramBot = require("node-telegram-bot-api")

const provider_eth = new Web3.providers.WebsocketProvider("ws://127.0.0.1:3334")

const web3 = new Web3(provider_eth)

const bot = new TelegramBot("5973987480:AAG6pf9eQ4UqsPSp454IVF3LNVuf2xFy_tw", {
    polling: true,
})

const trackedWords = new Set()

bot.onText(/\/track (.+)/, (msg, match) => {
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
    const chatId = msg.chat.id
    bot.sendMessage(
        chatId,
        "Commands:\n/list or /l - list all tracked words\n/clear or /c - clear all tracked words\n/help or /h - show this message\n/track or /t <word> - track tokens with <word> in the name\n/untrack or /ut <word> - stop tracking tokens with <word> in the name"
    )
})

bot.onText(/\/clear/, (msg) => {
    const chatId = msg.chat.id
    trackedWords.clear()
    bot.sendMessage(chatId, `Cleared all tracked words.`)
    console.log(trackedWords)
})

bot.onText(/\/c/, (msg) => {
    const chatId = msg.chat.id
    trackedWords.clear()
    bot.sendMessage(chatId, `Cleared all tracked words.`)
    console.log(trackedWords)
})

const factoryAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"

const factoryABI = [
    {
        inputs: [
            { internalType: "address", name: "_feeToSetter", type: "address" },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
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
    },
    {
        constant: true,
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "allPairs",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "allPairsLength",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { internalType: "address", name: "tokenA", type: "address" },
            { internalType: "address", name: "tokenB", type: "address" },
        ],
        name: "createPair",
        outputs: [{ internalType: "address", name: "pair", type: "address" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "feeTo",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "feeToSetter",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "address", name: "", type: "address" },
        ],
        name: "getPair",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [{ internalType: "address", name: "_feeTo", type: "address" }],
        name: "setFeeTo",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            { internalType: "address", name: "_feeToSetter", type: "address" },
        ],
        name: "setFeeToSetter",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
]

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

const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress)

web3.eth.subscribe("newBlockHeaders", async (error, blockHeader) => {
    if (error) {
        console.error("Error:", error)
        return
    }

    const blockNumber = blockHeader.number
    try {
        const block = await web3.eth.getBlock(blockNumber, true) // Set the second argument to true to get transaction details
        const transactionCount = block.transactions.length
        console.log(
            `Block number: ${blockNumber} - Transaction count: ${transactionCount}`
        )
        // check if to = null then it is a token creation, and then check the logs for the name
        block.transactions.forEach((transaction) => {
            console.log(`TxHash ${transaction.hash} To: ${transaction.to}`)
        })
    } catch (err) {
        console.error("Error fetching block:", err)
    }
})

console.log("Listening for new tokens...")
