import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { FaPlus } from 'react-icons/fa'
import { useMutation } from 'react-query'
import styled from 'styled-components'
import { actGoodsUpload } from '../../api'
import { device } from './Size'


const GoodsUploadDrop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`
const GoodsUploadThumbBox = styled.div`
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
const GoodsUploadThumb = styled.img`
    width: auto;
    height: 100%;
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const GoodsUploadBlock = styled.div`
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


function FileUpload<T>(props:T):React.ReactElement {

  const [images, setImages] = useState([])

  const uploadMutation = useMutation((data:any) => actGoodsUpload(data))

  const uploadDrop = (files:any) => {
    let formData = new FormData();
    console.log(typeof(files));
    
    formData.append("file", files[0]);
  
    uploadMutation.mutateAsync(formData)
      .then(response => {
        console.log(response);
      })
  }
  const deleteHandler = (img:any) => {
      //img 삭제
      // const currentIndex = Images.indexOf(image);
      // let newImages = [...Images]
      // newImages.splice(currentIndex, 1)
      // setImages(newImages)
      // props.refreshFunction(newImages)
      
      console.log(img);
      
  }

  return (
    <div>
        <GoodsUploadDrop>
          <Dropzone onDrop={uploadDrop} maxSize={10000000}>
            { 
              ({ getRootProps, getInputProps }) => (
                <GoodsUploadBlock {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FaPlus />
                </GoodsUploadBlock>
              )
            }
          </Dropzone>
            {/* thumb */}
          <GoodsUploadThumbBox>
              <GoodsUploadThumb src='' alt='thumbs' />
          </GoodsUploadThumbBox>
        </GoodsUploadDrop>
    </div>
  )
}

export default FileUpload