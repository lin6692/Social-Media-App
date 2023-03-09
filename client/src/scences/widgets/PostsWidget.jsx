import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";
import { Typography, useTheme } from "@mui/material";
import PostWidget from "./PostWidget";
import WidgetWrapper from "components/WidgetWrapper";


const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);

  const { palette } = useTheme();

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts:data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts:data }));
  };

  const patchLike = async (postId) => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });
    const updatedPosts = await response.json();
    dispatch(setPost({ post: updatedPosts }));
  };

  const deletePost = async (postId) => {
    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });
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
  console.log(posts);

  return ( 
    <>
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
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            createdAt={createdAt}
            patchLikeCallback={patchLike}
            deletePostCallback={deletePost}
          />
        )
      )}
    </>
    );
};

export default PostsWidget;