import {StyleSheet, Dimensions} from 'react-native'
const SCREEN_WIDTH = Dimensions.get('window').width;

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    minHeight: 250,
    alignItems: "flex-start",
    shadowColor: "#000",
  width: 300,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 5,
    elevation: 2
  },
  textStyle: {
    color: "#b6a6fc",
    fontWeight: "bold",
    textAlign: "left"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
},

title:{
    width:SCREEN_WIDTH,
    backgroundColor:"#eee",
    color:"#232323",
    paddingLeft:8,
    paddingVertical:4,
    textAlign:"left"
},
wtf:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
},
name:{
    flex:1,
    textAlign:"left"
},
address:{
    flex:1,
    textAlign:"right"
}
});