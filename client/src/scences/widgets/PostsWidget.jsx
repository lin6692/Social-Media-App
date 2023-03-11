import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";
import { useState } from "react";
import { Typography, useTheme } from "@mui/material";
import PostWidget from "./PostWidget";
import WidgetWrapper from "components/WidgetWrapper";
import DialogWidget from "scences/widgets/DialogWidget";
import Post from "controllers/Post";


const PostsWidget = ({ userId, isProfile=false }) => {
  const postApi = new Post();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const loggedUser = useSelector((state) => state.user);

  const { palette } = useTheme();

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

  const getPosts = async () => {
    const newPosts = await postApi.getPosts(token);
    dispatch(setPosts({ posts:newPosts }));
  };

  const getUserPosts = () => {
    const newPosts = posts.filter((post)=>{
      return post.userId === userId;
    })
    dispatch(setPosts({ posts:newPosts }));
  };

  const patchLike = async (postId) => {
    const updatedPost = await postApi.likePost(loggedUser._id, postId, token);
    dispatch(setPost({ post: updatedPost }));
  };

  const deletePost = async (postId) => {
    const isPostDeleted = await postApi.deletePost(userId, postId, token);
    
    if (!isPostDeleted) {
      setDialogContent({
        title: "Failed",
        context: "Something wrong, please refresh the page",
        button: "OK",
      })
      handleDialog();
      return 
    }
    const updatedPost = posts.filter((post)=> post._id !== postId);
    dispatch(setPosts({ posts: updatedPost }));
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isProfile && posts.length===0) {
    return  (
      <WidgetWrapper m="0 0 2rem 0"> 
        <Typography 
          color={palette.neutral.mediumMain} 
          sx={{ 
            m: "2rem 0",
            fontWeight: 'bold',
            fontSize: 'h3.fontSize'
            }}>
          This person is too lazy for social media. 
        </Typography>
       
      </WidgetWrapper>
    )
  }

  return ( 
    <div>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          createdAt,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            firstName={firstName}
            lastName={lastName}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt={createdAt}
            patchLikeCallback={patchLike}
            deletePostCallback={deletePost}
            isProfile={isProfile}
            loggedUser={loggedUser}
          />
        )
      )}
       <DialogWidget 
            open={openDialog} 
            handleDialogCallback={handleDialog}
            title={dialogContent.title}
            context={dialogContent.context}
            button={dialogContent.button}
        ></DialogWidget>
    </div>
    );
};

export default PostsWidget;