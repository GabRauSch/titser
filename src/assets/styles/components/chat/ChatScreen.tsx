import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#222'
  }, 
  header: {
    alignItems: 'center',
    marginBottom: 16,
  }, 
  headerText: {
    fontSize: 16,
    color: '#ccc'
  },
  messagesContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  myMessageText: {
    padding: 8,
    marginRight: 15,
    lineHeight: 21,
    backgroundColor: '#a0f',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 2,
    maxWidth: 300,
    fontSize: 15,
    color: 'white'
  },
  otherMessageText: {
    marginLeft: 15,
    padding: 8,
    lineHeight: 21,
    backgroundColor: '#777',
    borderTopRightRadius: 7,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 2,
    maxWidth: 300,
    fontSize: 15,
    color: 'white'
  },
  buttonContainer: {
    backgroundColor: '#a0f',
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 30
  },
  buttonText: {
    color: '#fff'

  }, 
   myMessage: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    textAlign: 'end',
  },
  otherMessage: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  profilePhoto: {
      width: 50,
      height: 60,
      borderRadius: 10,
      marginRight: 10,
      backgroundColor: 'red'
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    color: '#fff',
  },
});
