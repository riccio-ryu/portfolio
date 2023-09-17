import React, { useState, useEffect } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import styled from 'styled-components';
import SingleComment from './SingleComment';

const ReplyWrap = styled.div`
    width: 100%;
`;
const ReplyRender = styled.div`
    width: 95%;
    margin-left: 5%;
    margin-top: 1rem;
    /* &:first-of-type{
        margin-top: ;
    } */
`
const ReplyMoreBtn = styled.button`
    margin-left: calc(5% + .8rem);
    color: darkturquoise;
`

function ReplyComment(props:any) {
  
  const [childCommentsNum, setChildCommentsNum] = useState(0)
  const [openReplyComment, setOpenReplyComment] = useState(false)
  useEffect(() => {
    let commentNum = 0;
    props.commentLists.map((comment:any) => {
        if(comment.responseTo === props.parentId){
            commentNum++
        }
    })
    setChildCommentsNum(commentNum)
  }, [props.commentLists])
  

  let renderReplyComments = (parentCommentId:any) => (
      props.commentLists.map((comment:any, index:any) => (
          <>
            {comment.responseTo === parentCommentId &&
                <ReplyRender>
                    <SingleComment postId={props.postId} comment={comment} refreshComment={props.refreshComment} replyUse={false} />
                </ReplyRender>
            }
          </>
      ))
  )
  const lookReply = () => {
      setOpenReplyComment(prev => !prev)
  }

  return (
    <ReplyWrap>
        {childCommentsNum > 0 &&
            <ReplyMoreBtn onClick={lookReply}>{openReplyComment ? <FaCaretUp />  : <FaCaretDown />}댓글 {childCommentsNum}개 보기</ReplyMoreBtn>
        }
        {openReplyComment &&
            renderReplyComments(props.parentId)
        }
    </ReplyWrap>
  )
}

export default ReplyComment