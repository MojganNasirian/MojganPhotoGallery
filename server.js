const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const FLICKR_API_KEY = 'MY_FLICKR_API_KEY';

// Endpoint to fetch photos from Flickr
app.get('/api/photos/:searchTerm?', async (req, res) => {
    try {
        const { searchTerm } = req.params;
        const flickrUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&format=json&nojsoncallback=1&text=${searchTerm}`;
        const response = await fetch(flickrUrl);
        const data = await response.json();
        // Extract photos array and send it in the response
        if (data && data.photos) {
            res.json(data.photos.photo);
        } else {
            res.status(404).json({ error: 'No photos found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
