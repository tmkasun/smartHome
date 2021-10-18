import { useEffect, useState } from 'react';
import { APIOrigin } from 'utils/configs';
import { TelcoAllowedNumbersList } from './types/generated/meAPI/models/telco-allowed-numbers-list';

export const useAllowedNumbers = () => {
  const [data, setData] = useState<TelcoAllowedNumbersList | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function asyncEffect() {
      try {
        const response = await fetch(`${APIOrigin}/apis/telco/reload/allowed`);
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (e) {
        console.error(e);
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    }
    asyncEffect();
  }, []);
  return [data, error, isLoading];
};
