# Craigs-List-Scraper
A generic script that polls CL every few minutes and updates the user with new listings via text message


## Setup
Before you do anything run `npm install`

In the 20 or so lines of the `craigslistScraper.js` you can control the following configurations:
- Phone number 
- Provider
- Craigslist query strings

#### Creating a query string url
You can add as many queries as you want to the string array. To create a query string go to craigslist, enter search with all of you criteria (price, location, keyword etc.) and copy the url.
Once you have they url simply add `&format=rss` at the end and add it to the array

## Running the app
In the project root folder run the following command `node index.js` or `npm start`
