import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    minHeight: '100%'
  },

  likeContainerWrapper: {
    borderRadius: 10,
    margin: 10,
    width: 140,
    borderColor:'#a0f',
    borderWidth: .7, 
    justifyContent: 'center'
  },

  likeContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  actionButton: {
    position: 'absolute',
    right: 5,
    top: 2
  },
  dislikeButton: {
    position: 'absolute',
    left: 5,
    top: 2
  },
  emptyContainer: {
    fontSize: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainerText: {
    color: '#fff',
    padding: 10
  },
  likeImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },

  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 6,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  likeText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
