import React, { useEffect, useState } from 'react'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useMutation } from 'react-query';
import styled from 'styled-components'
import { actGalleryUndislike, actGalleryUnlike, actGalleryUpdislike, actGalleryUplike, actGetGalleryDislike, actGetGalleryLike, IGalleryLikes } from '../../../../api';

const LikeDislikeBlock = styled.span`
    svg.thumb-Fill{
        color: ${props => props.theme.logo.pink};
    }
`
const LikeDislikeCount = styled.span`
    padding: 0 .8rem 0 .4rem;
`

function LikeDislikes(props:any) {

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState<any>(null);
  const [dislikeAction, setDislikeAction] = useState<any>(null);

  let variable:any = {};

  if(props.viewer){
      variable = { postId: props.postId, userId: props.userId }
  }else{
      variable = { commentId: props.commentId, userId: props.userId }
  }

  const likeMutation = useMutation((likeBody:IGalleryLikes) => actGetGalleryLike(likeBody))
  const dislikeMutation = useMutation((dislikeBody:IGalleryLikes) => actGetGalleryDislike(dislikeBody))
  const upLikeMutation = useMutation((likeBody:IGalleryLikes) => actGalleryUplike(likeBody))
  const unLikeMutation = useMutation((likeBody:IGalleryLikes) => actGalleryUnlike(likeBody))
  const upDislikeMutation = useMutation((dislikeBody:IGalleryLikes) => actGalleryUpdislike(dislikeBody))
  const unDislikeMutation = useMutation((dislikeBody:IGalleryLikes) => actGalleryUndislike(dislikeBody))

  useEffect(() => {
      likeMutation.mutateAsync(variable)
        .then(response => {
            if(response.data.success){
                setLikes(response.data.likes.length);

                response.data.likes.map((like:any) => {
                    if(like.userId === props.userId){
                        setLikeAction('liked')
                    }
                })
            }else{
                alert('Failed to get likes')
            }
        })
        dislikeMutation.mutateAsync(variable)
            .then(response => {
                if(response.data.success){
                    setDislikes(response.data.dislikes.length);

                    response.data.dislikes.map((dislike:any) => {
                        if(dislike.userId === props.userId){
                            setDislikeAction('disliked')
                        }
                    })
                }else{
                    alert('Failed to get dislikes')
                }
            })
  }, [])

  const onLike = () => {
      if(likeAction === null){
          upLikeMutation.mutateAsync(variable)
            .then(response => {
                if(response.data.success){
                    setLikes(likes + 1);
                    setLikeAction('liked')

                    if(dislikeAction !== null){
                        setDislikeAction(null)
                        setDislikes(dislikes - 1)
                    }
                }else{
                    alert('Failed to increase the like')
                }
            })
      }else{
          unLikeMutation.mutateAsync(variable)
            .then(response => {
                if(response.data.success){
                    setLikes(likes - 1)
                    setLikeAction(null)
                }else{
                    alert('Failed to decrease the like')
                }
            })
      }
  }

  const onDislike = () => {
      if(dislikeAction === null){
          upDislikeMutation.mutateAsync(variable)
            .then(response => {
                if(response.data.success){
                    setDislikes(dislikes + 1);
                    setDislikeAction('disliked')

                    if(likeAction !== null){
                        setLikeAction(null)
                        setLikes(likes - 1)
                    }
                }else{
                    alert('Failed to increase the dislike')
                }
            })
      }else{
          unDislikeMutation.mutateAsync(variable)
            .then(response => {
                console.log();
                
                if(response.data.success){
                    setDislikes(dislikes - 1)
                    setDislikeAction(null)
                }else{
                    alert('Failed to decrease the dislike')
                }
            })
      }
  }

  return (
    <>
        <LikeDislikeBlock>
            <FaThumbsUp className={`thumbs${likeAction === 'liked' ? ' thumb-Fill' : ''}`} onClick={onLike} />
            <LikeDislikeCount>{likes}</LikeDislikeCount>
        </LikeDislikeBlock>
        <LikeDislikeBlock>
            <FaThumbsDown className={`thumbs${dislikeAction === 'disliked' ? ' thumb-Fill' : ''}`} onClick={onDislike} />
            <LikeDislikeCount>{dislikes}</LikeDislikeCount>
        </LikeDislikeBlock>
    </>
  )
}

export default LikeDislikes