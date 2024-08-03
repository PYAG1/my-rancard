import axios from "axios"
const baseUrl="https://test.quups.app/api"
export const SignUpMutation = (data:any) => {
    return axios.post(` ${import.meta.env.BASE_URL}/create-account`, data)
}