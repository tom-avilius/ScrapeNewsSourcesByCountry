import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Go to DuckDuckGo news search
  await page.goto("https://duckduckgo.com/news+india");

  // Wait for news results to load
  await page.waitForSelector(".xS2NxE06pIznLuh2xjH0 p span");

  // Extract news titles
  const newsTitles = await page.$$eval(
    ".xS2NxE06pIznLuh2xjH0 p span",
    (elements) =>
      elements
        .map((el) => el.textContent?.trim() || "")
        .filter((link) => link.startsWith("https")),
  );

  console.log(newsTitles);

  await browser.close();
})();
