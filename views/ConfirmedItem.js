import React, { useState, useEffect } from "react";

import { Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity, Button, PermissionsAndroid,Alert, BackHandler, Pressable, Modal, FlatList } from 'react-native';
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
import styles from '../components/styles/styles';


export function ConfirmedItem({ navigation, route }) {
 const { checkin, CancelRes, Booking, tasks, ConfirmRes } = useTasks();
 const [guest, setguest] = useState(checkin);
 const [dt, setDt] = useState(new Date().toLocaleString());
 const [Reason, setReasons] = useState("");
const checkinInfo= Booking.find(x => x.reservation_code === route.params.checkinInfo) ;
 
const newdar = tasks.find(x => x.temp_id === checkinInfo.room)
//return newData.


const CancelButton =()=>{


  Alert.alert(
    "This Process Cannot be Undone.",
    "Are you sure you want to CANCEL the Reservation?",
    [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "OK", onPress: () =>   {
        if(!Reason.trim()){
          Toast.show('Please Declare Reason of Cancellation')
        }else{
          Toast.show('Please Wait')
 CancelRes(checkinInfo, Reason);
 BackPage();


        }
        
       
}         
}
],
{ cancelable: false }

);

 
}



const ConfirmButton =()=>{


  Alert.alert(
    "Make sure to Contact the Guest.",
    "Are you sure you want to CONFIRM the Reservation?",
    [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "OK", onPress: () =>   { 
        if(!Reason.trim()){
          Toast.show('Please Declare Reason of Cancellation')
        }
  
}         
}
],
{ cancelable: false }

);

 
}
    
const BackPage = () => {
  navigation.goBack()
  }    
     

  return (
    <View>
                  <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
            <TouchableOpacity
                style={{marginTop: 15,left: -70}}
                onPress={BackPage}
             >
                 <MaterialCommunityIcons name={'arrow-left'} size={30} color={'white'}/>
             </TouchableOpacity>
        <Text style={{marginTop: 20, fontWeight: 'bold', color: 'white'}}>Reservation Details</Text>
       
       </Header>
               
<ScrollView style={{marginBottom: 2}}>
              
        <View> 
                    <Card style={{flex: 0, marginTop: 10, width: '90%', marginLeft: '5%'}} >
                                        <CardItem bordered>
                                          <TouchableOpacity    onPress={()=> Details(checkin) } style={{width: '100%'}}>
                                          <Left  style={{marginTop: -10, marginBottom: -10}}>
                                          <Body>
                                              <Text>{checkinInfo.name}</Text>
                                              <View style={{flexDirection: 'row'}}>
                                              <Ionicons name="people-outline" size={16} color={Colors.BackColor}/>
                                              <Text note> {checkinInfo.guest}</Text>
                                              </View>
                                            </Body>
                                          </Left>
                                        
                                          </TouchableOpacity>
                                        </CardItem>
                                        <CardItem style={{marginBottom: -12}}>
                                          <Left>
                                          <SimpleLineIcons name={'login'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{moment(checkinInfo.in_check * 1000).format('MMM D YYYY h:mm a')}</Text>
                                      </Left>
                                        </CardItem>
                                        <CardItem style={{marginBottom: -12}}>
                                      <Body style={{ flexDirection: 'row',}}>
                                      <SimpleLineIcons name={'logout'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14, paddingLeft: 10, paddingTop: 4}}>{moment(checkinInfo.out_check * 1000).format('MMM D YYYY h:mm a')}</Text>
                                  </Body>
                                        </CardItem>
                                        <CardItem>
                                          <Left>
                                          <Ionicons name={'mail-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{checkinInfo.email}</Text>
                                      </Left>
                                        </CardItem>
                                        <CardItem>
                                      <Body style={{ flexDirection: 'row',}}>
                                          <Ionicons name={'call-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{checkinInfo.phone_no}</Text>
                                      </Body>
                                        </CardItem>
                                        <CardItem>
                                          <Left>
                                          <Ionicons name={'ios-people-circle-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{checkinInfo.nationality}</Text>
                                      </Left>
                                        </CardItem>
                                        <CardItem>
                                      <Body style={{ flexDirection: 'row',}}>
                                          <Ionicons name={'md-location-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{checkinInfo.address}</Text>
                                      </Body>
                                        </CardItem>
                                        <CardItem bordered>
                                          <Left>
                                          <Ionicons name={'card-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{checkinInfo.mode}</Text>
                                      </Left>
                                      <Body style={{ flexDirection: 'row',}}>
                                          <Ionicons name={'bed-outline'} size={18} color={'black'} style={{ paddingTop: 5}}/>
                                      <Text style={{fontSize: 14}}>{newdar.room_type}</Text>
                                      </Body>
                                        </CardItem>
                                        
                                        {checkinInfo.voucher_mode === ''? null
                                        :<View><CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                                <Left>
                                                <Foundation name={'clipboard-notes'} size={18} color={'black'} />
                                            <Text style={{fontSize: 14, color: Colors.BackColor}}>Voucher Code: </Text>
                                            <Text style={{fontSize: 14}}>{checkinInfo.voucher_code}</Text>
                                            </Left>
                                              </CardItem>
                                              <CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                            <Left style={{flexDirection: 'row'}}>
                                                <Ionicons name={'ellipsis-horizontal-circle'} size={18} color={'black'} />
                                            <Text style={{fontSize: 14, color: Colors.BackColor}}>Voucher Value: </Text>
                                            <Text style={{fontSize: 14}}>{checkinInfo.voucher_value}{checkinInfo.voucher_mode === 'Percentage'?'%':null}</Text>
                                            </Left>
                                              </CardItem>
                                              <CardItem bordered style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                                
                                                <Left>
                                                <Foundation name={'clipboard-notes'} size={18} color={'black'} />
                                            <Text style={{fontSize: 14, color: Colors.BackColor}}>Expiration Date: </Text>
                                            <Text style={{fontSize: 14}}>{moment(checkinInfo.voucher_exp * 1000).format('MMM D, YYYY h:mm a')}</Text>
                                            </Left>
                                              </CardItem>
                                              </View>
                                              }
                                  
                                        <CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                                <Left>
                                                <Foundation name={'clipboard-notes'} size={18} color={'black'} />
                                            <Text style={{fontSize: 14, color: Colors.BackColor}}>Resv.: </Text>
                                            <Text style={{fontSize: 14}}>{checkinInfo.reservation_code}</Text>
                                            </Left>
                                              </CardItem>
                                              <CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                            <Left style={{flexDirection: 'row'}}>
                                                <Ionicons name={'ellipsis-horizontal-circle'} size={18} color={'black'} />
                                            <Text style={{fontSize: 14, color: Colors.BackColor}}>Status: </Text>
                                            <Text style={{fontSize: 14}}>{checkinInfo.status}</Text>
                                            </Left>
                                              </CardItem>
                                              <CardItem bordered style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                                
                                                <Left>
                                                <Foundation name={'clipboard-notes'} size={18} color={'black'} />
                                            <Text style={{fontSize: 14, color: Colors.BackColor}}>Date Booked.: </Text>
                                            <Text style={{fontSize: 14}}>{moment(checkinInfo.updatedAt * 1000).format('MMM D, YYYY h:mm a')}</Text>
                                            </Left>
                                              </CardItem>

                                              <CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                                
                                                <Left>
                                                <Button title={'Cancel'} onPress={CancelButton}  color={'#ca3433'}/>
                                            </Left>
                                       
               <TextInput
                        style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 200}]} 
                        autoCorrect={true}
                        returnKeyType={'next'}
                        placeholder="Reason Of Cancel"
                        autoFocus={true}
                        onChangeText={(text) => setReasons(text)}
                    />    
                                              
                                          
                                              </CardItem>
                                             
                                      </Card>
                                    
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

