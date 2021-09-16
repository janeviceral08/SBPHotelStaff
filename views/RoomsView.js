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
import { useAuth } from "../providers/AuthProvider";
export function RoomsView({ navigation, route }) {
  const {  userData } = useAuth();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [actionSheetVisibleHour, setActionSheetVisibleHour] = useState(false);
  const [actionSheetVisiblePromoHour, setActionSheetVisiblePromoHour] = useState(false);
  const [actionSheetVisiblePromoDaily, setActionSheetVisiblePromoDaily] = useState(false);

 const { checkin, editChatroom } = useTasks();
 const [guest, setguest] = useState(checkin);
 const [dt, setDt] = useState(new Date().toLocaleString());

 
const searchData = (text) => {
  
  const newData = checkin.filter(item => {
    const itemData = item.room_no.toUpperCase();
    const textData = text.toUpperCase();
   
    return itemData.indexOf(textData) > -1
  });

  setguest(newData)  
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
        fetch("http://"+userData.hotel_id+"/backend/insert_chatroom.php", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
      
            user_id : items.temp_id,
      
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


  const Details = (project) => {

   
       
    project.hour_key == ""? 
    navigation.navigate("DetailsView", {
      checkinInfo: project,
    })
    :project.hour_key == "1"? 
    navigation.navigate("HourCheckinSheet", {
      checkinInfo: project,
    })
    :project.hour_key == "Hour"?
    navigation.navigate("HourPromoCheckinSheet", {
      checkinInfo: project,
    })
    :navigation.navigate("PromoActionSheet", {
      checkinInfo: project,
    })
    
          
     };


    
    
     

  return (
    <View>
            
               <View style={{width: '100%'}}>
               <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
         <Item>
           <MaterialCommunityIcons name="book-search-outline" size={23} color={Colors.BackColor}/>
           <Input placeholder="Search Room Number" style={{borderColor: 'red'}}    onChangeText={(text) => searchData(text)}/>
           </Item>
       
       </Header>
               </View>
          
               

<ScrollView style={{marginBottom: 55}}>
              { guest && guest.length > 0 ?
              
              guest.map((checkin, i) =>
              checkin.status =="Available"?
              <View key={i}> 
              <Card style={{flex: 0, marginTop: 2, width: '90%', marginLeft: '5%'}} >
                                  <CardItem bordered>
                                  <TouchableOpacity    onPress={()=> Details(checkin) } style={{width: '100%'}}>
                                    <Left  style={{marginTop: -10, marginBottom: -10}}>
                            
                                      <Body>
                                        <Text>{checkin.customer}</Text>
                                        <View style={{flexDirection: 'row'}}>
                                        <Ionicons name="people-outline" size={16} color={Colors.BackColor}/>
                                        <Text note> {checkin.no_person}</Text>
                                        </View>
                                      </Body>
                                    </Left>
                                   
                                    </TouchableOpacity>
                                  </CardItem>
                                  <CardItem style={{marginBottom: -12, flexDirection: 'column', alignItems: 'flex-start'}}>
                                    
                                    <Body style={{ flexDirection: 'row',}}>
                                    <SimpleLineIcons name={'login'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                <Text style={{fontSize: 14,  paddingLeft: 10}}>{moment(checkin.check_in * 1000).format('MMM D, YYYY h:mm a')}</Text>
                                </Body>
                                <Body style={{ flexDirection: 'row',}}>
                                <SimpleLineIcons name={'logout'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                <Text style={{fontSize: 14, paddingLeft: 10, paddingTop: 4}}>{checkin.extension ==""?moment( checkin.check_out * 1000).format('MMM D, YYYY h:mm a'): moment(checkin.extension * 1000).format('MMM D, YYYY h:mm a')}</Text>
                            </Body>
                                  
                              
                                  </CardItem>
                                  <CardItem  bordered style={{marginBottom: 5, flexDirection: 'column'}}>
                                    
                                    <Body  style={{ flexDirection: 'row',}}>
                                    <Ionicons name={'bed-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                <Text style={{fontSize: 14,  paddingLeft: 10}}>{checkin.room_type}- {checkin.room_no}</Text>
                                
                                </Body>
                                {checkin.penalty_val == null || checkin.penalty_val == ""?
                          <Body style={{ flexDirection: 'row',}}>
                          <MaterialCommunityIcons name={'chat-alert-outline'} size={18} color={'red'} style={{ paddingTop: 5}} onPress={()=> ChatRooom(checkin)}/>
                      </Body>
                          :
<Body style={{ flexDirection: 'row',}}>
<TouchableOpacity onPress={()=> navigation.navigate('ChatDetails',{idNote: checkin.temp_id})} style={{ flexDirection: 'row',}}>
                                <MaterialCommunityIcons name={'chat-processing-outline'} size={18} color={'black'} style={{ paddingTop: 5}} onPress={()=> navigation.navigate('ChatDetails',{idNote: checkin._id})}/>
                                <Text style={{fontSize: 14, paddingLeft: 10}}>{checkin.temp_id}</Text>
                                </TouchableOpacity>
                            </Body>

                          }
                                  
                              
                                  </CardItem>
                            
                                  <CardItem  style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                    
                                    <Left>
                                    <Foundation name={'clipboard-notes'} size={18} color={'black'} />
                                <Text style={{fontSize: 14, color: Colors.BackColor}}>Note: </Text>
                                <Text style={{fontSize: 14}}>{checkin.note}</Text>
                                </Left>
                                
                                  
                              
                                  </CardItem>
                                </Card>
                            
                                </View>
       :null
              ): checkin.map((checkin, i) =>
              checkin.status =="Available"?
              <View key={i}> 
              <Card style={{flex: 0, marginTop: 2, width: '90%', marginLeft: '5%'}} >
                                  <CardItem bordered>
                                  <TouchableOpacity    onPress={()=> Details(checkin) } style={{width: '100%'}}>
                                    <Left  style={{marginTop: -10, marginBottom: -10}}>
                            
                                      <Body>
                                        <Text>{checkin.customer}</Text>
                                        <View style={{flexDirection: 'row'}}>
                                        <Ionicons name="people-outline" size={16} color={Colors.BackColor}/>
                                        <Text note> {checkin.no_person}</Text>
                                        </View>
                                      </Body>
                                    </Left>
                                   
                                    </TouchableOpacity>
                                  </CardItem>
                                  <CardItem style={{marginBottom: -12, flexDirection: 'column', alignItems: 'flex-start'}}>
                                    
                                    <Body style={{ flexDirection: 'row',}}>
                                    <SimpleLineIcons name={'login'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                <Text style={{fontSize: 14,  paddingLeft: 10}}>{moment(checkin.check_in * 1000).format('MMM D, YYYY h:mm a')}</Text>
                                </Body>
                                <Body style={{ flexDirection: 'row',}}>
                                <SimpleLineIcons name={'logout'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                <Text style={{fontSize: 14, paddingLeft: 10, paddingTop: 4}}>{checkin.extension ==""?moment( checkin.check_out * 1000).format('MMM D, YYYY h:mm a'): moment(checkin.extension * 1000).format('MMM D, YYYY h:mm a')}</Text>
                            </Body>
                                  
                              
                                  </CardItem>
                                  <CardItem  bordered style={{marginBottom: 5, flexDirection: 'column'}}>
                                    
                                    <Body  style={{ flexDirection: 'row',}}>
                                    <Ionicons name={'bed-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                <Text style={{fontSize: 14,  paddingLeft: 10}}>{checkin.room_type}- {checkin.room_no}</Text>
                                
                                </Body>
                                {checkin.penalty_val == null || checkin.penalty_val == ""?
                          <Body style={{ flexDirection: 'row',}}>
                          <MaterialCommunityIcons name={'chat-alert-outline'} size={18} color={'red'} style={{ paddingTop: 5}} onPress={()=> ChatRooom(checkin)}/>
                      </Body>
                          :
<Body style={{ flexDirection: 'row',}}>
  <TouchableOpacity onPress={()=> navigation.navigate('ChatDetails',{idNote: checkin.temp_id})} style={{ flexDirection: 'row',}}>
                                <MaterialCommunityIcons name={'chat-processing-outline'} size={18} color={'black'} style={{ paddingTop: 5}} onPress={()=> navigation.navigate('ChatDetails',{idNote: checkin._id})}/>
                                <Text style={{fontSize: 14, paddingLeft: 10}}>{checkin.temp_id}</Text>
                                </TouchableOpacity>
                            </Body>

                          }
                                  
                              
                                  </CardItem>
                            
                                  <CardItem  style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                    
                                    <Left>
                                    <Foundation name={'clipboard-notes'} size={18} color={'black'} />
                                <Text style={{fontSize: 14, color: Colors.BackColor}}>Note: </Text>
                                <Text style={{fontSize: 14}}>{checkin.note}</Text>
                                </Left>
                                
                                  
                              
                                  </CardItem>
                                </Card>
                            
                                </View>
             :null
                    )
              }
  
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

