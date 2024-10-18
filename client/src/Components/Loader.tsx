import { Box, CircularProgress, Container } from "@mui/material"

const Loader = () => {
  return (
    <Container maxWidth = {'md'} sx={{
      height:"100vh"
    }}>
      <Box sx = {{display: 'flex', height:"100%", justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress sx={ {
        fontSize:"2.2rem",
        fontWeight:"bold"
      }} 
       />
      
      </Box>
      
    </Container>
  )
}

export default Loader
