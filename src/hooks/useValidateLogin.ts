import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

const useValidateLogin = (
  enteredEmail: string,
  enteredPassword: string,
): [string | null, string | null] => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const {t} = useTranslation();

  function validateEmail() {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (enteredEmail && !emailRegex.test(enteredEmail)) {
      setEmailError(t('emailError'));
      return;
    }
    setEmailError(null);
  }

  function validatePassword() {
    if (enteredPassword && enteredPassword.length < 8) {
      setPasswordError(t('pwdError'));
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
