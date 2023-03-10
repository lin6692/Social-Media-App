import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

const FriendListWidget = ({ friends }) => {

  const { palette } = useTheme();

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends && (friends.map((friend, i) => (
              <Friend
                key={i}
                friend={friend}
              />
          )))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;