import { useCallback, useEffect, useState } from "react";

const useFetchList = <T, P = void>(
  api: (params?: P) => Promise<{ data: T }>,
  params?: P
) => {
  const [data, setData] = useState<T | []>([]);
  const [loading, setLoading] = useState(false);

  const fetchAPI = useCallback(async () => {
    setLoading(true);
    try {
      const res = params ? await api(params) : await api();
      setData(res.data);
    } catch (err) {
      console.error("useFetchList error", err);
    } finally {
      setLoading(false);
    }
  }, [api, params]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  return { data, loading, refresh: fetchAPI };
};

export default useFetchList;
