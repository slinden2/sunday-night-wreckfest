import React from "react";

interface IFetchDataResponse {
  data: any;
  loading: boolean;
  error: boolean;
}

type LoadFunction = () => Promise<void>;
type FetchDataReturn = [IFetchDataResponse, LoadFunction];

const useFetchData = (url: string): FetchDataReturn => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const init = () => {
    setData(null);
    setLoading(true);
    setError(false);
  };

  const load = async () => {
    init();
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  return [{ data, loading, error }, load];
};

export default useFetchData;
