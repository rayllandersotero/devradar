const axios = require('axios');

const api = axios.create({
	baseURL: 'http://localhost:2999'
});

export default api;
