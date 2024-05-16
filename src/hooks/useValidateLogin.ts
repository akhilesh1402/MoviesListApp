import {useEffect, useState} from 'react';

const useValidateLogin = (
  enteredEmail: string,
  enteredPassword: string,
): [string | null, string | null] => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  function validateEmail() {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (enteredEmail && !emailRegex.test(enteredEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError(null);
  }

  function validatePassword() {
    if (enteredPassword && enteredPassword.length < 8) {
      setPasswordError('Password must be 8 characters long.');
      return;
    }
    setPasswordError(null);
  }

  useEffect(() => {
    validateEmail();
  }, [enteredEmail]);

  useEffect(() => {
    validatePassword();
  }, [enteredPassword]);

  return [emailError, passwordError];
};

export default useValidateLogin;
