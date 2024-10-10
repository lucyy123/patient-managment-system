import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { userExist } from '../redux/reducers/user';

const useGetUser = (userId: string) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/user/get`, {
                    withCredentials: true
                });
                dispatch(userExist(res.data.user))
            } catch (error) {
                console.log('error:', error)

            }
        }

        getUser()


    }, [dispatch])

}

export default useGetUser
