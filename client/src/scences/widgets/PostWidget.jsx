import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutlined,
  AddComment
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";
import CommentWidget from "./CommentWidget";
import DialogWidget from "scences/widgets/DialogWidget";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Comment from "controllers/Comments";
import moment from "moment";


const PostWidget = ({
  postId,
  postUserId,
  firstName,
  lastName,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  createdAt,
  patchLikeCallback,
  deletePostCallback,
  isProfile,
  loggedUser
}) => {
  const commentApi = new Comment();

  const [isComments, setIsComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const poster = {
    _id: postUserId,
    picturePath: userPicturePath,
    firstName,
    lastName,
    location,
  }

  const token = useSelector((state) => state.token);
  
  const isLiked = Boolean(likes[loggedUser._id]);
  const likeCount = Object.keys(likes).length;
  const createdTime = moment(createdAt).fromNow();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({
        title: "",
        context:"",
        button:"",
  })

  const handleDialog = () => {
    const isDialogOpen = !openDialog;
    setOpenDialog(isDialogOpen);
  }

  const addComments = async () => {
    const reqBody = {userId: loggedUser._id, description:comment};
    const newComment = await commentApi.addComment(postId, token, reqBody);
    
    if (!newComment) {
      setDialogContent({
        title: "Failed",
        context: "Whoops, post not found",
        button: "OK",
      })
      handleDialog();
      return 
    }

    const updatedComments = [...comments,newComment]
    setComments(updatedComments);
    setComment("");
  }

  const getComments = async () => {
    const updatedComments = await commentApi.getComments(postId, token);
    if (!updatedComments) {
      setDialogContent({
        title: "Failed",
        context: "Whoops, post not found",
        button: "OK",
      })
      handleDialog();
      return 
    }
    setComments(updatedComments);
  }

  const deleteComment = async (commentId) => {
    const reqBody = { userId: loggedUser._id, commentId: commentId};
    const isCommentDeleted = await commentApi.deleteComments(postId, token, reqBody);
    if (!isCommentDeleted) {
      setDialogContent({
        title: "Failed",
        context: "Whoops, post or comment not found",
        button: "OK",
      })
      handleDialog();
      return 
    }
    const updatedComments = comments.filter((comment)=>{
      return comment._id !== commentId;
    })
    setComments(updatedComments);
  }

  useEffect(() => {
    getComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper m="0 0 2rem 0">
      <Friend
        friend={poster}
        user={loggedUser}
        isProfile={isProfile}
      />
      <Typography color={medium} sx={{ mt: "0.2rem" }}>
        {createdTime}
      </Typography>
      
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => patchLikeCallback(postId)}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
          
        </FlexBetween>

        <IconButton onClick={() => deletePostCallback(postId)}>
          { loggedUser._id === postUserId ? (
              <DeleteOutlined />
            ) : null
          }  
        </IconButton>

      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <FlexBetween gap="0.5rem">
            <UserImage image={loggedUser.picturePath} size={"40px"}/>
            <InputBase
              placeholder="What's on your mind..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              sx={{
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "1rem",
                padding: "0.5rem 1rem",
                margin: "0.5rem 0"
              }}
            />
            <IconButton disabled={!comment} onClick={() => addComments()}>      
                <AddComment/>
            </IconButton>
          </FlexBetween>
          {comments.map((comment, i) => (
            <CommentWidget key={i} comment={comment} deleteCommentCallback={deleteComment}/>
          ))}
          <Divider />
        </Box>
      )}
      <DialogWidget 
        open={openDialog} 
        handleDialogCallback={handleDialog}
        title={dialogContent.title}
        context={dialogContent.context}
        button={dialogContent.button}
      ></DialogWidget>
    </WidgetWrapper>
  );
};

export default PostWidget;