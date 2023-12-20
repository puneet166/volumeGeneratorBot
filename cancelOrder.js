require('dotenv').config();

const axios = require('axios');
const crypto = require('crypto');

// Your existing code...
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const API_MEMO = process.env.API_MEMO;


const BASE_URL = process.env.BASE_URL;


// Get current timestamp
function get_timestamp() {
    return new Date().getTime().toString();
}


// Generate signature
function generate_signature(timestamp, body) {
    const message = `${timestamp}#${API_MEMO}#${body}`;
    return crypto.createHmac('sha256', API_SECRET).update(message).digest('hex');
}
// Updated cancel_order function
async function cancel_order(order_id_) {
    const path = '/spot/v3/cancel_order';
    const timestamp = get_timestamp();
    const body = {
        symbol: process.env.SYMBOL,
        order_id: order_id_,
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
        console.log('Order cancelled:', response.data);
    } catch (error) {
        console.error(`Error:`);
        console.error(error.response.data);
    }
}

// Export the cancel_order function
module.exports = {
    cancelOrder: cancel_order,
};
