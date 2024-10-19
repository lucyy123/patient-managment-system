import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userExist, userNotExist } from '../redux/reducers/user';

const useGetUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getUser = async () => {
            try {
                const baseUrl = `${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/user/get`
                const res = await axios.get(baseUrl, {
                    withCredentials: true
                });
                dispatch(userExist(res.data.user))
            } catch (error) {
                dispatch(userNotExist())
                console.log('error:', error)

            }
        }

        getUser()
    }, [dispatch])




}

export default useGetUser
