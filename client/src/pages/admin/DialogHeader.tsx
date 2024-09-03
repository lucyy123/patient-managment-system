import { Close } from "@mui/icons-material";
import {
  Box,
  DialogTitle,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Dispatch } from "react";

type Props = {
  title: string;
  subtitle: string;
  handelOpen: Dispatch<React.SetStateAction<boolean>>;
};

const DialogHeader = ({ subtitle, title, handelOpen }: Props) => {
  const theme = useTheme();

  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Box>
          <Typography fontSize={"1.3rem"}>{title}</Typography>
          <Typography
            variant="body2"
            fontSize={"0.8rem"}
            sx={{
              color: theme.palette.text.secondary,
              marginTop: "0.36rem",
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handelOpen(false)}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>
    </>
  );
};

export default DialogHeader;
