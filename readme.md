# ScrapeNewsSourcesByCountry

This project automates the scraping of top news headlines from DuckDuckGo for every country in the world using Playwright. It parses a CSV file of countries and generates a JSON file with news headlines for each.

---

## Features

- Scrapes top 10 news sources per country
- Uses a CSV dataset with country names and ISO codes
- Outputs data in structured JSON format

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run the scraper

```bash
npx ts-node src/source.ts
```

Or compile and run:

```bash
tsc
node src/source.ts
```

---

## Output Format

The output is saved as `output/news.json`, structured as follows:

```json
{
  "country": ["https:", "https:"]
}
```

---

## Notes

- DuckDuckGo may rate-limit aggressive scraping. Add delays if needed.

---

## ✅ TODO

- [ ] Add delay/throttling to avoid being blocked
- [ ] Write partial results incrementally to handle crashes
- [ ] Add proper logging with status messages
- [ ] Support headless browser mode.
- [ ] Gracefully handle errors.

---

## 📄 License

MIT License — use, modify, and share freely.
Commercial use may be a problem. From where I got the database:

> Nevertheless, it should be noted that this material is ultimately sourced from ISO and their rights and licensing policy is somewhat unclear. As this is a short, simple database of facts there is a strong argument that no rights can subsist in this collection. However, ISO state on their site:
>
> > ISO makes the list of alpha-2 country codes available for internal use and non-commercial purposes free of charge.

---

## 🤝 Contributions

Issues and pull requests are welcome!
