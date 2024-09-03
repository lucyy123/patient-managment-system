import { EventAvailableOutlined, HourglassEmptyOutlined, WarningAmberOutlined } from "@mui/icons-material";
import { CardsContentsType } from "../vite-env";
export const privacyContents =

[
'I consent to receive treatment for my health condition.',
'I consent to the use and disclosure of my health information for treatment purposes.',
'I acknowledge that I have reviewed and agree to the privacy policy'
]


export const dashboardCardsContent:CardsContentsType[] = [
    {
        icon:EventAvailableOutlined,
        subtitle:'Total number of scheduled appointments',
        color:'yellow'

    },
    {
        icon:HourglassEmptyOutlined,
        subtitle:'Total number of pending appointments',
        color:'#1976d2'

    },
    {
        icon:WarningAmberOutlined,
        subtitle:'Total number of cancelled appointments',
        color:'red'

    }
]