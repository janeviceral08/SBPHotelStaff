import React, { useState, useEffect } from "react";

import { Dimensions, StyleSheet, ScrollView, Image, TouchableOpacity, Button, PermissionsAndroid,Alert, BackHandler, Pressable, Modal } from 'react-native';
import { Container, Content, View, Left, Right, Icon, Card, CardItem, Badge, Text, Body, Thumbnail, Item, Input, Label, Header, SwipeRow} from 'native-base';
var {height, width } = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../Colors';
import { useTasks} from "../providers/TasksProvider";
import Toast from "react-native-simple-toast";
import { isNull } from "lodash";



export function ForConfirm({ navigation, route }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [actionSheetVisibleHour, setActionSheetVisibleHour] = useState(false);
  const [actionSheetVisiblePromoHour, setActionSheetVisiblePromoHour] = useState(false);
  const [actionSheetVisiblePromoDaily, setActionSheetVisiblePromoDaily] = useState(false);

 const { checkin, editChatroom, Booking, tasks } = useTasks();
 const [guest, setguest] = useState(checkin);
 const [dt, setDt] = useState(new Date().toLocaleString());



 
const searchData = (text) => {
  
  const newData = tasks.filter(item => {
    const itemData = item.temp_id.toUpperCase();
    const textData = text.toUpperCase();
   
    return itemData.indexOf(textData) > -1
  });
//return newData.
const newdar = tasks.find(x => x.temp_id === text)
//newData.map((info)=>

  return newdar.room_type

  }

const ChatRooom =(items)=>{


  Alert.alert(
    "Do you Want to Proceed?",
    "Are you sure you want to create chat room ?",
    [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "OK", onPress: () =>   {
        Toast.show('Please Wait A Moment')
        fetch("http://192.168.0.123/backend/insert_chatroom.php", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
      
            user_id : items._id,
      
            user_name : items.customer,
      
            room_no : items.room_no,
      
            date: moment().unix().toString(),
        })
      
          }).then((response) => response.json())
              .then((responseJson) => {
         // Showing response message coming from server after inserting records.
         editChatroom(items);
         Alert.alert(responseJson);
              }).catch((error) => {
                console.error(error);
              });
}         
}
],
{ cancelable: false }

);

 
}


const BackPage = () => {

navigation.goBack()
}

  const Details = (project) => {


          navigation.navigate("ConfirmItem", {
            checkinInfo: project.reservation_code,
          })
     };


     

  return (
    <View>
             <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
             <TouchableOpacity
        style={{marginTop: 15,left: -50}}
        onPress={BackPage}
     >
         <MaterialCommunityIcons name={'arrow-left'} size={30} color={'white'}/>
     </TouchableOpacity>
        <Text style={{marginTop: 20, fontWeight: 'bold', color: 'white'}}>To Be Confirmed Reservation</Text>
       
       </Header>
               
<ScrollView style={{marginBottom: 2}}>
              {  Booking.map((checkin, i) =>
              checkin.status == 'For Reservation'?

        <View key={i}> 
                    <Card style={{flex: 0, marginTop: 2, width: '90%', marginLeft: '5%'}} >
                                        <CardItem bordered>
                                          <TouchableOpacity    onPress={()=> Details(checkin) } style={{width: '100%'}}>
                                          <Left  style={{marginTop: -10, marginBottom: -10}}>
                                  
                                            <Body>
                                              <Text>{checkin.name}</Text>
                                              <View style={{flexDirection: 'row'}}>
                                              <Ionicons name="people-outline" size={16} color={Colors.BackColor}/>
                                              <Text note> {checkin.guest}</Text>
                                              </View>
                                            </Body>
                                          </Left>
                                       
                                          </TouchableOpacity>
                                        </CardItem>
                                        <CardItem style={{marginBottom: -12}}>
                                          
                                          <Left>
                                          <SimpleLineIcons name={'login'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 12}}>{moment(checkin.in_check * 1000).format('MMM D YYYY h:mm a')}</Text>
                                      </Left>
                                      <Body style={{ flexDirection: 'row',}}>
                                      <SimpleLineIcons name={'logout'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 12, paddingLeft: 10, paddingTop: 4}}>{moment(checkin.out_check * 1000).format('MMM D YYYY h:mm a')}</Text>
                                  </Body>
                                        
                                    
                                        </CardItem>
                                        <CardItem>
                                          
                                          <Left>
                                          <Ionicons name={'bed-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 12}}>{searchData(checkin.room)}</Text>
                                      
                                      </Left>
                               
                                      
                                    
                                        </CardItem>
                                  
                                       
                                      </Card>
                                    
                                      </View>
       
              :null)
              }
  <View style={{marginBottom: 100}}>

</View>

  </ScrollView>

    </View>
  );
}


const stylesss = StyleSheet.create({
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
height: 300,
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
  }
});

