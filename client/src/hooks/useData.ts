/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import req from '../utils/request';
import { Endpoints } from '../config';

//todo fix object type
//todo fix any type
const useData = <T>(
  endpoint: Endpoints, query: object, deps: any[] = [] ) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  
  useEffect(() => {
    const getData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const result = await req<T>(endpoint, query);

        setData(result);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, deps);
  

  return {
    data,
    isLoading,
    isError,
  };
};

export default useData;