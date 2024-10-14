import { useEffect, useState } from "react";
import { useGetAllAppointmentsQuery } from "../../redux/apis/adminApi";
import { userAppointDisplayOnDashboardType } from "../../vite-env";
type Props = {
  docId: string | undefined;
};

const useGetAllAppointments = ({ docId }: Props) => {
  const [list, setList] = useState<userAppointDisplayOnDashboardType[]>();

  const { refetch: allAppoints } = useGetAllAppointmentsQuery(docId);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await allAppoints().unwrap();
        if (res.success) {
          setList(res.appointmentsOfUsers);
          console.log('res.listOfAppointments.appointmentsOfUsers:', res.appointmentsOfUsers)
        } else {
          setList([]);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    getData();
  }, [docId, allAppoints]);

  return list;
};

export default useGetAllAppointments;
