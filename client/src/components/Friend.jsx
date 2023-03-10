import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import User from "controllers/User";

const Friend = ({ friend, handleFriendsCallback=null, user }) => {
  const userApi = new User();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loggedUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = loggedUser.friends.find((userFriend) => userFriend._id === friend._id);

  const patchFriend = async () => {
    const data = await userApi.patchFriend(user._id, token, friend._id);
    // Update current user friends
    dispatch(setFriends({ friends: data }));

    // For profile page -> update profileUser friends list
    if (user._id !== loggedUser._id) {
      const userFriends = await userApi.getFriends(user._id, token)
      if (handleFriendsCallback) {
        handleFriendsCallback(userFriends);
      }}
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={friend.picturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friend._id}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {`${friend.firstName} ${friend.lastName}`}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {friend.location}
          </Typography>
        </Box>
      </FlexBetween>
        {(friend._id!== loggedUser._id) && (
          <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
          {(isFriend)? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
          </IconButton>
        ) }
    </FlexBetween>
  );
};

export default Friend;