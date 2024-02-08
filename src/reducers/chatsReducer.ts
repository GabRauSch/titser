import { ChatMessage } from "../components/chat/ChatScreen";

export interface Chat {
    photo: string;
    customName: string;
    seen: boolean;
    messageContent: string;
    direction: string;
    messageDate: number;
    otherUserId: number;
  }
  
  interface State {
    chats: Chat[];
  }
  
  interface Action {
    type: string;
    payload?: any;
  }
  
  export const setChatsAction = (payload: Chat[]) => ({
    type: 'SET_CHATS',
    payload,
  });
  export const createNewMessageToChat = (payload: ChatMessage)=>({
    type: 'CREATE_MESSAGE',
    payload
  })
  export const readMessagesAction = (payload: number)=>({
    type: 'READ_MESSAGES',
    payload
  })
  
  const initialState: State = {
    chats: [],
  };
  
  const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
      case 'SET_CHATS':
        const newChats = action.payload;
        if (newChats) {
          const mergedChats = [...state.chats];
  
          newChats.forEach((newChat: Chat) => {
            const index = mergedChats.findIndex(chat => chat.otherUserId === newChat.otherUserId);
            if (index === -1) {
              mergedChats.push(newChat);
            } else {
              mergedChats[index] = newChat;
            }
          });
  
          return {
            ...state,
            chats: mergedChats,
          };
        }
        break;
        case 'CREATE_MESSAGE':
          const newChatMessage = action.payload;
      
          if (newChatMessage) {
              const existingChatIndex = state.chats.findIndex(chat => chat.otherUserId === newChatMessage.userIdTo);
      
              if (existingChatIndex !== -1) {
                  const updatedChat: Chat = {
                      ...state.chats[existingChatIndex],
                      messageContent: newChatMessage.messageContent,
                      messageDate: Date.now(),
                      seen: newChatMessage.seen || false,
                      direction: newChatMessage.direction || 'sent',
                  };
      
                  const updatedChats = [...state.chats];
                  updatedChats[existingChatIndex] = updatedChat;
      
                  return {
                      ...state,
                      chats: updatedChats,
                  };
              } else {
                  const newChat: Chat = {
                      otherUserId: newChatMessage.userIdTo,
                      messageContent: newChatMessage.messageContent,
                      messageDate: Date.now(),
                      seen: newChatMessage.seen || false,
                      direction: newChatMessage.direction || 'sent',
                      photo: newChatMessage.photo,
                      customName: newChatMessage.customName 
                  };
      
                  const updatedChats = [newChat, ...state.chats];
      
                  return {
                      ...state,
                      chats: updatedChats,
                  };
              }
          }
          return state;
      
      
      case 'READ_MESSAGES':
        const userIdTo = action.payload
        console.log(userIdTo)
          const mergedChats = [...state.chats];
          const index = mergedChats.findIndex(chat => chat.otherUserId === userIdTo);
          if(index != -1){
            const updatedChat: Chat = {
              ...mergedChats[index],
              seen: true            
            }
            const updatedChats = mergedChats.filter((chat, key)=> key !== index)
            updatedChats.unshift(updatedChat)
            return {
              ...state,
              chats: updatedChats
            }
          }
        break; 
      default:
        return state;
    }
    return state;
  };
  
  export default reducer;
  