require('dotenv').config();

const readMarketData = require('./readMarketData');
const placeOrder = require('./placeOrder');
const cancelOrder = require('./cancelOrder'); // Add the import for cancelOrder module

async function executeOrder() {
    try {
        // Fetch current market data
        const marketData = await readMarketData.getMarketData();

        // Extract necessary data from marketData
        const currentPrice = marketData[2];

        const order_id_buy = await placeOrder.placeOrder(currentPrice, 'buy');

        const order_id_sell = await placeOrder.placeOrder(currentPrice, 'sell');

        // Cancel the order
        console.log("--------sell order cancel status----")
        await cancelOrder.cancelOrder(order_id_sell);
        console.log("--------buy order cancel status----")

        await cancelOrder.cancelOrder(order_id_buy);


    } catch (error) {
        console.error('Error:', error.message);
    }
}

const intervalInMilliseconds = 1000; // 5 minutes
setInterval(executeOrder, intervalInMilliseconds);
