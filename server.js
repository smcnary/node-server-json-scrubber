const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const port = 3000;

// Middleware to log requests
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} request to ${req.url}`
  );
  next();
});

app.get("/fetch-data", (req, res) => {
  const { url } = req.query; // Access the 'url' parameter from query string
  if (!url) {
    return res.status(400).send("URL parameter is required");
  }

  // Here you would add your logic to process the URL, for example, fetching data from it
  console.log(`Processing request for URL: ${url}`);

  // Sending a response back to the client
  res.send(`Data fetched from URL: ${url}`);
});

// Route to scrape data
app.get("/scrape", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send("URL is required as a query parameter.");
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const pageTitle = $("title").text(); // Example: Get the page title
    res.json({
      title: pageTitle,
      // Add more data as needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error scraping the website.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
