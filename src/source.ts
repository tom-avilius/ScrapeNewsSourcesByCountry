import { chromium } from "playwright";
import { loadCountries } from "./parser/loadCountries";
import fs from "fs";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  const countries = loadCountries();

  const results: Record<string, string[]> = {};

  for (const { name } of countries) {
    console.log(`🔍 Searching news for: ${name}`);
    await page.goto(`https://duckduckgo.com/?q=news+${name}`);

    try {
      await page.waitForSelector(".xS2NxE06pIznLuh2xjH0 p span");

      const newsTitles = await page.$$eval(
        ".xS2NxE06pIznLuh2xjH0 p span",
        (elements) =>
          elements
            .map((el) => el.textContent?.trim() || "")
            .filter((link) => link.startsWith("https")),
      );

      results[name] = newsTitles.slice(0, 10); // Store top 3 headlines
    } catch (err) {
      console.log(err);
    }
  }

  await browser.close();

  // Write to a JSON file
  fs.writeFileSync(
    "news_results.json",
    JSON.stringify(results, null, 2),
    "utf-8",
  );
  console.log("📝 News data saved to news_results.json");
})();
