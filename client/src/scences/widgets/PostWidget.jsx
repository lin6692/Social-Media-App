import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  DeleteOutlined,
  HighlightOff,
  AddComment
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import UserImage from "components/UserImage";
import CommentWidget from "./CommentWidget";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";
import moment from "moment";


const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  createdAt,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const loggedInUserPicturePath = useSelector((state) => state.user.picturePath);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const createdTime = moment(createdAt).fromNow();

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const medium = palette.neutral.medium;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPosts = await response.json();
    dispatch(setPost({ post: updatedPosts }));
  };

  const deletePost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPosts({ posts: updatedPost }));
  }

  const addComments = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
       "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId, description:comment }),
    })

    const updatedComments = await response.json();
    setComments(updatedComments);
    setComment("");
  }

  const getComments = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    const updatedComments = await response.json();
    setComments(updatedComments);
  }

  const deleteComment = async (commentId) => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId, commentId: commentId}),
    })
    const updatedComments = await response.json();
    setComments(updatedComments);
  }

  useEffect(() => {
    getComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper m="0 0 2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
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
            <IconButton onClick={patchLike}>
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

        <IconButton onClick={deletePost}>
          { loggedInUserId === postUserId ? (
              <DeleteOutlined />
            ) : null
          }  
        </IconButton>

      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <FlexBetween gap="0.5rem">
            <UserImage image={loggedInUserPicturePath} size={"40px"}/>
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
    </WidgetWrapper>
  );
};

export default PostWidget;