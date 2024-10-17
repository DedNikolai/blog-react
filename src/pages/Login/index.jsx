import React, {useContext} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.scss";
import { useLocation, Navigate } from "react-router-dom";
import {AuthContext} from '../../components/AuthProvider/AuthProvider';
import {useForm} from 'react-hook-form';
import {login} from '../../api/user';

export const Login = () => {
  const {user, setUser, userLoading, setUserLoading} = useContext(AuthContext);
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';
  const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm({
    mode: 'onSubmit'
  })

  const onSubmit = (data) => {
    reset()
    login(data).then(res => {
      setUser(res.user);
      setUserLoading(false);
    })
  }

  if (userLoading) return <h2>Loading..</h2>
  
  if (user) return <Navigate to={fromPage} />

  return (
    <Paper onSubmit={handleSubmit(onSubmit)} component={'form'} elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <TextField
        {...register('email', {
          required: "Email Address is required",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          }
        })}
        className={styles.field}
        label="E-Mail"
        error={!!errors.email?.message}
        helperText={errors.email?.message}
        fullWidth
      />
      <TextField
        {...register('password', {
          required: "Password is required"
        })} 
        className={styles.field}
        error={!!errors.password?.message}
        helperText={errors.password?.message} 
        label="Password" 
        fullWidth />
      <Button size="large" variant="contained" fullWidth type="submit">
        Войти
      </Button>
    </Paper>
  );
};
