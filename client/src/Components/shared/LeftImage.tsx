import { Box } from "@mui/material"

type Props ={
    image:string
} 

const LeftImage = ({image}:Props) => {
  return (
    <Box flex={1}>
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={image}
        alt="patients_image"
        style={{
          height: "99%",
          width: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  </Box>
  )
}

export default LeftImage
