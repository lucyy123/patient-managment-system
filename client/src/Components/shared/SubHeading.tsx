import { Box, Typography, useTheme } from '@mui/material'

type Props ={
    title :string,
    subtitile:string
    margintop?:number
}

const SubHeading = ({subtitile,title,margintop = 8}:Props) => {
    const theme = useTheme()
  return (
    <Box marginTop={margintop}>
          <Typography variant="h4" fontSize={{xs:'1.8rem',md:"2.3rem"}} fontWeight={"700"}>
            {" "}
           {title} {" "}
          </Typography>
          {/* ---------------------------- sub title---------------------- */}
          <Typography
            variant="subtitle2"
            fontSize={{xs:"0.7rem",md:'1rem'}}
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
