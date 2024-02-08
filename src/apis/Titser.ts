import axios, { AxiosError } from 'axios';
import { backendIP, backendPort } from './BackendAdress';
import { ChatMessage } from '../components/chat/ChatScreen';
import { LoggedUser } from '../reducers/userReducer';

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

const callPutEndpoint = async (url: string, body: object, queries?: string)=>{
    try {
        const finalUrl = `http://${backendIP}:${backendPort}${url}`
        const response = await axios.put(finalUrl, body)
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

export const getLikes = async (userIdTo: number, alreadyRetrievedIds: number[])=>{
    const body = {
        userIdTo,
        alreadyRetrievedIds
    }
    const response = await callPostEndpoint('/users/liked', body)
    return response
 }

export const getDislikes = async (userIdFrom: number, alreadyRetrievedIds: number[])=>{
    const body = {
        userIdFrom,
        alreadyRetrievedIds
    }
    const response = await callPostEndpoint('/users/dislikes', body);
    return response
}
export const getUserLikes = async (userIdFrom: number, alreadyRetrievedIds: number[])=>{
    const body = {
        userIdFrom,
        alreadyRetrievedIds
    }

    const response = await callPostEndpoint('/user/likes', body);
    return response
}

export const sendMessage = async (userIdFrom: number, userIdTo: number, messageContent: string)=>{
    console.log(userIdFrom, userIdTo, messageContent)
    const body = {
        userIdFrom,
        userIdTo,
        messageContent
    }
    const response = await callPostEndpoint('/message/send', body);
    return response
}

export const retrieveMessages = async (userIdFrom: number, userIdTo: number, alreadyRetrievedMessagesIds: number[])=>{
    const body = {
        userIdFrom, 
        userIdTo, 
        alreadyRetrievedMessagesIds
    }
    const response = await callPostEndpoint('/messages', body)
    return response
}
export const retrieveChats = async (userId: number)=>{
    const response = await callGetEndpoint('/messages/chats', [userId]);
    return response
}

export const retrieveMatches = async (userId: number)=>{
    const response = await callGetEndpoint('/users/matched', [userId]);
    return response
}

export const readMessages = async (userIdFrom: number, userIdTo: number)=>{
    const body = {
        userIdFrom,
        userIdTo
    }
    const response = await callPutEndpoint('/messages/read', body)
    return response
}

export const register = async (email: string, password: string, customName: string)=>{
    const body = {
        email,
        password,
        customName
    }
    const response = await callPostEndpoint('/auth/register', body);
    return response
}
export const registerConfirmation = async (customName: string, userToken: string)=>{
    const body = {
        customName,
        userToken
    }
    const response = await callPostEndpoint('/auth/registerConfirmation', body);
    return response
}
export const login = async (email: string, password: string)=>{
    const body = {
        email,
        password
    }
    const response = await callPostEndpoint('/auth/login', body)
    return response
}
export const retrieveUserData = async (userId: number)=>{
    const response = await callGetEndpoint('/user', [userId]);
        return response
}
export const checkEmailAvailability = async (email: string)=>{
    const body = {
        email
    }
    const response = await callPostEndpoint('/auth/checkEmailAvailability', body);
    return response
}