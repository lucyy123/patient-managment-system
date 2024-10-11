import { EventAvailableOutlined, HourglassEmptyOutlined, WarningAmberOutlined } from "@mui/icons-material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { AdminsType, CardsContentsType, UserRegistrationResMsg } from "../vite-env";
import axios from "axios";
export const privacyContents =

    [
        'I consent to receive treatment for my health condition.',
        'I consent to the use and disclosure of my health information for treatment purposes.',
        'I acknowledge that I have reviewed and agree to the privacy policy'
    ]


export const dashboardCardsContent: CardsContentsType[] = [
    {
        icon: EventAvailableOutlined,
        subtitle: 'Total number of scheduled appointments',
        color: 'yellow'

    },
    {
        icon: HourglassEmptyOutlined,
        subtitle: 'Total number of pending appointments',
        color: '#1976d2'

    },
    {
        icon: WarningAmberOutlined,
        subtitle: 'Total number of cancelled appointments',
        color: 'red'

    }
]


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const catchError = (error: FetchBaseQueryError, st: UserRegistrationResMsg) => {
    const data = error.data as typeof st;
    toast.error(data.message);
}


//------------------- Today Date formate -------------
const today = new Date()
const getFullYear = today.getFullYear();
const getMonth = today.getMonth() + 1
const getDate = today.getDate()
export const getTime = today.getTime()

export const formatedDate = new Date(`${getFullYear}-${getMonth}-${getDate}`)


export function convertDateFormat(dateString: string) {
    // Split the date string by '/'
    const parts = dateString.split('-');

    // Check if the parts array has the correct length
    if (parts.length !== 3) {
        throw new Error('Invalid date format. Please use YYYY/MM/DD.');
    }

    // Rearrange the parts to DD/MM/YYYY
    const convertedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return convertedDate;
}

export function convertTimeFormate(timeString: string) {
    const parts = timeString.split(":")
    let hours = Number(parts[0])
    let res;
    if (hours > 12) {
        hours = hours - 12
        return res = `${hours}:${parts[1]} PM`
    }
    res = `${hours}:${parts[1]} AM`
    return res

}


export const getAllDoctorsList = async ():Promise<AdminsType | []>   =>{
    try {
        const baseUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/admin/get/all`;
        const res = await axios.get(baseUrl)
        const data: AdminsType = await res.data.admins
        return data
    } catch (error) {
        console.log('error:', error)
        return []

    }
}