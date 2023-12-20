const axios = require('axios');

// Your existing code...

// Updated getMarketData function to return relevant data
async function get_market_data() {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api-cloud.bitmart.com/spot/quotation/v3/trades?symbol=TARAL_USDT&limit=10',
        headers: {
            // Your headers...
        },
    };
    try {
        const response = await axios.request(config);
        const marketData = response.data.data[0];
        return marketData;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch market data');
    }
}

// Export the get_market_data function
module.exports = {
    getMarketData: get_market_data,
};
