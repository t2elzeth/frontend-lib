import {useState} from "react";

export default function (initialState) {
  const [state, setState] = useState(initialState);

  function updateState(updatedState) {
    // noinspection JSCheckFunctionSignatures
    setState(prevState => {
      return {
        ...prevState,
        ...updatedState
      };
    });
  }

  return [state, updateState];
}