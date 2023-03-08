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
  import { useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost, setPosts } from "state";
  import moment from "moment";

  const CommentWidget = (
    comment,
    deleteCommentCallback
  ) => {
    const loggedInUserId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const [commenter, setCommenter] = useState({});

    const { palette } = useTheme();

    const getCommenter = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${comment.userId}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const newCommenter = await response.json();
          setCommenter(newCommenter);
    }

    useEffect(() => {
        getCommenter()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <Box key={comment._id}>
            <UserImage image={commenter.picturePath} size={"40px"}/>
            <Typography sx={{ color: palette.neutral.main, m: "0.5rem 0", pl: "1rem" }}>
            {comment.description}
            { loggedInUserId === comment.userId ? (
                <IconButton onClick={() => deleteCommentCallback(comment._id)}>      
                    <HighlightOff />
                </IconButton>): null}
            </Typography>
            <Divider />
        </Box>    
    )

  }

  export default CommentWidget;
  
 