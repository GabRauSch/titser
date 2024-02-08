import React, { useEffect } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import Header from "../Header";
import ChatListItem from "../ChatListItem";
import MatchListItem from "../MatchListItem";
import * as Api from "../../apis/Titser";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../reducers";
import { LoggedUser } from "../../reducers/userReducer";
import { setChatsAction } from "../../reducers/chatsReducer";
import { Chat } from '../../reducers/chatsReducer';
import { Match, setMatchesAction } from "../../reducers/matchesReducer";
import { io, Socket } from "socket.io-client";
import { backendIP, chatServicePort } from "../../apis/BackendAdress";

interface ChatListScreenProps {
  user: LoggedUser;
  chats: Chat[];
  matches: Match[];
  navigation: any;
  setChats: (payload: Chat[]) => void;
  setMatches: (payload: Match[]) => void;
}

const ChatListScreen: React.FC<ChatListScreenProps> = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const chats = await Api.retrieveChats(props.user.id)
        props.setChats(chats.data);
      } catch (error) {
        console.error("Error retrieving chats:", error)
      }

      try {
        const matches = await Api.retrieveMatches(props.user.id);
        props.setMatches(matches.data);
      } catch (error) {
        console.error('Error retrieving matches:', error);
      }
    };

    fetchData();

    const socket = io(`http//${backendIP}:${chatServicePort}`);

    socket.on("message", (newMessage: Chat) => {
      props.setChats([...props.chats, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <FlatList
          style={styles.chatList}
          data={props.chats}
          keyExtractor={(item, key) => key.toString()}
          renderItem={({ item }) => (
            <ChatListItem
              navigation={props.navigation}
              name={item.customName}
              lastMessage={item.messageContent}
              photo={item.photo}
              read={item.seen}
              direction={item.direction}
              otherUserId={item.otherUserId}
            />
          )}
        />
        {props.matches.length > 0 &&
          <View>
            <Text style={styles.matchesTitle}>Start a new conversation</Text>
            <FlatList
              horizontal
              style={styles.matchesList}
              data={props.matches}
              keyExtractor={(item, key) => key.toString()}
              renderItem={({ item }) => (
                <MatchListItem
                  navigation={props.navigation}
                  id={item.id}
                  name={item.customName}
                  photo={item.photo}
                  userIdTo={item.userIdTo}
                />
              )}
            />
          </View>
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  chatList: {
    flex: 1,
    color: "#fff",
  },
  matchesList: {
    maxHeight: 180,
    color: "#fff",
  },
  matchesTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  }
});

const mapStateToProps = (state: RootState) => ({
  user: state.userReducer.user,
  chats: state.chatsReducer.chats,
  matches: state.matchesReducer.matches
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setChats: (payload: Chat[]) => dispatch(setChatsAction(payload)),
  setMatches: (payload: Match[]) => dispatch(setMatchesAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);
