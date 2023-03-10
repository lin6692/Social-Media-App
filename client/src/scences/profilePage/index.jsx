import { Box, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scences/navbar";
import FriendListWidget from "scences/widgets/FriendListWidget";
import PostsWidget from "scences/widgets/PostsWidget";
import UserWidget from "scences/widgets/UserWidget";
import User from "controllers/User";

const ProfilePage = () => {
  const userApi = new User();
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const loggedUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [user, setUser] = useState(loggedUser);
  const [isLoggedUser, setIsLoggedUser] = useState(true);
  const [friends, setUserFriends] = useState(loggedUser.friends);

  
  const handleUser = async () => {
    if (userId !== loggedUser._id) {
      const updatedUser = await userApi.getUser(userId, token);
      const updateFriends = await userApi.getFriends(userId, token);
      setUser(updatedUser);
      setIsLoggedUser(false);
      setUserFriends(updateFriends); 
    }
  }

  const handleFriends = (newfriends) =>{
    setUserFriends(newfriends);
  } 

  useEffect(() => {
    handleUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget 
            userId={user._id}
            firstName={user.firstName}
            lastName={user.lastName}
            location={user.location}
            occupation={user.occupation}
            viewedProfile={user.viewedProfile}
            impressions={user.impressions}
            friends={friends}
            picturePath={user.picturePath}
            isHome={false}
          />
          <Box m="2rem 0" />
          <FriendListWidget friends={friends} handleFriendsCallback={handleFriends} user={user}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostsWidget userId={userId} isProfile={true}/>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;