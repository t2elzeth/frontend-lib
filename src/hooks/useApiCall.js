import {useState} from "react";

export const apiCallStates = {
  NO_OPERATION: "NO_OPERATION",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

export default function useApiCall(requestFunc, defaultResult = null) {
  const [state, setState] = useState(apiCallStates.NO_OPERATION);

  const [result, setResult] = useState(defaultResult);
  const [error, setError] = useState(null);

  async function callApi(params) {
    setState(apiCallStates.PENDING);

    const response = await requestFunc(params);

    if (response.error) {
      setState(apiCallStates.ERROR);
    }

    if (response.result) {
      setState(apiCallStates.SUCCESS);
    }

    response.apply(setError, setResult);

    return response;
  }

  return {
    result: result,
    error: error,
    state: state,
    isLoading: state === apiCallStates.PENDING,
    call: callApi,
    setResult: setResult,
    setError: setError
  };
}