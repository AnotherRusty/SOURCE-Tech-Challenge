import fs from 'fs';
import { FormattedDelegator } from './api';

/**
 * Saves data to a JSON file.
 * @param data - The data to save.
 * @param filename - The name of the file.
 */
export function saveToFile(data: FormattedDelegator[], filename: string): void {
  fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log(`Data successfully written to ${filename}`);
    }
  });
}
