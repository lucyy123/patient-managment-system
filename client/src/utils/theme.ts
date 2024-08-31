import { createTheme } from "@mui/material";


export const theme = createTheme({
    palette: {
        primary: {
            main: '#24AE7C'

        }, 

        secondary:{
            main:"#CDCECF"
        },
        text: {
            primary: '#ffff', 
            secondary:"#ABB8C4" // ligth grey text
          },
         background: {
            default: '#131619',
        },
    }
})