const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let imagesLoaded = 0;
let ready = false;
let totalImages = 0;

// Check if all images were loaded 
function imageLoaded()
{
    imagesLoaded ++;
    if (imagesLoaded == totalImages)
    {
        ready = true;
        loader.hidden = true;
        count = 3;
    }
}

// Helper Function for Set attributes on DOM Elements DRY principles
function setAttributes(element, attributes)
{
    for (const key in attributes)
    {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links & Photos, add to DOM
function dispayPhotos()
{
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => 
        // Creating <a> to link to Unspalce 
        {
            const item = document.createElement('a');
            // item.setAttribute('href', photo.links.html);
            // item.setAttribute('target', '_blank');

            setAttributes(item, 
            {
                href:photo.links.html,
                target: 'blank',
            });

            // Creat <img> for photo
            const img = document.createElement('img');
            // img.setAttribute('src', photo.url.regular);
            // img.setAttribute('alt', photo.alt_description);
            // img.setAttribute('title', photo.alt_description);
            setAttributes(img, 
            {
                src: photo.urls.regular,
                alt: photo.alt_description,
                alt: photo.alt_title,
            });

                // Event Listener, chech when each is finished loading
                img.addEventListener('load', imageLoaded);

            // Put <img> inside <a>, then put both inside image-container
            item.appendChild(img);
            imageContainer.appendChild(item);
        });
}

// Unspash API
const count = 3;
const apiKey = ''; // Api key from Unsplash.com -> Empty string for security 
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get Photos fron Unsplash API 
async function getPhotos()
{
    try
    {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        dispayPhotos();
    }
    catch(error)
    {
        // Catch the error here
    }
}

// Check to see if scrolling near bottom of a page, Load More Photos 
window.addEventListener('scroll', () => 
{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();