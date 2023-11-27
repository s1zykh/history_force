import { useEffect, useState } from "react";

export const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isNumber, setIsNumber] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isNumber":
          /^\d+$/.test(value) ? setIsNumber(true) : setIsNumber(false);
          break;
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
      }
    }
  }, [value]);

  return {
    isEmpty,
    isNumber,
  };
};
