/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import req from '../utils/request';
import { Endpoints } from '../config';
import IQuery from '../interface/IQuery';
import showAlert from '../utils/alert';

const useData = <T>(
  endpoint: Endpoints, query?: IQuery, body?: object, deps: (number | boolean | string)[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      if (!query && !body) {
        return;
      }

      setIsLoading(true);

      try {
        const result = await req<T>(endpoint, query, body);

        setData(result);
      } catch (e) {
        setIsError(true);
        showAlert("Error", `${e}`);
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