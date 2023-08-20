import { useState, useCallback } from 'react';

export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { target: { name, value, validationMessage, closest } } = evt;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: validationMessage }));
    setIsValid(closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return { values, handleChange, resetForm, errors, isValid, setValues };
}
