import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { device } from '../../utils/Size';
import { actRegister, IRegister } from '../../../api';
import { useMutation } from 'react-query';
import { withRouter } from 'react-router-dom';

const RegisterWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  margin: 2rem auto auto;
  padding-bottom: 5rem;
  width: 100%;

  @media ${device.tablet}{
    width: 40rem;
  }
`
const RegisterHead = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 2rem;
`
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: .4rem;
  width: 100%;
`
const RegisterInput = styled.input`
  width: 100%;
  height: 4.2rem;
  padding: 1rem 1rem;
  box-sizing: border-box;
  border-radius: 0.4rem;
  border: 0.1rem solid #ccc;
  font-size: 1.6rem;
  ::placeholder{font-size: 1.2rem;}
`
const RegisterTextarea = styled.textarea`
  width: 100%;
  height: 8rem;
  padding: .5rem .5rem;
  box-sizing: border-box;
  border-radius: 0.4rem;
  border: 0.1rem solid #ccc;
  font-size: 1.6rem;
  resize: none;
  ::placeholder{font-size: 1.2rem;}
`
const RegisterErr = styled.span`
  color: red;
  margin-bottom: 1rem;
`
const RegisterField = styled.span`
  font-weight: 300;
  font-size: 1.4rem;
  span{
    color: ${props => props.theme.logo.pink};
  }
`
const RegisterButton = styled(motion.button)`
  width: 100%;
  height: 4.2rem;
  background-color: ${(props) => props.theme.logo.yellow};
  color: #fff;
  font-size: 2rem;
  padding: 1rem 5rem;
  box-sizing: border-box;
  border-radius: .4rem;
  //border: 1px solid ${props => props.theme.logo.pink};
`

const btnRegisterVar = {
  hover: { color: "#fff", backgroundColor: "#d3599c", transition: {duration: .3 } }
}

function RegisterPage(props:any) {
  const { register, handleSubmit, formState: { errors },setError } = useForm<IRegister>();

  const registerMutation = useMutation((registerBody:IRegister) => actRegister(registerBody) )
  const onVal = (data:IRegister) => {
    let body:IRegister = {
      email: data.email,
      nick: data.nick,
      password: data.password,
      password2: data.password2,
      name: data.name,
      introduce: data.introduce,
      image: data.image
    }
    if(data.password !== data.password2){
      setError(
        "password2", {message: "Password are not the same"}, {shouldFocus:true}
      )
    }else{
      console.log('pppppp')
      registerMutation.mutateAsync(data)
        .then(response => {
          if(response.data.success){
            props.history.push('/signin')
          }else{
            alert('error')
          }
        })
    }
    console.log(body);
  }
  
  return (
    <RegisterWrap>
      <RegisterHead>Register</RegisterHead>
      <RegisterForm onSubmit={handleSubmit(onVal)}>
        <RegisterField>Required fields<span>(★)</span></RegisterField>
        <RegisterInput placeholder='Email' {...register("email", {required: "Email is required", pattern:{value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "Not Email" }})} />
        <RegisterErr>{errors?.email?.message}</RegisterErr>
        <RegisterInput placeholder='Nick' {...register("nick", {required: "Nickname is required", minLength: {value:1,message:"The length of the nickname is short.(1~12)"}, maxLength: {value:12,message:"The length of the nickname is long.(1~12)"}})} />
        <RegisterErr>{errors?.nick?.message}</RegisterErr>
        <RegisterInput placeholder='Password(English, numbers, and special characters.(8~16 letter))' type="password" {...register("password", {required: "Password is required", pattern: {value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^*+=-]).{8,16}$/, message: "English, numbers, and special characters.(8~16 letter)"}, minLength:{value: 8, message: "The length of the password is too short.(8~16 letter)"}, maxLength: {value: 16, message: "The length of the password is too long.(8~16 letter)"}})} />
        <RegisterErr>{errors?.password?.message}</RegisterErr>
        <RegisterInput placeholder='Confirm Password(Write the same as the password field)' type="password" {...register("password2", {required: "Confirm Password is required", minLength:{value: 8, message: "The length of the password is too short.(8~16 letter)"}, maxLength: {value: 16, message: "The length of the password is too long.(8~16 letter)"}})} />
        <RegisterErr>{errors?.password2?.message}</RegisterErr>
        <RegisterField>Optional fields</RegisterField>
        <RegisterInput className='mgb12' placeholder='Name' {...register("name", {maxLength: {value: 16, message: "The length of the name is too long"}})} />
        <RegisterTextarea className='mgb12' placeholder='Introduce Yourself' {...register("introduce", {maxLength: {value: 250, message: "The length of the introduce is too long"}})}/>
        <RegisterInput readOnly className='mgb12' placeholder='Profile Picture(Coming Soon)'/>
        <RegisterButton variants={btnRegisterVar} whileHover="hover" >Sign Up</RegisterButton>
      </RegisterForm>
    </RegisterWrap>
  );
}

export default withRouter(RegisterPage);
