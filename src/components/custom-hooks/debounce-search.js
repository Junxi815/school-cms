import { debounce } from "lodash";
import { useCallback } from "react";

export const useDebouncedSearch = (setQuery) => {
  const debouncedSearch = useCallback(
    debounce((e) => {
      setQuery(e.target.value);
    }, 1000),
    []
  );
  return debouncedSearch;
};
