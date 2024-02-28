import { useState } from "react";

function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setValue(event.target.value);
  }

  return { value, onChange: handleValueChange, setValue };
}

export default useInput;
