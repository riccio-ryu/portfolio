import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { IGalleryUpload } from '../../../api'
import { isLoginUser } from '../../../atoms'
import { Mode } from '../../utils/Mode'
import { device } from '../../utils/Size'

const GalleryUploadWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
`
const GalleryUploadHeader = styled.div`
    width: 100%;
    height: auto;
    text-align: center;
`
const GalleryUploadTitle = styled.h3`
    font-size: 3rem;
    font-weight: 500;
`
const GalleryUploadContainer = styled.div`
    width: 100%;
    height: auto;
`
const GalleryUploadForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    gap: 2rem;
`
const GalleryUploadSector = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    @media ${device.tablet} {
        width: 64rem;
    }
`
const GalleryUploadLabel = styled.label`
    font-size: 1.6rem;
    font-weight: 400;
    span{
        color: ${props => props.theme.logo.pink
    };
}
`
const GalleryUploadInput = styled.input`
    width: 100%;
`
const GalleryUploadTextarea = styled.textarea`
    resize: none;
    width: 100%;
`
const GalleryUploadErr = styled.span`
    color: red;
    margin-bottom: 1rem;
`
const GalleryUploadButton = styled(motion.button)`
    width: 100%;
    height: auto;
    background-color: ${props => props.theme.logo.yellow};
    color: #fff;
    padding: .8rem 2rem;
    border-radius: .4rem;
    font-size: 2rem;
`
const GalleryUploadDrop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`
const GalleryUploadThumbBox = styled.div`
    width: 50%;
    height: calc((100vw - 3.2rem)/2 * 9/16);
    overflow: hidden;
    border: .1rem solid ${props => props.theme.logo.yellow};
    box-sizing: border-box;
    position: relative;
    @media ${device.tablet}{
        width: 32rem;
        height: 24rem;
    }
`
const GalleryUploadThumb = styled.img`
    width: auto;
    height: 100%;
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const GalleryUploadBlock = styled.div`
    width: 50%;
    height: calc((100vw - 3.2rem)/2 * 9/16);
    border: .1rem solid ${props => props.theme.logo.yellow};
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        font-size: 3rem;
        color: ${props => props.theme.logo.yellow};
    }
    @media ${device.tablet}{
        width: 32rem;
        height: 24rem;
    }
`

const btnUploadVar = {
    hover: { color: "#fff", backgroundColor: "#d3599c", transition: {duration: .3 } }
}

function GalleryUpload(props:any) {
  const { register, handleSubmit, formState:{ errors }, setError } = useForm<IGalleryUpload>();

  //const { isLoading: authLoading, data: authData } = useQuery<IAuth>("auth", fetchAuth)
  const [ loginUser, setLoginUser ] = useRecoilState(isLoginUser)

  const [filePath, setFilePath] = useState("")
  const [duration, setDuration] = useState("")
  const [fileType, setFileType] = useState("")
  const [thumbnailPath, setThumbnailPath] = useState("")

  const uploadDrop = (files:any) => {
    let formData = new FormData();
    formData.append("file", files[0])
    console.log(files)
    console.log(formData);
    

    axios.post('/api/gallery/uploadfiles', formData, {
        headers: { 'content-type': 'multipart/form-data' }
    })
    .then(response=> {
        if(response.data.success){
// console.log(response.data);
            let variable = {
                filePath: response.data.filePath,
                fileName: response.data.fileName,
                fileType: response.data.fileType.split('/')[0]
            }
            setFilePath(response.data.filePath)

            axios.post('/api/gallery/thumbnail', variable)
                .then(response => {
                    if(response.data.success) {
                        console.log(response.data)
                        setDuration(response.data.fileDuration)
                        setThumbnailPath(response.data.thumbsFilePath)
                        setFileType(response.data.fileType)
                        
                    } else {
                        alert('Failed to make the thumbnails');
                    }
                })

        } else {
            alert('failed to save the video in server')
        }
    })
  }

  const onVal = (data:IGalleryUpload) => {
    let variables:IGalleryUpload = {
        writer: loginUser,
        title: data.title,
        description: data.description,
        filePath: filePath,
        fileType: fileType,
        tag: data.tag,
        duration: duration,
        thumbnail: thumbnailPath
    }

    axios.post('/api/gallery/uploadGallery', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Post Uploaded Successfully')
                    setTimeout(() => {
                        props.history.push('/gallery')
                    }, 2000);
                } else {
                    alert('Failed to upload post')
                }
            })
  }

  return (
    <GalleryUploadWrap>
        <GalleryUploadHeader>
            <GalleryUploadTitle>Gallery Upload</GalleryUploadTitle>
        </GalleryUploadHeader>
        <GalleryUploadContainer>
            <GalleryUploadForm onSubmit={handleSubmit(onVal)}>
                <GalleryUploadDrop>
                    <Dropzone 
                    onDrop={uploadDrop}
                    multiple={false} 
                    maxSize={100000000}>
                    {({ getRootProps, getInputProps }) => (
                        <GalleryUploadBlock
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <FaPlus />
                        </GalleryUploadBlock>
                    )}
                    </Dropzone>
                    {thumbnailPath &&
                    <GalleryUploadThumbBox>
                        <GalleryUploadThumb src={`${Mode.add}${thumbnailPath}`} alt='thumb' />
                    </GalleryUploadThumbBox>
                    }
                </GalleryUploadDrop>
                <GalleryUploadSector>
                    <GalleryUploadLabel>Title<span>(★)</span></GalleryUploadLabel>
                    <GalleryUploadInput placeholder='Please enter the title' {...register("title", {required: "Title is required", minLength: {value:1,message:"The title has fewer characters.(1~30)"}, maxLength: {value:30,message:"The title has a lot of letters.(1~30)"}})} />
                    <GalleryUploadErr>{errors?.title?.message}</GalleryUploadErr>
                </GalleryUploadSector>
                <GalleryUploadSector>
                    <GalleryUploadLabel>Description</GalleryUploadLabel>
                    <GalleryUploadTextarea placeholder='Please write a description of the video or photo you upload (~250)' {...register("description", {maxLength: {value: 250, message: "The description has a lot of letters.(~250)"}})} />
                    <GalleryUploadErr>{errors?.description?.message}</GalleryUploadErr>
                </GalleryUploadSector>
                <GalleryUploadSector>
                    <GalleryUploadLabel>Tag</GalleryUploadLabel>
                    <GalleryUploadInput placeholder='Please write a tag. (tags and tags are separated by commas)' {...register("tag", {maxLength: {value: 30, message: "The length of the tag is too long(~30)"}})} />
                    <GalleryUploadErr>{errors?.tag?.message}</GalleryUploadErr>
                </GalleryUploadSector>
                <GalleryUploadSector>
                    <GalleryUploadButton variants={btnUploadVar} whileHover="hover">UPLOAD</GalleryUploadButton>
                </GalleryUploadSector>
            </GalleryUploadForm>
        </GalleryUploadContainer>
    </GalleryUploadWrap>
  )
}

export default withRouter(GalleryUpload)