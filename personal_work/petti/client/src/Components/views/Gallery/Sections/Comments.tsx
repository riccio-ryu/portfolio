import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { actGalleryComment, IGalleryComment } from '../../../../api';
import { isLoginUser } from '../../../../atoms';
import { device } from '../../../utils/Size';
import ReplyComment from './ReplyComment';
import SingleComment from './SingleComment';

const CommentsWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;
const CommentsTitle = styled.h4`
  font-size: 2rem;
  font-weight: 400;
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


function Comments(props:any) {
  //const { isLoading: authLoading, data: authData } = useQuery<IAuth>("authGallery", fetchAuth)
  const [ loginUser, setLoginUser ] = useRecoilState(isLoginUser)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IGalleryComment>({ defaultValues: { content: "" } });
  
  const contentMutation = useMutation((commentBody:IGalleryComment) => actGalleryComment(commentBody))

  const onVal = (data: IGalleryComment) => {
    let comBody:IGalleryComment = {
      content: data.content,
      //writer: authData?._id || '',
      writer: loginUser,
      postId: props.postId
    }

    // contentMutation.mutateAsync(comBody)
    //   .then(response => {
    //     if(response.data.success){
    //       reset({content: ""})
    //       props.refreshComment(response.data.result)
    //     }else{
    //       alert('Failed to save Comment')
    //     }
    //   })
  }
  console.log(props.commentsList)

  return (
    <CommentsWrap>
      <CommentsTitle>Replies</CommentsTitle>
      {/* comment list */}
      {props.commentsList && props.commentsList.map((comment:any, index:any) =>
        (!comment.responseTo &&
          <>
            <SingleComment postId={props.postId} comment={comment} refreshComment={props.refreshComment} replyUse={true} />
            <ReplyComment postId={props.postId} commentLists={props.commentsList} parentId={comment._id} refreshComment={props.refreshComment} />
          </>
        )
      )}
      {/* root comment form */}
      <CommentsForm onSubmit={handleSubmit(onVal)}>
        <CommentRow>
          <CommentsText id='comments_text' {...register('content', {required:"Comment is required", maxLength:{value: 500, message: "The length of the comment is too long.(500 letter)"}})} placeholder='Please write a comment' />
          <CommentsButton variants={btnCommentVar} whileHover="hover">Submit</CommentsButton>
        </CommentRow>
        <CommentsErr>{errors?.content?.message}</CommentsErr>
      </CommentsForm>
    </CommentsWrap>
  )
}

export default Comments