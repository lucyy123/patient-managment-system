import { Stack, Typography } from "@mui/material";
import { dashboardCardsContent } from "../utils/constants";
import { CardsContentsType } from "../vite-env";

type Props = {
  cancelled: number | undefined;
  pending: number | undefined;
  scheduled: number | undefined;
};

const AppointmentCard = ({ cancelled, pending, scheduled }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        // gap:3
        width: "100%",
      }}
    >
      {dashboardCardsContent.map((ele:CardsContentsType, idx) => {
        let number;

        if (ele.color == "yellow") {
          number = pending;
        } else if (ele.color == "red") {
          number = cancelled;
        } else {
          number = scheduled;
        }

        return (
          <div key={idx} className="appointmentCard">
            <Stack gap={2}>
              <Stack
                direction={"row"}
                gap={1}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <ele.icon
                  sx={{
                    fontSize: "2rem",
                    color: ele.color,
                    // boxShadow:'0px 0px 150px 18px  yellow',
                    filter: `drop-shadow(0px 0px 20px ${ele.color})`,
                    // transform: 'scaleY(-1)',

                    backgroundColor: "transparent",
                  }}
                />
                <Typography variant="h6" fontSize={"1.6rem"} fontWeight={800}>
                  {number}
                </Typography>
              </Stack>
              <Typography variant="h6" fontSize={"1rem"} fontWeight={800}>
                {ele.subtitle}
              </Typography>
            </Stack>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentCard;
