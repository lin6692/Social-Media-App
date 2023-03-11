import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
      </FlexBetween>
      <a href="http://www.linkedin.com/in/linliu6660">
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/myProfile.png"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      </a>
      <FlexBetween>
        <Typography color={main}>Welcome to my social app project</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        This social website is built using the MERN stack, it leverages the power of 
        <Typography sx={{ display: 'inline', fontWeight:"bold" }}> MongoDB, Express, React, and Node.js </Typography>
        to deliver a fast, responsive, and intuitive user experience.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;