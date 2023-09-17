import React from 'react'
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isLoginUser } from '../../../atoms';
import { Mode } from '../../utils/Mode';
import { device } from '../../utils/Size';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import FileUpload from "../../utils/FileUpload";

const GoodsUploadWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
`
const GoodsUploadHeader = styled.div`
    width: 100%;
    height: auto;
    text-align: center;
`
const GoodsUploadTitle = styled.h3`
    font-size: 3rem;
    font-weight: 500;
`
const GoodsUploadContainer = styled.div`
    width: 100%;
    height: auto;
`
const GoodsUploadForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    gap: 2rem;
`
const GoodsUploadSector = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    @media ${device.tablet} {
        width: 64rem;
    }
`
const GoodsUploadLabel = styled.label`
    font-size: 1.6rem;
    font-weight: 400;
    span{
        color: ${props => props.theme.logo.pink
    };
}
`
const GoodsUploadInput = styled.input`
    width: 100%;
`
const GoodsUploadTextarea = styled.textarea`
    resize: none;
    width: 100%;
`
const GoodsUploadErr = styled.span`
    color: red;
    margin-bottom: 1rem;
`
const GoodsUploadButton = styled(motion.button)`
    width: 100%;
    height: auto;
    background-color: ${props => props.theme.logo.yellow};
    color: #fff;
    padding: .8rem 2rem;
    border-radius: .4rem;
    font-size: 2rem;
`

const btnUploadVar = {
  hover: { color: "#fff", backgroundColor: "#d3599c", transition: {duration: .3 } }
}

function GoodsUpload() {

  const { register, handleSubmit, formState:{ errors }, setError } = useForm();

  const onVal = () => {
    let variables = {
      //
    }
  }

  return (
    <GoodsUploadWrap>
      <GoodsUploadHeader>
        <GoodsUploadTitle>Goods Upload</GoodsUploadTitle>
      </GoodsUploadHeader>
      <GoodsUploadContainer>
        <GoodsUploadForm onSubmit={handleSubmit(onVal)}>
          
          {/* file upload box */}
          <FileUpload />

          <GoodsUploadSector>
            <GoodsUploadLabel>Title<span>(★)</span></GoodsUploadLabel>
            <GoodsUploadInput placeholder='Please enter the title' {...register("title", {required: "Title is required", minLength: {value:1,message:"The title has fewer characters.(1~30)"}, maxLength: {value:30,message:"The title has a lot of letters.(1~30)"}})} />
            <GoodsUploadErr>{errors?.title?.message}</GoodsUploadErr>
          </GoodsUploadSector>
          <GoodsUploadSector>
            <GoodsUploadLabel>Description</GoodsUploadLabel>
            <GoodsUploadTextarea placeholder='Please write a description of the goods you upload (~250)' {...register("description", {maxLength: {value: 250, message: "The description has a lot of letters.(~250)"}})} />
            <GoodsUploadErr>{errors?.description?.message}</GoodsUploadErr>
          </GoodsUploadSector>
          <GoodsUploadSector>
            <GoodsUploadLabel>Tag</GoodsUploadLabel>
            <GoodsUploadInput placeholder='Please write a tag. (tags and tags are separated by commas)' {...register("tag", {maxLength: {value: 30, message: "The length of the tag is too long(~30)"}})} />
            <GoodsUploadErr>{errors?.tag?.message}</GoodsUploadErr>
          </GoodsUploadSector>
          <GoodsUploadSector>
            <GoodsUploadButton variants={btnUploadVar} whileHover="hover">UPLOAD</GoodsUploadButton>
          </GoodsUploadSector>
        </GoodsUploadForm>
      </GoodsUploadContainer>
    </GoodsUploadWrap>
  )
}

export default withRouter(GoodsUpload)