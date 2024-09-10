import { Box, Paper, Stack, Typography } from "@mui/material";

const Heading = () => {
  return (
   
    <Box>
    <Stack direction={"row"} gap={1}>
      <Paper
        elevation={2}
        sx={{
          padding: "0.2rem",
          height: "32px",
          width: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "lightgray",
        }}
      >
        <img
          src={'/logo.png'}
          alt="health_logo"
          style={{
            height: "30px",
            width: "30px",
          }}
        />
      </Paper>
      <Typography variant="h4" fontWeight={"700"} fontSize={"1.5rem"}>
        Care Plus
      </Typography>
    </Stack>
  </Box>

  )
}

export default Heading
