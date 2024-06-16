import { fetchDelegations } from './api';
import { saveToFile } from './file_utils';

async function main() {
  try {
    const formattedDelegators = await fetchDelegations();
    saveToFile(formattedDelegators, 'delegators.json');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();