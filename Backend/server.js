const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/wiki-search', async (req, res) => {
    const searchQuery = req.query.search;
    const url = `https://apis.ccbp.in/wiki-search?search=${searchQuery}`;

    console.log(`Received request for: ${searchQuery}`); // Log the search query

    try {
        const response = await axios.get(url);
        console.log('API response:', response.data); // Log the API response
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});