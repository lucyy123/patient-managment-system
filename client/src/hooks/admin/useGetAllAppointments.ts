import { useEffect, useState } from "react";
import { useGetAllAppointmentsQuery } from "../../redux/apis/adminApi";
import { DocAppointmentInitStateType, userAppointDisplayOnDashboardType } from "../../vite-env";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointments } from "../../redux/reducers/appointment";
type Props = {
  docId: string | undefined;
};

const useGetAllAppointments = ({ docId }: Props) => {
  const dispatch = useDispatch()
  const { refetch: allAppoints } = useGetAllAppointmentsQuery(docId);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await allAppoints().unwrap();
        if (res.success) {
          console.log('res.listOfAppointments.appointmentsOfUsers:', res.appointmentsOfUsers)
          dispatch(getAllAppointments(res.appointmentsOfUsers))
        } 
      } catch (error) {
        console.log("error:", error);
      }
    };
    getData();
  }, [docId, allAppoints,dispatch]);
};

export default useGetAllAppointments;
