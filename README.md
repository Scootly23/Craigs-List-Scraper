# Craigs-List-Scraper
A generic script that polls CL every few minutes and updates the user with new listings via text message


## Setup
Before you do anything run `npm install`

In the 20 or so lines of the `craigslistScraper.js` you can control the following configurations:
- Phone number 
- Phone Provider
- Craigslist query strings

#### Creating a query string url
You can add as many queries as you want to the string array. A query string is a the url generated from a craigslist search. To create one you will need to simply go to craigslist, add your search criteria, copy the url once the results are displayed and add `&format=rss` to the end.
## Running the app
In the project root folder (Craigs-List-Scraper) run the following command `node index.js` or `npm start`
