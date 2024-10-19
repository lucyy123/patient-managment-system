import { Logout } from "@mui/icons-material";
import { Button, useTheme } from "@mui/material";

type Position = "static" | "relative" | "absolute" | "fixed" | "sticky";

type Props = {
  dialogue: boolean;
  setDialogue: (value: React.SetStateAction<boolean>) => void;
  handleLogout: () => Promise<void>;
  Boxposition:Position ;
};

const LogoutComponent = ({ dialogue, handleLogout, setDialogue,Boxposition }: Props) => {
  const theme = useTheme();
  return (
    <>
      <Logout
        sx={{
          cursor: "pointer",
        }}
        onClick={() => setDialogue((pre) => !pre)}
      />

      <dialog
        open={dialogue}
        style={{
          position:Boxposition ,
          top: "8.5%",
          left: "calc(98% - 5rem)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              backgroundColor: "red",
              color: "white",
              textTransform: "none",
            }}
          >
            Logout
          </Button>
        </div>
      </dialog>
    </>
  );
};

export default LogoutComponent;
