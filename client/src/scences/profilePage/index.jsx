import { Box, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scences/navbar";
import FriendListWidget from "scences/widgets/FriendListWidget";
import PostsWidget from "scences/widgets/PostsWidget";
import UserWidget from "scences/widgets/UserWidget";

const ProfilePage = () => {
  const { userId } = useParams();
  const loggedUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [user, setUser] = useState(null);
  const [isLoggedUser, setIsLoggedUser] = useState(false);


  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const handleUser = async () => {
    if (userId === loggedUser._id) {
      setUser(loggedUser)
      setIsLoggedUser(true);
    } else {
      await getUser();
    }
  }

  const getUser = async () => {
    const response = await fetch(
        `http://localhost:3001/users/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedUser = await response.json();
      setUser(updatedUser);
  }

  useEffect(() => {
    handleUser()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    console.log("no user!!!");
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
            friends={user.friends}
            picturePath={user.picturePath}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;