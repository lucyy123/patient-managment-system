import { SvgIconComponent } from '@mui/icons-material';
/// <reference types="vite/client" />

export type CardsContentsType = {
    icon:SvgIconComponent
    color:string
    subtitle:string

}

export type TableRowsType ={
    id: number;
    patient: string;
    date: string;
    status: string;
    doctor: string;
}