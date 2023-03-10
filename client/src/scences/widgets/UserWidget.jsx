import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ 
    userId,
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends, 
    picturePath,
}) => {
    const loggedUser = useSelector((state) => state.user);
    const isLoggedUser = userId === loggedUser._id;

    const { palette } = useTheme();
    const navigate = useNavigate();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pd="1.1rem"
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                            onClick={() => navigate(`/profile/${userId}`)}
                            >
                                {firstName} {lastName}
                        </Typography> 
                        <Typography color={medium}>{friends ? friends.length : 0 } friends</Typography>       
                    </Box>
                </FlexBetween>
                {isLoggedUser && (<ManageAccountsOutlined />)}
               
            </FlexBetween>

            <Divider sx={{ margin: "1.25rem 0 0 0" }}/>

            {/* SECOND ROW */}
            <Box p="1rem 0" >
                <Box display="flex" alignItems="center" gap="Item" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{color: main} } />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="Item">
                    <WorkOutlineOutlined fontSize="large" sx={{color: main}} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider />

            {/* THIRD ROW */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight="500">
                        {viewedProfile}
                    </Typography>
                </FlexBetween>
                <FlexBetween>
                <Typography color={medium}>Impressions of your posts</Typography>
                    <Typography color={main} fontWeight="500">
                        {impressions}
                    </Typography>
                </FlexBetween>
            </Box>

            <Divider />

            {/* FOURTH ROW */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                        Social Profiles
                </Typography>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    {isLoggedUser && <EditOutlined sx={{ color: main }} />}
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linkedin
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    {isLoggedUser && <EditOutlined sx={{ color: main }} />}
                </FlexBetween>
            </Box>

            
        </WidgetWrapper>
    )
}

export default UserWidget;