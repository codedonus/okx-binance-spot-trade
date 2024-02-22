// const OKXClient = require("./connect");
const { OKXRestClient } = require("okx-api-connector");
require("dotenv").config();

const main = async () => {
    // const client = await connectOKX(process.env.OKX_API_KEY, process.env.OKX_SECRET_KEY, false);
    const okxClient = new OKXRestClient(
      process.env.OKX_API_KEY, 
      process.env.OKX_SECRET_KEY, 
      process.env.OKX_API_PASSWD,
      {
        config: {
          proxy: {
            protocol: 'http',
            host: '127.0.0.1',
            port: 7890,
          }
        }
      });
    // console.log(okxClient.client);
    while (true) {
      try {
        // // const balance = await okxClient.client.get('/api/v5/account/balance?ccy=USDC,ZBC');
        // const balance = await okxClient.getBalance({
        //   tokens: ['USDC', 'ZBC']
        // });
        // console.log(balance.data.data[0].details);

        // // Transfer assets
        // const resTrans = await okxClient.transfer({
        //   ccy: 'STRK',
        //   amt: '50000',
        //   from: '6',  // 6 是资金账户
        //   to: '18',  // 18 是交易账户
        // });
        // console.log(resTrans.data);

        // Place a new order
        const res = await okxClient.spotOrder({
          instId: 'STRK-USDT',
          tdMode: 'cash',
          side: 'buy',
          ordType: 'limit', 
          px: '1',
          sz: '2000',
        });
        console.log(res.data)

        // console.log(okxClient.isTestClient, okxClient.baseURL);
      }
      catch (e) {
        console.log(e.response);
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