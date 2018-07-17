var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function () {
  return axios.get("http://www.nytimes.com").then(function (res) {
    var $ = cheerio.load(res.data);
    // Empty array to save article info
    var articles = [];

    // Loop through each element that has the "theme-summary" class
    $(".theme-summary").each(function (i, element) {
      var head = $(this)
        .children(".story-heading")
        .text()
        .trim();

      // Grab the URL of the article
      var url = $(this)
        .children(".story-heading")
        .children("a")
        .attr("href");

      // Article summary area
      var sum = $(this)
        .children(".summary")
        .text()
        .trim();

      // Trimming the response object
      if (head && sum && url) {
        var cleanUpHeading = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var cleanUpSummary = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

        var dataToAdd = {
          headline: cleanUpHeading,
          summary: cleanUpSummary,
          url: url
        };
        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};
module.exports = scrape;