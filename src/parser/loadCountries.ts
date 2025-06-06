import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export interface Country {
  name: string;
  code: string;
}

export function loadCountries(): Country[] {
  const csv = fs.readFileSync(path.resolve(__dirname, "../datasets/data.csv"));
  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  });

  return records as Country[];
}
