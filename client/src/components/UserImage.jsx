import { Box } from "@mui/material";

const UserImage = ({ image, size="60px" }) => {
    const path = `https://social-media-server-25d3.onrender.com/assets/${image}`
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%"}} 
                width={size}
                height={size}
                alt="user"
                src={path}
            />
        </Box>
    );
};

export default UserImage;