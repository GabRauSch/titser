import axios, { AxiosError } from 'axios';
import { backendIP, backendPort } from './BackendAdress';

const callPostEndpoint = async (url: string, body: object, queries?: string)=>{
    try {
        const finalUrl = `http://${backendIP}:${backendPort}${url}`
        const response = await axios.post(finalUrl, body);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data) {
                return error.response;
            }
        }
        console.log('demonho', error)
        throw error;
    }
}

const callGetEndpoint = async (url: string, params: string[] | number[], queries?: string)=>{
    try {
        const paramsString = params.join('/');
        const finalUrl = `http://${backendIP}:${backendPort}${url}/${paramsString}`

        const response = await axios.get(finalUrl)
        return response
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
    return await callPostEndpoint('/like', body)
};
export const dislike = async (body: object)=>{
    console.log('dislike')
    return await callPostEndpoint('/dislike', body)
}

export const getUserByAgeRange = async (ageRange: [number, number])=>{
    console.log('user by age');
    return await callGetEndpoint('/users', ageRange)
}
export const fullRetrieve = async (body: object)=>{
    console.log('full retrieve');
    const response = await callPostEndpoint('/users/fullRetrieve', body)
    return response
}

export const getLikes = async (userId: number)=>{
    console.log('likes');
    const response = await callGetEndpoint('/users/liked', [userId])
    return response
}

export const getDislikes = async (userId: number)=>{
    console.log('dislikes');
    const response = await callGetEndpoint('/users/dislikes', [userId]);
    return response
}
export const getUserLikes = async (userId: number)=>{
    console.log('user likes');
    const response = await callGetEndpoint('/user/likes', [userId]);
    return response
}