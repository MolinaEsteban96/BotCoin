const Discord = require("discord.js");
const Sequelize = require("sequelize");
const CoinGecko = require("coingecko-api");
const fs = require("fs");

const data = fs.readFileSync("settings.json");
const settings = JSON.parse(data);

/*FETCH COINGECKO INFO*/

var getCrypto = async (crypto) => {

    const CoinClient = new CoinGecko();
    var bitcoinData;
    await CoinClient.coins.markets({ids: crypto}).then(data => {

        bitcoinData = data.data[0];
    });

    return bitcoinData
}

/*BOT EMBEDS*/

async function createEmbed(cryptoData) {

    var createdEmbed = await new Discord.MessageEmbed()
        .setAuthor("BotCoin")
        .setThumbnail(cryptoData.image)
        .setTitle(cryptoData.name + " (" + cryptoData.symbol + ")")
        .setFooter("Botcoin")
        .setTimestamp()
        .setColor("#ecff54")
        .addFields(

            {name: "US$ " + cryptoData.current_price, value: "Precio Actual"},
            {name: "US$ " + cryptoData.market_cap, value: "Capitalización de Mercado"},
            {name: "US$ " + cryptoData.high_24h, value: "Máximo últimas 24hrs"},
            {name: "US$ " + cryptoData.low_24h, value: "Mínimo últimas 24hrs"},
            {name: cryptoData.circulating_supply, value: "Supply circulante"},
            {name: cryptoData.total_supply, value: "Supply total"},
            {name: cryptoData.last_updated, value: "Ültima actualización (-3hrs para Argentina)"}
        )

    return createdEmbed
}

/*BOT INIT*/

const client = new Discord.Client();

client.on("ready", () => {

    console.log("Bot listo!")
})

/*BOT LOGIC*/

client.on("message", async msg => {

    if (msg.content.startsWith(settings.prefix + "btc")) {

        let bitcoinData = await getCrypto('bitcoin');

        let embed = await createEmbed(bitcoinData);
        await msg.reply({embed: embed})
    }
})

client.on("message", async msg => {

    if (msg.content.startsWith(settings.prefix + "eth")) {

        let ethData = await getCrypto('ethereum');

        let embed = await createEmbed(ethData);
        await msg.reply({embed: embed})
    }
})

client.on("message", async msg => {

    if (msg.content.startsWith(settings.prefix + "doge")) {

        let dogeData = await getCrypto('dogecoin');

        let embed = await createEmbed(dogeData);
        await msg.reply({embed: embed})
    }
})

client.on("message", async msg => {

    if (msg.content.startsWith(settings.prefix + "lite")) {

        let LiteData = await getCrypto('litecoin');

        let embed = await createEmbed(LiteData);
        await msg.reply({embed: embed})
    }
})


client.login(settings.token)