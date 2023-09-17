import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { device } from '../../utils/Size'
import { motion } from 'framer-motion';
import { actGalleryDetail, actGetGalleryComment, IGalleryId } from '../../../api'
import { useMutation } from 'react-query'
import Comments from './Sections/Comments';
import LikeDislikes from './Sections/LikeDislikes';
import UserIcon from '../../utils/UserIcon';
import { Mode } from '../../utils/Mode';

const GDetailWrap = styled.div`
    display: flex;
`
const GDetailMain = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    gap: 2rem;
`;
const GDetailMainViewer = styled.div`
    flex: 1 100%;
    width: 100%;
    height: 0;
    padding-bottom: calc(100% * 9 /16);
    position: relative;
    overflow: hidden;
    background-color: #666;
`;
const GDetailMainVideo = styled.video`
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const GDetailMainImage = styled.img`
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const GDetailMainInfo = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
`;
const GDetailMainAbout = styled.div`
    display: flex;
    justify-content: center;
    align-items: baseline;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`;
const GDetailMainTitle = styled.h3`
    font-size: 2.4rem;
    font-weight: 400;
`;
const GDetailMainTools = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
`;
const GDetailToll = styled.span`
    flex: 1;
`
const GDetailMainWriter = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    gap: 1rem;
    width: 100%;
`;
const GDetailMainProfile = styled.a`
    background-color: black;
    flex: 0 5%;
    height: 0;
    padding-bottom: calc(5%);
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
`;
const GDetailMainProfileImg = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
`;
const GDetailMainExec = styled.div``;
const GDetailMainWriterName = styled.p``;
const GDetailMainDesc = styled.p``;
const GDetailLineH = styled.div`
    width: 100%;
    height: .1rem;
    background-color: #ccc;
`;
const GDetailLineV = styled.div`
    width: .1rem;
    height: 100%;
    background-color: #ccc;
`;


function GalleryDetailPage(props:any) {

    const galleryId = props.match.params.galleryId
    const [loadGallery, setLoadGallery] = useState<any>()
    const [loadComments, setLoadComments] = useState<any>()

    const galleryVariable:IGalleryId = {
        galleryId: galleryId
    }
    const gDetailMutation = useMutation((gallery_id:IGalleryId) => actGalleryDetail(gallery_id));
    const getCommentsMutation = useMutation((gallery_id:IGalleryId) => actGetGalleryComment(gallery_id));

    useEffect(() => {
        gDetailMutation.mutateAsync(galleryVariable)
            .then((response) => {
                if(response.data.success) {
                    //console.log(response.data.galleryDetail);
                    setLoadGallery(response.data.galleryDetail)
                } else {
                    alert('Failed to get video Info')
                }
            })
        getCommentsMutation.mutateAsync(galleryVariable)
            .then((response) => {
                if (response.data.success) {
                    console.log('response.data.comments',response.data.comments)
                    setLoadComments(response.data.comments)
                } else {
                    alert('Failed to get video Comments Info')
                }
            })
    }, [])
    
    const updateComment = (newComment:any) => {
        setLoadComments(loadComments.concat(newComment))
    }
    
  if(loadGallery !== undefined){
  return (
    <GDetailWrap>
        <GDetailMain>
            <GDetailMainViewer>
                {`${loadGallery.fileType}` === 'image' ? <GDetailMainImage  src={`${Mode.add}${loadGallery.filePath}`} alt='image' /> : <GDetailMainVideo  src={`${Mode.add}${loadGallery.filePath}`} autoPlay controls />}
            </GDetailMainViewer>
            <GDetailMainInfo>
                <GDetailMainAbout>
                    <GDetailMainTitle>{loadGallery.title}</GDetailMainTitle>
                    <GDetailMainTools>
                        <GDetailToll>
                            <LikeDislikes viewer postId={galleryId} userId={localStorage.getItem('userId')} />
                        </GDetailToll>
                        {/* <GDetailToll>2</GDetailToll>
                        <GDetailToll>3</GDetailToll> */}
                    </GDetailMainTools>
                </GDetailMainAbout>
                <GDetailLineH></GDetailLineH>
                <GDetailMainWriter>
                    <GDetailMainProfile>
                        {loadGallery.writer.image ?
                        <GDetailMainProfileImg />
                        :
                        <UserIcon />
                        }
                    </GDetailMainProfile>
                    <GDetailMainExec>
                        <GDetailMainWriterName>{loadGallery.writer.nick}</GDetailMainWriterName>
                        <GDetailMainDesc>{loadGallery.description}</GDetailMainDesc>
                    </GDetailMainExec>
                </GDetailMainWriter>
            </GDetailMainInfo>
            <Comments postId={galleryId} commentsList={loadComments} refreshComment={updateComment} />
        </GDetailMain>
    </GDetailWrap>
  )
  }else{
      return(
          <div>isloading</div>
      )
  }
}

export default withRouter(GalleryDetailPage)