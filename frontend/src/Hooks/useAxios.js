import { useState, useEffect } from "react";

const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const refetch = () => setReload((p) => p + 1); // this trigger the state to refresh by making an arbitrary "change"

  useEffect(() => {
    const controller = new AbortController(); // prevents memory leaks

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
          withCredentials: true, // essential for session based authentication
        });
        setResponse(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return [response, error, loading, refetch];
};

export default useAxios;
