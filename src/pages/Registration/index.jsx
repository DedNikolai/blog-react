import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {useForm} from 'react-hook-form';
import {createUser} from '../../api/user';
import styles from './Login.module.scss';

export const Registration = () => {
  const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm({
    mode: 'onChange'
  })

  const onSubmit = (data) => {
    reset();
    createUser(data)
  }

  return (
    <Paper onSubmit={handleSubmit(onSubmit)} component={'form'} elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField
        {...register('fullName', {
          required: "FullName is required",
          minLength: {value: 3, message: 'To short'},
          maxLength: {value: 20, message: 'To long'},
        })} 
        className={styles.field} 
        label="Полное имя" 
        fullWidth
        error={!!errors.fullName?.message}
        helperText={errors.fullName?.message} 
      />
      <TextField
        {...register('email', {
          required: "Email Address is required",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email address',
          }
        })}
        error={!!errors.email?.message}
        helperText={errors.email?.message} 
        className={styles.field} 
        label="E-Mail" 
        fullWidth 
      />
      <TextField
        {...register('password', {
          required: "Password is required"
        })}
        error={!!errors.password?.message}
        helperText={errors.password?.message}
        type='password'   
        className={styles.field} 
        label="Пароль" 
        fullWidth 
      />
      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Paper>
  );
};
