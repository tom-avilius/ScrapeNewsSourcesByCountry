// to read the file system
import fs from "fs";
// to handle file path
import path from "path";
// to read csv data.
import { parse } from "csv-parse/sync";

// to store the parsed data from the csv database.
export interface Country {
  name: string;
  code: string;
}

/**
 *
 * @function: loadCountries: Country[]
 * @description: Loads the names and ISO codes of the countries from
 * the csv dataset.
 *
 * **/
// OPTIMIZE: Don't need to load the ISO codes, as they are used nowhere.
export function loadCountries(): Country[] {
  // read the file
  const csv = fs.readFileSync(path.resolve(__dirname, "../datasets/data.csv"));
  // parse the file
  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  });

  // return the dataset as an array interface.
  return records as Country[];
}
