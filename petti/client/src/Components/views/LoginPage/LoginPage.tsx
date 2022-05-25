import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { device } from '../../utils/Size';
import { ILogin, actLogin } from '../../../api';
import { useMutation } from 'react-query';
import { withRouter } from 'react-router-dom';

const LoginWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc((100vh - 5.6rem)/2);
  margin: 0 auto;
  width: 100%;

  @media ${device.tablet}{
    width: 40rem;
  }
`
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: .4rem;
  width: 100%;
`
const LoginInput = styled.input`
  width: 100%;
  height: 4.2rem;
  padding: 1rem 1rem;
  box-sizing: border-box;
  border-radius: 0.4rem;
  border: 0.1rem solid #ccc;
  font-size: 1.6rem;
`
const LoginErr = styled.span`
  color: red;
  margin-bottom: 1rem;
`
const LoginButton = styled(motion.button)`
  width: 100%;
  height: 4.2rem;
  background-color: ${(props) => props.theme.logo.brown};
  color: #fff;
  font-size: 2rem;
  padding: 1rem 5rem;
  box-sizing: border-box;
  border-radius: .4rem;
  //border: 1px solid ${props => props.theme.logo.pink};
`
const OtherBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
`
const AccountForgot = styled.a`
  text-decoration: underline;
  text-underline-position: under;
`
const RegisterButton = styled(motion.button)`
  padding: 0.8rem 2rem;
  background-color: #e0bd2b;
  color: #fff;
  border-radius: 0.4rem;
  font-size: 1.6rem;
`

const btnLoginVar = {
  hover: { color: "#fff", backgroundColor: "#d3599c", transition: {duration: .3 } }
}
const btnRegisterVar = {
  hover: { color: "#fff", backgroundColor: "#d3599c", transition: {duration: .3 } }
}

const registerClick = () => {
  window.location.href = `/signup`
}

function LoginPage(props:any) {
  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)
  const handleRememberMe = () => {
    setRememberMe((prev) => !prev);
  }

  const loginMutation = useMutation((loginBody:ILogin) => actLogin(loginBody))
  /*const loginMutation = useMutation(actLogin, {
    onMutate: variables => {
      console.log("onMutate", variables);
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context}`)
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      console.log("end");
    },
  })*/

  const onVal = (data: ILogin) => {//validate
    let body:ILogin ={
      email: data.email,
      password: data.password
    }

    loginMutation.mutateAsync(body)
      .then((response) => {
        console.log(response)
        if(response.data.loginSuccess){
          window.localStorage.setItem('userId', response.data.userId);
          if(rememberMe){//remember
            window.localStorage.setItem('rememberMe', response.data.userId);
          }else{
            localStorage.removeItem('rememberMe');
          }
          //props.history.push('/')
          window.location.href = '/'
        }else{
          alert('error')
        }
      })
  }
// console.log(errors);

  return (
    <LoginWrap>
      <LoginForm onSubmit={handleSubmit(onVal)}>
        <LoginInput {...register("email", {required:"Email is required", pattern:{value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Not Email" }})} placeholder='Email' />
        <LoginErr>{errors?.email?.message}</LoginErr>
        <LoginInput type="password" {...register("password", {required:"Password is required"})} placeholder='Password' />
        <LoginErr>{errors?.password?.message}</LoginErr>
        <label htmlFor="remember" style={{ marginBottom: '1rem' }}>
        <input type="checkbox" id="remember" onClick={handleRememberMe} />Remember Me</label>
        <LoginButton variants={btnLoginVar} whileHover="hover" >Sign In</LoginButton>
      </LoginForm>
      <OtherBox>
        <AccountForgot href='/forgot' >Forgot my password</AccountForgot>
        <RegisterButton variants={btnRegisterVar} whileHover='hover' onClick={registerClick}>Sign Up</RegisterButton>
      </OtherBox>
    </LoginWrap>
  );
}

export default withRouter(LoginPage);
