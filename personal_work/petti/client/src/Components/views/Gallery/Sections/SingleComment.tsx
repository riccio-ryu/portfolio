import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { actGalleryComment, IGalleryComment } from '../../../../api';
import { isLoginUser } from '../../../../atoms';
import { device } from '../../../utils/Size';
import moment from 'moment'
import LikeDislikes from './LikeDislikes';
import UserIcon from '../../../utils/UserIcon';

const CommentWrap = styled.div`
    width: 100%;
    position: relative;
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: .8rem;
  width: 100%;
`;
const CommentProfile = styled.a`
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
const CommentProfileImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
`;
const CommentDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.2rem;
  flex: 1;
`;
const CommentWriter = styled.a`
  font-size: 1.8rem;
  font-weight: 400;
`;
const CommentContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
`;
const CommentWriting = styled.pre`
    font-size: 1.6rem;
`;
const CommentDate = styled.span`
    font-size: 1rem;
`;
const CommentTools = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: baseline;
    align-items: center;
    font-size: 1.2rem;
`
const CommentReply = styled.button`
    font-size: 1.2rem;
`;
const CommentsForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  gap: .4rem;
  width: 100%;
`;
const CommentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  gap: .4rem;
  width: 100%;
`;
const CommentsText = styled.textarea`
  flex: 8 1;
  width: 100%;
  height: 6rem;
  border-radius: .4rem;
  resize: none;
`
const CommentsButton = styled(motion.button)`
  flex: 1 1;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.logo.yellow};
  color: #fff;
  padding: .8rem 2rem;
  border-radius: .4rem;
  font-size: 2rem;
`
const CommentsErr = styled.span`
  color: red;
  margin-bottom: 1rem;
`

const btnCommentVar = {
    hover: { color: "#fff", backgroundColor: "#d3599c", transition: {duration: .3 } }
  }

function SingleComment(props:any) {
    const [ loginUser, setLoginUser ] = useRecoilState(isLoginUser)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IGalleryComment>();
    const [openReply, setOpenReply] = useState(false)

    const clickReply = () => {
        setOpenReply((prev) => !prev)
    }

    const replyMutation = useMutation((replyBody:IGalleryComment) => 
        actGalleryComment(replyBody)
    )

    const onVal = (data: IGalleryComment) => {
        let comBody:IGalleryComment = {
            content: data.content,
            writer: loginUser,
            postId: props.postId,
            responseTo: props.comment._id
        }

        replyMutation.mutateAsync(comBody)
          .then(response => {
            if(response.data.success){
              console.log(response)
              reset({content: ""})
              setOpenReply(false)
              props.refreshComment(response.data.result)
            }else{
              alert('Failed to save Comment Reply')
            }
          })
    }
    
  return (
    <CommentWrap>
        <CommentBox>
            <CommentProfile>
                {props.comment.writer.image ?
                <CommentProfileImage />
                :
                <UserIcon />
                }
            </CommentProfile>
            <CommentDesc>
                <CommentWriter>{props.comment.writer.nick}</CommentWriter>
                <CommentContent>
                    <CommentWriting>{props.comment.content}</CommentWriting>
                    <CommentDate>{moment(props.comment.updatedAt).format("YYYY-MM-DD")}</CommentDate>
                </CommentContent>
                <CommentTools>
                    <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />
                {props.replyUse &&
                    <CommentReply onClick={clickReply}>Reply to</CommentReply>
                }
                </CommentTools>
            </CommentDesc>
        </CommentBox>

        {openReply &&
            <CommentsForm onSubmit={handleSubmit(onVal)}>
                <CommentRow>
                    <CommentsText {...register('content', {required:"Comment is required", maxLength:{value: 500, message: "The length of the comment is too long.(500 letter)"}})} placeholder='Please write a comment' />
                    <CommentsButton variants={btnCommentVar} whileHover="hover">Submit</CommentsButton>
                </CommentRow>
                <CommentsErr>{errors?.content?.message}</CommentsErr>
            </CommentsForm>
        }
    </CommentWrap>
  )
}

export default SingleComment