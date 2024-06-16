import axios from 'axios';

interface Delegator {
  delegation: {
    delegator_address: string;
    validator_address: string;
    shares: string;
  },
  balance: {
    denom: string;
    amount: string;
  }
}

export interface FormattedDelegator {
  delegator_address: string;
  amount: string;
}

const API_BASE_URL = 'https://source-api.polkachu.com/cosmos/staking/v1beta1/validators/sourcevaloper1qtstztcwldgsx2sq05fa5zzcqg3pppeg67sysk';

async function fetchDelegatorCount(): Promise<number> {
  try {
    const response = await axios.get(`${API_BASE_URL}/delegations`);
    return response.data.pagination.total;
  } catch (error) {
    console.error('Error fetching delegator count:', error);
    throw new Error('Failed to fetch delegator count');
  }
}

export async function fetchDelegations(): Promise<FormattedDelegator[]> {
  try {
    const delegatorCount = await fetchDelegatorCount();
    const response = await axios.get(`${API_BASE_URL}/delegations?pagination.limit=${delegatorCount}`);
    const delegators: Array<Delegator> = response.data.delegation_responses;

    const formattedDelegators: Array<FormattedDelegator> = delegators.map((delegator: Delegator) => ({
      delegator_address: delegator.delegation.delegator_address,
      amount: delegator.balance.amount,
    }));

    formattedDelegators.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    return formattedDelegators;
  } catch (error) {
    console.error('Error fetching delegations:', error);
    throw new Error('Failed to fetch delegations');
  }
}
