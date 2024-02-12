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
    borderColor: 'red',
    borderWidth: 0.5,
    justifyContent: 'center'
  },

  likeContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  emptyContainer: {
    fontSize: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyContainerText: {
    color: '#fff'
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 6,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  likeText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
});

