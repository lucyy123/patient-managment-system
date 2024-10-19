import { Stack, Typography, useTheme } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  file: File | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
};

const FileUploader = ({ file, setFile }: Props) => {
  const onDrop = useCallback((acceptedFiles:File[]) => {
    console.log("acceptedFiles:", acceptedFiles[0]);
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const theme = useTheme();

  return (
    <div
      {...getRootProps()}
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        border: "1px dashed",
        borderRadius: "8px",
      }}
    >
      <input {...getInputProps()} />

      {file ? (
        <Stack direction={"row"} gap={5} alignItems={"center"}>
          <Typography variant="subtitle1" fontWeight={"bold"}>
            File Name
          </Typography>
          <Typography variant="subtitle2"> {file.name}</Typography>
        </Stack>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // gap: "1rem",
          }}
        >
          <img
            src={"/upload.png"}
            alt="upload_icon "
            style={{
              height: "2rem",
              width: "2rem",
              margin: "0.3rem 0rem",
            }}
          />

          <Stack direction={"row"} gap={1}>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "500",
              }}
            >
              Click to upload
            </Typography>
            <Typography
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              {" "}
              or drag and drop
            </Typography>
          </Stack>

          <Typography
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            {" "}
            SVG,PNG,JPG or GIF (max.800x400px)
          </Typography>
        </div>
      )}
    </div>
  );
};
export default FileUploader;
