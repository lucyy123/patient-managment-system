import { useDispatch } from 'react-redux'
import axios from 'axios';
import { userExist, userNotExist } from '../redux/reducers/user';

const useGetUser = () => {
    const dispatch = useDispatch()


    const getUser = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/user/get`, {
                withCredentials: true
            });
            dispatch(userExist(res.data.user))
        } catch (error) {
            dispatch(userNotExist())
            console.log('error:', error)

        }
    }

    getUser()



}

export default useGetUser
