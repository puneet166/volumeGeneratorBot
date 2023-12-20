require('dotenv').config();

const axios = require('axios');
const crypto = require('crypto');
const API_KEY =  process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const API_MEMO = process.env.API_MEMO;


const BASE_URL = process.env.BASE_URL;
// Your existing code...
function get_timestamp() {
    return new Date().getTime().toString();
}


// Generate signature
function generate_signature(timestamp, body) {
    const message = `${timestamp}#${API_MEMO}#${body}`;
    return crypto.createHmac('sha256', API_SECRET).update(message).digest('hex');
}
// Updated place_order function to accept price as a parameter
async function place_order(currentPrice,side) {
    const path = '/spot/v2/submit_order';
    const timestamp = get_timestamp();
    const body = {
        size: process.env.SIZE,
        price: currentPrice, // Use the current market price
        side: side,
        symbol: process.env.SYMBOL,
        type: process.env.TYPE,
    };
    const headers = {
        'Content-Type': 'application/json',
        'X-BM-KEY': API_KEY,
        'X-BM-TIMESTAMP': timestamp,
        'X-BM-SIGN': generate_signature(timestamp, JSON.stringify(body)),
    };
    const url = BASE_URL + path;
    try {
        const response = await axios.post(url, body, { headers });
        console.log(response.data);
        return response.data.data.order_id;
    } catch (error) {
        console.error('Error:');
        console.error(error.response.data);
        throw new Error('Failed to place order');
    }
}

// Export the place_order function
module.exports = {
    placeOrder: place_order,
};
