import React, { useEffect, useState, useContext } from 'react';
import { TextField, Button } from '@mui/material';
import AppContext from '../context/AppContext';
import { callLoginService, callRegisterService, callSilentLoginService } from '../utils/authServices';

export default function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const { login } = useContext(AppContext);

  useEffect(() => {
    const silentLogin = async () => {
      const loginResponse = await callSilentLoginService();
      if (loginResponse && loginResponse.email) {
        login(loginResponse.email);
      }
    };

    silentLogin();
  }, [login]);

  const validateForm = () => {
    return emailValue && passwordValue;
  };

  const handleLogin = async () => {
    if (!validateForm) return;

    if (await callLoginService(emailValue, passwordValue)) {
      login(emailValue);
    } else {
      // TODO handle error
    }
  };

  const handleRegister = async () => {
    if (!validateForm) return;

    if (await callRegisterService(emailValue, passwordValue)) {
      login(emailValue);
    } else {
      // TODO handle error
    }
  };

  return (
    <div className='form-content'>
      <TextField className='input-field' required id='email' type='email' label='Email' onChange={(e) => setEmailValue(e.target.value)} />
      <TextField className='input-field' required id='password' type='password' label='Password' onChange={(e) => setPasswordValue(e.target.value)} />
      <div className='form-buttons'>
        <Button variant='contained' onClick={() => handleLogin()}>Login</Button>
        <Button variant='contained' onClick={() => handleRegister()}>Register</Button>
      </div>
    </div>
	);
}
