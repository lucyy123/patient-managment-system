import { Box, Typography, useTheme } from '@mui/material'

type Props ={
    title :string,
    subtitile:string
}

const SubHeading = ({subtitile,title}:Props) => {
    const theme = useTheme()
  return (
    <Box marginTop={8}>
          <Typography variant="h4" fontSize={"2.3rem"} fontWeight={"700"}>
            {" "}
           {title} {" "}
          </Typography>
          {/* ---------------------------- sub title---------------------- */}
          <Typography
            variant="subtitle2"
            fontSize={"1rem"}
            sx={{
              color: theme.palette.text.secondary,
              mt: "0.5rem",
            }}
          >
            {" "}
           {subtitile} {" "}
          </Typography>
        </Box>
  )
}

export default SubHeading
