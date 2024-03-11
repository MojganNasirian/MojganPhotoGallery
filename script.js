const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const photoContainer = document.getElementById('photoContainer');

// Fetch photos from Flickr API on page load
window.addEventListener('DOMContentLoaded', async () => {
    await fetchPhotos('nature'); // Default search term
});

// Function to fetch photos based on search term
async function fetchPhotos(searchTerm) {
    try {
        const response = await fetch(`/api/photos/${searchTerm}`);
        if (!response.ok) {
            throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        displayPhotos(data);
    } catch (error) {
        console.error('Error fetching photos from API:', error);
        // Display error message to the user
        photoContainer.innerHTML = '<p>Error fetching photos. Please try again later.</p>';
    }
}

// Search button click event listener
searchButton.addEventListener('click', () => {
    searchPhotos();
});

// Function to handle search and fetch photos based on input value
async function searchPhotos() {
    const searchTerm = searchInput.value.trim(); 
    if (searchTerm !== '') {
        await fetchPhotos(searchTerm);
    }
}

// Function to display photos in the photoContainer
function displayPhotos(photos) {
    photoContainer.innerHTML = ''; 
    photos.forEach(photo => {
        const photoElement = document.createElement('div');
        photoElement.classList.add('photo');
        const img = document.createElement('img');
        img.src = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
        img.alt = photo.title;
        photoElement.appendChild(img);
        photoContainer.appendChild(photoElement);
    });
}
