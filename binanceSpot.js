require("dotenv").config();
const { connectBinance } = require("./connect");
const { Spot } = require('@binance/connector')
 
const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_SECRET_KEY;

const main = async () => {
  const client = new Spot(apiKey, apiSecret,
    {
      baseURL: process.env.BINANCE_BASE_URL,
      proxy: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 7890,
      }
    }
  )
  
  // client.account().then(response => client.logger.log(response.data))
  // Place a new order
  while (true) {
    try {
      const res = await client.newOrder('STRKUSDT', 'BUY', 'LIMIT', {
        price: '1.5',
        quantity: 1330,
        timeInForce: 'GTC'
      })
      console.log(res.data)
    }
    catch (e) {
      console.error(e.response.data)
    }
  }
}

const runMain = async () => {
  try {
    await main();
  }
  catch (e) {
    console.error(e);
  }
}

runMain();