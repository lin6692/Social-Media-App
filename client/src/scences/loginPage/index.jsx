import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Form from "./Form";
import DialogWidget from "scences/widgets/DialogWidget";

const LoginPage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState({
        title: "",
        context:"",
        button:"",
    })

    const handleDialog= () => {
        const isDialogOpen = !openDialog;
        setOpenDialog(isDialogOpen);
    }

    const handleDialogContent = (title, context, button) => {
        const newContent = {
            title, context, button
        };
        setDialogContent(newContent);
    }

    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return (
    <Box>
        <Box 
            width="100%" 
            backgroundColor={theme.palette.background.alt} 
            p="1rem 6%" 
            textAlign="center"
        >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
        >
          MySocialApp
        </Typography>
        </Box>

        <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
        >
            <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem"}}>
                Welcome to MySocialApp!
            </Typography>
            <Form 
                handleDialogCallback={handleDialog}
                handleDialogContentCallback={handleDialogContent}
            >
            </Form>
        </Box>

        <DialogWidget 
            open={openDialog} 
            handleDialogCallback={handleDialog}
            title={dialogContent.title}
            context={dialogContent.context}
            button={dialogContent.button}
        ></DialogWidget>
    </Box>
    );
};

export default LoginPage;