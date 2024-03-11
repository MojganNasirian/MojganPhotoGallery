const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const FLICKR_API_KEY = '0c8773a512478946e5acb05585ef624a';

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route handler for fetching photos
app.get('/api/photos/:searchTerm?', async (req, res) => {
    try {
        // Default search term if not provided
        const searchTerm = req.params.searchTerm || 'nature'; 
        const response = await axios.get('https://api.flickr.com/services/rest', {
            params: {
                method: 'flickr.photos.search',
                api_key: FLICKR_API_KEY,
                format: 'json',
                nojsoncallback: 1,
                text: searchTerm,
            },
        });
        // Check if the response contains data and photos
        if (response.data && response.data.photos) {
            res.json(response.data.photos.photo);
        } else {
            // Handle case where no photos are found
            res.status(404).json({ error: 'No photos found' });
        }
    } catch (error) {
        console.error('Error fetching photos from Flickr:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
