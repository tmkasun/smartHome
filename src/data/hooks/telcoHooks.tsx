import { useEffect, useState } from 'react';
import { APIOrigin } from 'utils/configs';
import { ReloadResponse } from '../types/generated/meAPI/models/reload-response';
import { TelcoAllowedNumbersList } from '../types/generated/meAPI/models/telco-allowed-numbers-list';

type UsedAllowedHookDef = () => [TelcoAllowedNumbersList | null, Error | null, boolean];
export const useAllowedNumbers: UsedAllowedHookDef = () => {
  const [data, setData] = useState<TelcoAllowedNumbersList | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function asyncEffect() {
      try {
        console.log(`APIOrigin =====> ${APIOrigin}`);
        const response = await fetch(`${APIOrigin}/telco/reload/allowed`);
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

export const useSubmitTopUp = (): [
  ReloadResponse | null,
  Error | null,
  boolean,
  (phoneNumber: string, amount: number) => Promise<ReloadResponse>,
] => {
  const [data, setData] = useState<ReloadResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const topUp = async (phoneNumber: string, amount: number): Promise<ReloadResponse> => {
    setIsLoading(true);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      number: phoneNumber,
      amount,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    let responseData = null;
    try {
      const response = await fetch(`${APIOrigin}/telco/reload`, requestOptions as any);
      responseData = await response.json();
      if (!response.ok) {
        if (typeof responseData === 'string' || responseData instanceof String) {
          throw new Error(responseData as string);
        }
        throw new Error('An unknown error occurred');
      }
      setData(responseData);
    } catch (e) {
      console.error(e);
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
    return responseData;
  };
  return [data, error, isLoading, topUp];
};
