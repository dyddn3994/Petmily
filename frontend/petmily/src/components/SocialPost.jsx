import { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, styled } from '@mui/material';
import ArrowCircleUpRoundedIcon from '@mui/icons-material/ArrowCircleUpRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import { PropTypes, number, string } from 'prop-types';
import { placeholderImage } from 'utils/utils';

import useFetch from 'utils/fetch';
import UploadImage from './UploadImage';
import DeleteConfirmation from './DeleteConfirmation';
import SocialComment from './SocialComment';
import SocialCommentInput from './SocialCommentInput';

function SocialPost({ post, updatePost, deletePost }) {
  const StyledFavoriteRoundedIcon = styled(FavoriteRoundedIcon, {
    name: 'StyledFavoriteRoundedIcon',
    slot: 'Wrapper',
  })({
    color: '#A6A7AB',
    fontSize: 28,
    '&:hover': { color: '#f4245e' },
  });
  const StyledEditNoteRoundedIcon = styled(EditNoteRoundedIcon, {
    name: 'StyledEditNoteRoundedIcon',
    slot: 'Wrapper',
  })({
    color: '#A6A7AB',
    fontSize: 30,
    '&:hover': { color: '#1f90fe' },
  });
  const StyledDeleteForeverRoundedIcon = styled(DeleteForeverRoundedIcon, {
    name: 'StyledDeleteForeverRoundedIcon',
    slot: 'Wrapper',
  })({
    color: '#A6A7AB',
    fontSize: 26,
    '&:hover': { color: '#f4245e' },
  });
  const StyledArrowCircleUpRoundedIcon = styled(ArrowCircleUpRoundedIcon, {
    name: 'StyledArrowCircleUpRoundedIcon',
    slot: 'Wrapper',
  })({
    color: '#A6A7AB',
    fontSize: 26,
    transform: 'rotate(-90deg)',
    '&:hover': { color: '#f4245e' },
  });
  const StyledDriveFileRenameOutlineRoundedIcon = styled(
    DriveFileRenameOutlineRoundedIcon,
    {
      name: 'StyledDriveFileRenameOutlineRoundedIcon',
      slot: 'Wrapper',
    },
  )({
    color: '#A6A7AB',
    fontSize: 26,
    '&:hover': { color: '#1f90fe' },
  });
  const StyledCheckCircleOutlineRoundedIcon = styled(
    CheckCircleOutlineRoundedIcon,
    {
      name: 'StyledCheckCircleOutlineRoundedIcon',
      slot: 'Wrapper',
    },
  )({
    color: '#A6A7AB',
    fontSize: 26,
    '&:hover': { color: '#1f90fe' },
  });
  // const month = post.boardUploadTime.split('-')[1];
  // const day = post.boardUploadTime.split('-')[2];
  // const time = post.boardUploadTime.split('-')[2];
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(post.boardContent);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [uploadedImage, setUploadedImage] = useState([]);
  const fetchSocialPost = useFetch();

  const toggleEditMode = () => {
    setEditedText(post.boardContent);
    setEditMode(prevEditMode => !prevEditMode);
  };

  const handleTextChange = e => {
    setEditedText(e.target.value);
  };

  const handleUpdate = () => {
    updatePost(post, editedText);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = () => {
    deletePost(post.boardId);
    setShowDeleteConfirmation(false);
  };

  const [comment, setComment] = useState([]);

  const createComment = async createCommentText => {
    const sendBE = {
      userEmail: post.userEmail,
      boardId: post.boardId,
      commentContent: createCommentText,
      parentId: null,
    };
    console.log(sendBE);

    try {
      const response = await fetchSocialPost.post('comment/save', sendBE);
      console.log('여기는 댓글 생성', response);
      // setComment([...comment, response]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = currentCommentId => {
    setComment(comment.filter(c => c.id !== currentCommentId));
  };

  return (
    <div className="relative">
      <span className="mb-3 h-[0.06rem] w-full bg-gray2 inline-block" />
      <DeleteConfirmation
        show={showDeleteConfirmation}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <div className="flex flex-col px-[1rem] items-between justify-between">
        <div className="flex items-start">
          <div className="rounded-full overflow-hidden pr-2">
            <img
              className="rounded-full w-[3rem] h-[3rem] overflow-hidden object-cover"
              alt=""
              src={placeholderImage(1)}
            />
          </div>
          <div className="flex flex-col w-full gap-[0.5rem] mx-4">
            <div className="flex items-center justify-between text-slategray">
              <div className="flex gap-[0.3rem]">
                <b className="text-gray">{post.userEmail}</b>
                <div className="font-medium">
                  {post.boardUploadTime.split('T')[0].split('-')[1]}/
                  {post.boardUploadTime.split('T')[0].split('-')[2]}
                  {` · `}
                  {post.boardUploadTime.split('T')[1].split(':')[0]}:
                  {post.boardUploadTime.split('T')[1].split(':')[1]}
                </div>
              </div>
              <div className="flex items-center justify-center">
                {editMode ? (
                  <>
                    <div
                      role="presentation"
                      className="gap-[0.5rem] rounded-full text-[1rem] w-fill h-[0.5rem] text-black flex p-[0.5rem] items-center justify-center"
                      onClick={handleCancel}
                    >
                      <StyledArrowCircleUpRoundedIcon className="mt-0.5" />
                    </div>
                    <div
                      type="submit"
                      role="presentation"
                      className="gap-[0.5rem] rounded-full text-[1rem] w-fill h-[0.5rem] text-black flex p-[0.5rem] items-center justify-center"
                      onClick={handleUpdate}
                    >
                      <StyledCheckCircleOutlineRoundedIcon className="mt-0.5" />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      role="presentation"
                      className="gap-[0.5rem] rounded-full text-[1rem] w-fill h-[0.5rem] text-black flex p-[0.5rem] items-center justify-center"
                      onClick={toggleEditMode}
                    >
                      <StyledDriveFileRenameOutlineRoundedIcon className="mt-0.5" />
                    </div>
                    <div
                      role="presentation"
                      className="gap-[0.5rem] rounded-full text-[1rem] w-fill h-[0.5rem] text-black flex p-[0.5rem] items-center justify-center"
                      onClick={handleDelete}
                    >
                      <StyledDeleteForeverRoundedIcon className="mt-0.5" />
                    </div>
                  </>
                )}
              </div>
            </div>
            {editMode ? (
              <>
                <textarea
                  rows="5"
                  value={editedText}
                  onChange={handleTextChange}
                  className="resize-none mt-2 w-fill text-black rounded-xl p-4 border-solid border-[2px] border-dodgerblue focus:outline-none font-pretendard text-base"
                />
                <UploadImage
                  page="소통하기"
                  uploadedImage={uploadedImage}
                  setUploadedImage={setUploadedImage}
                />
              </>
            ) : (
              <div className="break-all font-pretendard text-base mt-2 font-base w-fill text-black rounded-xl p-4 border-solid border-[2px] border-gray2 focus:outline-none focus:border-dodgerblue">
                {post.boardContent}
              </div>
            )}
            <Carousel className="w-full" autoPlay={false} fullHeightHover swipe>
              {post.photoUrls?.map(photos => {
                return (
                  <Paper key={photos}>
                    <div className="w-full h-full flex justify-center items-center">
                      <img
                        src={photos}
                        className="w-full h-[40rem] rounded-xl overflow-hidden object-cover"
                        alt=""
                      />
                    </div>
                  </Paper>
                );
              })}
            </Carousel>
            <div className="flex justify-start h-full mt-2 gap-[0.2rem]">
              <div
                role="presentation"
                className="gap-[0.5rem] rounded-full text-[1rem] w-fill h-[0.5rem] text-black flex p-[0.5rem] items-center justify-center"
              >
                <StyledFavoriteRoundedIcon className="mt-1" />
                <div>999</div>
              </div>
              <div
                role="presentation"
                className="gap-[0.5rem] rounded-full text-[1rem] w-fill h-[0.5rem] text-black flex p-[0.5rem] items-center justify-center"
              >
                <StyledEditNoteRoundedIcon className="mt-0.5" />
                <div>999</div>
              </div>
            </div>
            {comment?.map(c => {
              return (
                <div key={c.commentId}>
                  <SocialComment
                    post={post.boardId}
                    comments={c}
                    deleteComment={deleteComment}
                  />
                </div>
              );
            })}
            <span className="m-3 h-[0.02rem] w-fill bg-gray2 inline-block" />
            <SocialCommentInput createComment={createComment} />
          </div>
        </div>
      </div>
    </div>
  );
}

SocialPost.propTypes = {
  post: PropTypes.shape({
    boardContent: string,
    boardId: number,
    boardUploadTime: string,
    photoUrls: PropTypes.arrayOf(string).isRequired,
    userEmail: string,
    // modifyState: bool,
  }).isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default SocialPost;