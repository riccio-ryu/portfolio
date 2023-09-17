import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../utils/Size';
import moment from 'moment'
import { useQuery } from 'react-query';
import { actGetGallery } from '../../../api';
import Loading from '../../utils/Loading';
import UserIcon from '../../utils/UserIcon';
import { Mode } from '../../utils/Mode';

const GalleryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;
const GalleryUploadContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: 2rem;

  a{
    background-color: ${props => props.theme.logo.yellow};
    color: #fff;
    font-size: 2rem;
    padding: 0.7rem 1.8rem;
    border-radius: 0.4rem;
    box-sizing: border-box;
    width: 9.6rem;
    height: 3.6rem;
    text-align: center;

    &.scrollDown{
      position: fixed;
      top: 76px;
      right: 1.6rem;
      border-radius: 50%;
      width: 3.6rem;
      padding: .7rem;
      font-weight: bold;
    }
  }
`;
const GalleryUploadDesc = styled.p`
  color: #000;
  font-size: 1.8rem;
  @media ${device.tablet}{
    font-size: 2.4rem;
  }
`
const GalleryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem 0;
  @media ${device.tablet} {
    gap: 2rem 1%;
  }
  @media ${device.laptop} {
    gap: 2rem 0.6%;
  }
`;
const GalleryCard = styled.div`
  flex: 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: .8rem;
  @media ${device.tablet} {
    flex: 0 49.5%;
  }
  @media ${device.laptop}{
    flex: 0 24.55%;
  }
`;
const GalleryUpBox = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-bottom: calc((100%)*9/16);
`;
const GalleryUpThumb = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
`;
const GalleryUpDuration = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,.7);
  padding: .2rem .4rem;
  color: #ccc;
`;
const GalleryDownBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: .8rem;
  width: 100%;
`;
const GalleryDownProfile = styled.a`
  background-color: black;
  flex: 0 10%;
  height: 0;
  padding-bottom: calc(10%);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  svg{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
  }
  @media ${device.tablet}{
    flex: 0 15%;
    padding-bottom: calc(15%);
  }
`;
const GalleryDownProfileImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
`;
const GalleryDownDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.2rem;
  flex: 1;
`;
const GalleryDownTitle = styled.a`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
  white-space: normal;
  word-break: break-all;
  font-size: 1.8rem;
  font-weight: 400;
`
const GalleryDownWriter = styled.a`
  font-size: 1.6rem;
`;
const GalleryDownEtc = styled.p`
  font-size: 1.2rem;
  color: #333;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: .4rem;
`
const GalleryDownView = styled.span``;
const GalleryDownDate = styled.span``;

function Gallery() {
  const [scrollPosition, setScrollPosition] = useState(false)
  
  window.addEventListener('scroll', function (e:any) {//scroll event
    const documentScroll = document.documentElement.scrollTop;
    // const containerTop = (document.getElementById('gallery_container') as HTMLElement).offsetTop
    const btnUpload= (document.getElementById('btn_upload') as HTMLElement)
    if(documentScroll > 0){
      btnUpload.classList.add('scrollDown')
      setScrollPosition(true)
    }else{
      btnUpload.classList.remove('scrollDown')
      setScrollPosition(false)
    }

  })

  const { isLoading: galleryLoading, data:galleryData } = useQuery<any>("gallery", actGetGallery)

  const renderCards = galleryData?.data.gallerys.map((gallery:any, index:number) => {

    let minutes = Math.floor(gallery.duration / 60);
    let seconds = Math.floor(gallery.duration - minutes * 60);

    return (
      <GalleryCard>
        <GalleryUpBox>
          <a href={`/gallery/${gallery._id}`} >
          <GalleryUpThumb src={`${Mode.add}${gallery.thumbnail}`} alt='thumbnail' />
          {gallery.fileType === 'video' && <GalleryUpDuration>{`${minutes < 10 ? '0'+ minutes : minutes}`} : {`${seconds < 10 ? '0' + seconds : seconds}`}</GalleryUpDuration>}
          </a>
        </GalleryUpBox>
        <GalleryDownBox>
          <GalleryDownProfile>
            {gallery.writer.image ?
            <GalleryDownProfileImage src={gallery.writer.image} />
            :
            <UserIcon />
            }
          </GalleryDownProfile>
          <GalleryDownDesc >
            <GalleryDownTitle>{gallery.title}</GalleryDownTitle>
            <GalleryDownWriter>{gallery.writer.nick}</GalleryDownWriter>
            <GalleryDownEtc>
              <GalleryDownView>{gallery.views} view, </GalleryDownView>
              <GalleryDownDate>{moment(gallery.createdAt).format("YYYY-MM-DD")}</GalleryDownDate>
            </GalleryDownEtc>
          </GalleryDownDesc>
        </GalleryDownBox>
      </GalleryCard>
    )
  })

  return (
    <GalleryWrap>
      <GalleryUploadContainer>
        <GalleryUploadDesc>Show off your pets to people.</GalleryUploadDesc>
        <Link id='btn_upload' to={`/gallery/upload`}>{scrollPosition ? '+' : 'Upload'}</Link>
      </GalleryUploadContainer>
      <GalleryContainer id='gallery_container'>
        {galleryLoading ? <Loading /> :
        renderCards}
      </GalleryContainer>
    </GalleryWrap>
  );
}

export default withRouter(Gallery);
