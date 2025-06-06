// to scrape the web
import { chromium } from "playwright";
// to load the list of countries.
import { loadCountries } from "./parser/loadCountries";
// to read the file system
import fs from "fs";

// start of scraping
(async () => {
  // launch chromium browser.
  // BUG: Headless mode does not work.
  // OPTIMIZE: Use headless mode.
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // loading all the countries from the dataset.
  // WARN: The dataset has not been cleaned.
  // Expect inconsistency.
  // OPTIMIZE: This also loads all country codes that are never used.
  // Maybe rid that.
  const countries = loadCountries();

  // to store the result of scraping
  const results: Record<string, string[]> = {};

  // looping through all the countries.
  for (const { name } of countries) {
    console.log(`🔍 Searching news for: ${name}`);

    // searching for the news.
    await page.goto(`https://duckduckgo.com/?q=news+${name}`);

    try {
      // selecting the appropriate tag.
      await page.waitForSelector(".xS2NxE06pIznLuh2xjH0 p span");

      // getting the news website url
      // OPTIMIZE: Maybe only get 10 news url to start with.
      // Since only 10 are used.
      const newsUrl = await page.$$eval(
        ".xS2NxE06pIznLuh2xjH0 p span",
        (elements) =>
          elements
            .map((el) => el.textContent?.trim() || "")
            .filter((link) => link.startsWith("https")),
      );

      // Using only the first 10 news url (sources).
      // OPTIMIZE: Use a global variable to store the number of news titles to extract.
      results[name] = newsUrl.slice(0, 10);
    } catch (err) {
      // if an error occurs log it.
      console.log(err);
    }
  }

  // close the browser once scraping finishes.
  await browser.close();

  // Write to a JSON file the result.
  fs.writeFileSync(
    "news_results.json",
    JSON.stringify(results, null, 2),
    "utf-8",
  );
  console.log("News data saved to news_results.json");
})();
