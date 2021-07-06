import ajax from './ajax'
import { BASE_URL } from '../utils/constants'

export const reqLogin = (role,email,password) => ajax( BASE_URL+'/login',{role,email,password}, 'POST' )
