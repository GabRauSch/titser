import axios, { AxiosError } from 'axios';
const callPostEndpoint = async (url: string, body: object, queries?: string)=>{
    try {
        const response = await axios.post(url , body);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data) {
                return error.response;
            }
        }
        throw error;
    }
}

const callGetEndpoint = async (url: string, params: string[] | number[], queries?: string)=>{
    try {
        const paramsString = params.join('/')
        const finalUrl = `${url}/${paramsString}`

        const response = await axios.get(finalUrl)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data) {
                return error.response;
            }
        }
        throw error;
    }
}

export const like = async (body: object) => {
    console.log('like')
    return await callPostEndpoint('http://192.168.15.154:3002/like', body)
};
export const dislike = async (body: object)=>{
    console.log('dislike')
    return await callPostEndpoint('http://192.168.15.154:3002/dislike', body)
}

export const getUserByAgeRange = async (ageRange: [number, number])=>{
    console.log('user by age');
    return await callGetEndpoint('http://192.168.15.154:3002/users', ageRange)
}
export const fullRetrieve = async (body: object)=>{
    console.log('full retrieve');
    const response = await callPostEndpoint('http://192.168.15.154:3002/users/fullRetrieve', body)
    return response
}