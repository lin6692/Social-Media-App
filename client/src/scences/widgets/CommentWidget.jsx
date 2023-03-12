import {
    HighlightOff,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import UserImage from "components/UserImage";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { useSelector } from "react-redux";
  import moment from "moment";

  const CommentWidget = ({
    comment,
    deleteCommentCallback
}) => {
    const navigate = useNavigate();
    const loggedInUserId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const [commenter, setCommenter] = useState({});


    const { palette } = useTheme();
    const createdTime = moment(comment.createdAt).format('MMMM Do YYYY, h:mm a');;

    
    const getCommenter = async () => {
        const url = `https://social-media-server-25d3.onrender.com/users/${comment.userId}`;
        const response = await fetch(
            url,
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
     
        <FlexBetween key={comment._id} sx={{margin:"0.5rem 0"}}>
            <UserImage image={commenter.picturePath} size={"40px"}/>
            <Box width={"100%"} padding={"0 0 0 0.7rem"}>
                <Box component="span" sx={{ 
                    display: 'inlineblock', 
                    fontWeight:"medium", 
                    color: palette.neutral.main,
                    "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                        }
                    }}
                    onClick={() => {
                        navigate(`/profile/${commenter._id}`);
                        navigate(0);
                      }}
  
                >
                    {`${commenter.firstName} ${commenter.lastName}`}  
                </Box>
                <Box component="span" sx={{ 
                    display: 'inlineblock', 
                    color: palette.neutral.medium, 
                    fontSize:"0.7rem"}}
                >
                {` @ ${createdTime}`}
                </Box>

                <Typography sx={{ color: palette.neutral.main, width:"80%"}}>
                {comment.description}
                
                </Typography>
            </Box>
            { loggedInUserId === comment.userId ? (
                    <IconButton onClick={() => deleteCommentCallback(comment._id)}>      
                        <HighlightOff />
                    </IconButton>): null}
            <Divider />
        </FlexBetween>
 
    )

  }

  export default CommentWidget;
  
 