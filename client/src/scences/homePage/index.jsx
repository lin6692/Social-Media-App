import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "scences/navbar";
import UserWidget from "scences/widgets/UserWidget";
import MyPostWidget from "scences/widgets/MyPostWidget";
import PostsWidget from "scences/widgets/PostsWidget";
import AdvertWidget from "scences/widgets/AdvertWidget";
import FriendListWidget from "scences/widgets/FriendListWidget";
import User from "controllers/User";
import { useEffect } from "react";
import { setFriends } from "state";

const HomePage = () => {
  const userApi = new User();
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  const token =  useSelector((state) => state.token);

  const handleFriends = async () => {
    const userFriends = await userApi.getFriends(user._id, token);
    dispatch(setFriends({ friends: userFriends }));
  }

  useEffect(() => {
    handleFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
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
            isHome={true}
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath}/>
          <PostsWidget userId={user._id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget friends={user.friends} user={user} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;