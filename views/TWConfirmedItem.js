
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../Colors';
import { useTasks} from "../providers/TasksProvider";
import Toast from "react-native-simple-toast";
import styles from '../components/styles/styles';


export function TWConfirmedItem({ navigation, route }) {
 const { checkin, CancelRes, Booking, tasks, ConfirmRes, rooms, createCheckin, HourCheckin, PromoCheckin, Checked } = useTasks();
 const [guest, setguest] = useState(checkin);
 const [dt, setDt] = useState(new Date().toLocaleString());
 const checkinInfo= Booking.find(x => x.reservation_code === route.params.checkinInfo) ;

const newdar = tasks.find(x => x.temp_id === checkinInfo.room)


 const [newRoomType, setNewRoomType] = useState(newdar.room_type);
 const [newRoomPrice, setNewRoomPrice] = useState(checkinInfo.roomprice);
 const [newExtraPerson, setNewExtraPerson] = useState(newdar.extra_person_charge);
 const [newMaxPerson, setNewMaxPerson] = useState(newdar.max_person);
 const [id, setId] = useState(newdar._id);
 const [Durationvalue, setDurationValue] = useState(null);
 const [RoomID, setRoomID] = useState("");
 const [RoomFloor, setRoomFloor] = useState("");
 const [RoomName, setRoomName] = useState("");
 const [check_in, setCheckin] = useState(checkinInfo.in_check *1000);
 const [check_out, setCheckout] = useState(checkinInfo.out_check *1000);
 const [Company, setCompany] = useState("");
 const [Customer, setCustomer] = useState(checkinInfo.name);
 const [Address, setAddress] = useState(checkinInfo.address);
 const [Contact, setContact] = useState(checkinInfo.phone_no);
 const [Nationality, setNationality] = useState(checkinInfo.nationality);
 const [Email, setEmail] = useState(checkinInfo.email);
 const [NoPerson, setNoPerson] = useState(checkinInfo.guest);
 const [ExtraPerson, setExtraPerson] = useState("");
 const [PersonWDiscount, setPersonWDiscount] = useState("");
 const [Discount, setDiscount] = useState("");
 const [DiscountID, setDiscountID] = useState("");
 const [Note, setNote] = useState("");
 const [control_num, setcontrol_num] = useState("");
 const [visibleRMModal, setvisibleRMModal] = useState(false);
 const [room_set, setRoomSet] = useState([]);
 const [RoomTypeIds, setRoomTypeIds] = useState([]);
 const [RoomIDTemp, setRoomIDTemp] = useState("");
 const [Editcheckin, setEditcheckin] = useState(false);
 const [OutButton, setOutButton] = useState(true);

 const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
 const [isDatePickerVisible_checkout, setDatePickerVisibility_checkout] = useState(false);



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
      { text: "OK", onPress: () =>   {CancelRes(checkinInfo);
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
      { text: "OK", onPress: () =>   {ConfirmRes(checkinInfo)
}         
}
],
{ cancelable: false }

);

 
}

const showDatePicker = () => {
  setDatePickerVisibility(true);
 };

const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
  setCheckin(date)
  setEditcheckin(true);
  if(checkinInfo.rate_mode == 'Daily'){
  setOutButton(false)
   }
 if(checkinInfo.rate_mode == 'Hour'){
  setCheckout(moment(date).add(parseFloat(checkinInfo.hour_duration), 'hours')); setOutButton(true)
 }
 if(checkinInfo.rate_mode =='Promo' && checkinInfo.duration_mode== 'Daily'){
  setCheckout(moment(date).add(parseFloat(checkinInfo.promo_duration), 'days')); setOutButton(true)
 }
 if(checkinInfo.rate_mode =='Promo' && checkinInfo.duration_mode== 'Hour'){
  setCheckout(moment(date).add(parseFloat(checkinInfo.promo_duration), 'hours')); setOutButton(true)
 }
  hideDatePicker();
};


const showDatePicker_checkout = () => {
  setDatePickerVisibility_checkout(true);

};

const hideDatePicker_checkout = () => {
  setDatePickerVisibility_checkout(false);
};

const handleConfirm_checkout = (date) => {
  setCheckout(date)
  hideDatePicker_checkout();
};
    
const GoToIn = () =>{



const out = Editcheckin==false?  checkinInfo.rate_mode =='Daily'?moment(check_out).unix(): checkinInfo.rate_mode == 'Hour'?moment(check_in).add(parseFloat(checkinInfo.hour_duration), 'hours').unix(): checkinInfo.rate_mode =='Promo' && checkinInfo.duration_mode== 'Daily'?moment(check_in).add(parseFloat(checkinInfo.promo_duration), 'days').unix(): moment(check_in).add(parseFloat(checkinInfo.promo_duration), 'hours').unix(): moment(check_out).unix()


  if (!RoomName.trim()) {
    Toast.show('Please Choose Room no.');
    return;
  }
  Toast.show('Please Wait')
  if(checkinInfo.rate_mode == 'Daily'){
    
    createCheckin(newRoomType,newRoomPrice,newMaxPerson,id,RoomID,RoomFloor,RoomName,check_in,out*1000,Company,Customer,Address,Contact,Nationality,Email,NoPerson,ExtraPerson,PersonWDiscount,Discount,DiscountID,Note,newExtraPerson,control_num, newdar, RoomTypeIds, RoomIDTemp, checkinInfo.reservation_code, "Reservation",checkinInfo.voucher_code,
    checkinInfo.voucher_exp,
    checkinInfo.voucher_mode,
    checkinInfo.voucher_value,);
    Checked(checkinInfo)
    BackPage()
     }
   if(checkinInfo.rate_mode == 'Hour'){
    HourCheckin(newRoomType,checkinInfo.roomprice_hour,newMaxPerson,id,RoomID,RoomFloor,RoomName,check_in,out*1000,Company,Customer,Address,Contact,Nationality,Email,NoPerson,ExtraPerson,PersonWDiscount,Discount,DiscountID,Note,newExtraPerson, control_num,newdar, RoomTypeIds, RoomIDTemp, checkinInfo.reservation_code, "Reservation",checkinInfo.voucher_code,
    checkinInfo.voucher_exp,
    checkinInfo.voucher_mode,
    checkinInfo.voucher_value,);
    Checked(checkinInfo)
    BackPage()
  }
   if(checkinInfo.rate_mode =='Promo' && checkinInfo.duration_mode== 'Daily'){
    PromoCheckin(newRoomType,newRoomPrice,newMaxPerson,id,RoomID,RoomFloor,RoomName,check_in,out*1000,Company,Customer,Address,Contact,Nationality,Email,NoPerson,ExtraPerson,PersonWDiscount,Discount,DiscountID,Note,newExtraPerson,control_num, newdar,RoomTypeIds, RoomIDTemp, checkinInfo.reservation_code, "Reservation",checkinInfo.voucher_code,
    checkinInfo.voucher_exp,
    checkinInfo.voucher_mode,
    checkinInfo.voucher_value,);
    Checked(checkinInfo)
    BackPage()
   }
   if(checkinInfo.rate_mode =='Promo' && checkinInfo.duration_mode== 'Hour'){
    PromoCheckin(newRoomType,newRoomPrice,newMaxPerson,id,RoomID,RoomFloor,RoomName,check_in,out*1000,Company,Customer,Address,Contact,Nationality,Email,NoPerson,ExtraPerson,PersonWDiscount,Discount,DiscountID,Note,newExtraPerson,control_num, newdar,RoomTypeIds, RoomIDTemp, checkinInfo.reservation_code, "Reservation",checkinInfo.voucher_code,
    checkinInfo.voucher_exp,
    checkinInfo.voucher_mode,
    checkinInfo.voucher_value,);
    Checked(checkinInfo)
    BackPage()
  }



   
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
                                            <Text style={{fontSize: 14}}>{moment(checkinInfo.updatedAt * 1000).format('MMM D YYYY h:mm a')}</Text>
                                            </Left>
                                              </CardItem>
                                              <CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10, flexDirection: 'column', alignSelf: 'flex-start'}} bordered>
                                             


                                             
     <Text style={[styles.textTitle,{alignSelf: 'flex-start'}]}>Check-in*:</Text>
     <Button title={check_in == ""?"Show Date Picker": moment(check_in).format('MMMM D, YYYY hh:mm a')} onPress={showDatePicker} color={Colors.buttons}/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
        <Text style={[styles.textTitle,{alignSelf: 'flex-start'}]}>Check-out*:</Text>
     <Button title={Editcheckin==false? check_out == ""?"Show Date Picker": newdar.rate_mode =='Daily'?moment(check_out).format('MMMM D, YYYY hh:mm a'): newdar.rate_mode == 'Hour'?moment(check_in).add(parseFloat(newdar.hour_duration), 'hours').format('MMMM D, YYYY hh:mm a'): newdar.rate_mode =='Promo' && newdar.duration_mode== 'Daily'?moment(check_in).add(parseFloat(newdar.promo_duration), 'days').format('MMMM D, YYYY hh:mm a'): moment(check_in).add(parseFloat(newdar.promo_duration), 'hours').format('MMMM D, YYYY hh:mm a')
      :/**/ check_out == ""?"Show Date Picker": moment(check_out).format('MMMM D, YYYY hh:mm a')} 
     onPress={showDatePicker_checkout} color={Colors.buttons} disabled={OutButton}/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible_checkout}
        mode="datetime"
        onConfirm={handleConfirm_checkout}
        onCancel={hideDatePicker_checkout}
      />
                                             
                                             
                                             
                                             
                                             
                                              <Text style={[styles.textTitle,{alignSelf: 'flex-start'}]}>Room Number*</Text>

<Button title={RoomName==""?"Select Room Number": "Room: "+RoomName} onPress={() => {setvisibleRMModal(true)}}color={Colors.buttons} color={Colors.buttons}/>
     
                                  <Modal
                                   animationType='fade'
                                
                                    visible={visibleRMModal}
                                    onRequestClose ={() => setvisibleRMModal(false)} 
                                
                                   onBackdropPress={() => setvisibleRMModal(false)} 
                                   transparent={true}>
                           
                           
                           
                                <View style={styless.centeredView}>
                            <View style={styless.modalView}>
                            <View style={{alignSelf: 'flex-end'}}>
        <TouchableOpacity  onPress={() => setvisibleRMModal(false)}>
        <AntDesign name="closecircleo" size={20} color={"black"} />
        </TouchableOpacity>
        
      </View>
<Text style={styles.textTitle}>  Room Number: {RoomName} </Text>
                              {rooms && rooms.length > 0 ?
<FlatList

data={rooms}
showsVerticalScrollIndicator={false}
keyExtractor={item => item._id.toString()}
renderItem={({item}) =>  
item.status=="Available"&& item.room_type_id.indexOf(checkinInfo.room) >= 0?


<View style={{flexDirection: 'row', paddingLeft: 20}}>
  
<TouchableOpacity onPress={()=>{  setRoomIDTemp(item.room_id), setRoomID(item._id),setRoomFloor(item.floor),setRoomName(item.name),setRoomTypeIds(item.room_type_id), setvisibleRMModal(false) }}>
<Left style={{flexDirection:'row'}}>
              <Text note style={{ paddingRight: 20, fontSize:12, color:'black', width: 100}} numberOfLines={1}>
                 Room:  {item.name} 
              </Text>
              <Text note style={[styles.textDescription],  { color:'black', }} numberOfLines={1}>
                  {item.floor} Floor
              </Text>
          </Left>
          </TouchableOpacity>
          <Body />
          
        
</View> 
:null
 }

/> 
:null}

                            
                          
                            </View>
                          </View>
                                  </Modal>
       <Text style={{alignSelf: 'flex-start'}}>Room Price</Text>
               <TextInput
                        style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 250}]} 
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        placeholder="Room Price"
                        autoFocus={true}
                        value={checkinInfo.rate_mode =='Daily'?checkinInfo.roomprice+ '/Night': checkinInfo.rate_mode == 'Hour'?checkinInfo.roomprice_hour+ ' /'+checkinInfo.hour_duration+'Hour': checkinInfo.rate_mode =='Promo' && checkinInfo.duration_mode== 'Daily'?checkinInfo.roomprice+' /'+checkinInfo.hour_duration+'Nights': checkinInfo.promo_price_hour+' /'+checkinInfo.hour_duration+'Hours' }
                        editable = {false}
                    />    
                    <Text style={{alignSelf: 'flex-start'}}>Control Number</Text>
                    <TextInput
                                    style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 150}]}
                                    autoCorrect={true}
                                    returnKeyType={'next'}
                                    placeholder="Control Numer"
                                    autoFocus={true}
                                   value={control_num}
                                   onChangeText={(text) => setcontrol_num(text)}
                                />
                    <Text style={[styles.textTitle,{alignSelf: 'flex-start'}]}>Company Name</Text>
                    <TextInput
                        style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 150}]}
                        onChangeText={(text) => setCompany(text)}
                        autoCorrect={true}
                        value={Company}
                    />
                    <Text style={[styles.textTitle,{alignSelf: 'flex-start'}]}>Number of person/s*</Text>
                    <TextInput
                        style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 150}]}
                        keyboardType='numeric'
                        autoCorrect={true}
                        onChangeText={(text) => {parseInt(text) > parseInt(newMaxPerson)? Toast.show('Maximum of '+ newMaxPerson+ ' Person'):setNoPerson(text)}}
                        value={NoPerson}
                    />
                     <Text style={[styles.textTitle,{alignSelf: 'flex-start'}]}>Number of Extra person/s : {newExtraPerson}</Text>
                    <TextInput
                        style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 150}]}
                        keyboardType='numeric' 
                        autoCorrect={true}
                        onChangeText={(text) => setExtraPerson(text)}
                        value={ExtraPerson}
                    />
                    <Text style={[styles.textTitle,{alignSelf: 'flex-start'}]}>Number of person/s with discount</Text>
                    <TextInput
                        style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 150}]}
                        onChangeText={(text) => setPersonWDiscount(text)}
                        keyboardType='numeric'
                        autoCorrect={true}
                        value={PersonWDiscount}
                    />
                    
                    <Text style={[styles.textTitle,{alignSelf: 'flex-start'}]}>Discount: </Text>
                 <TextInput
                        style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 150}]}
                        onChangeText={(text) => setDiscount(text)}
                        placeholder={"0%"}
                        keyboardType={"number-pad"}
                        value={Discount}
                    />
                    <Text style={[styles.textTitle,{alignSelf: 'flex-start'}]}>Discount Code/I.D</Text>
                    <TextInput
                        style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 150}]}
                        onChangeText={(text) => setDiscountID(text)}
                        autoCorrect={true}
                        value={DiscountID}
                    />

                     <Text style={[styles.textTitle,{alignSelf: 'flex-start'}]}>Note</Text>
                    <TextInput
                        style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 250}]}
                        onChangeText={(text) => setNote(text)}
                        autoCorrect={true}
                        value={Note}
                    />
             
                                          
                                              </CardItem>
                                              <CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                                
                                                <TextInput
                          style={[styles.textInputTitle,{alignSelf: 'flex-start', width: 200}]} 
                          autoCorrect={true}
                          returnKeyType={'next'}
                          placeholder="Reason Of Cancel"
                          autoFocus={true}
                          onChangeText={(text) => setReasons(text)}
                      />    
                           
                                            
                                                </CardItem>
                                              <CardItem style={{marginBottom: 5, paddingTop: -15, paddingBottom: -10}}>
                                                
                                                <Left>
                                                <Button title={'Cancel'} onPress={CancelButton}  color={'#ca3433'}/>
                                            </Left>
                                            <Left>
                                                <Button
            title="Check-In"
            onPress={GoToIn}
            color={Colors.buttons}
          />
                                            </Left>
                                              
                                          
                                              </CardItem>
                                             
                                      </Card>
                                    
                                      </View>
                                      <View style={{marginBottom: 100}}>

                                      </View>
  
  </ScrollView>

    </View>
  );
}

const styless = StyleSheet.create({
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
  
      alignItems: "flex-start",
      shadowColor: "#000",
    width: 300,
    height: 400,
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

