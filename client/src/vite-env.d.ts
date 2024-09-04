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


interface ImportMetaEnv {
    readonly VITE_FIREBASE_APIKEY: string;
    // Add other environment variables as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }