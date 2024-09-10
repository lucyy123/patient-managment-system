import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Stack, Typography, useTheme } from "@mui/material";

const FileUploader = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const file = [];
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

      {file && file.length > 0 ? (
        <img
          src=""
          alt="uploaded_image"
          style={{
            maxHeight: "25rem",
            overflow: "hidden",
            objectFit: "cover",
          }}
        />
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
            src={'/upload.png'}
            alt="upload_icon "
            style={{
              height: "2rem",
              width: "2rem",
              margin:'0.3rem 0rem',
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
