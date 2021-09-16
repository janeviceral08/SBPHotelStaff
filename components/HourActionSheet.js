import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Button, Modal, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { Left, Body, Right, List } from 'native-base';
import { ListItem, Overlay, Input, Text} from "react-native-elements";
import { Picker } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles/styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTasks } from "../providers/TasksProvider";
import nationality from './nationality.json'
import Colors from './styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import Toast from "react-native-simple-toast";
// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
export function HourActionSheet({ visible, closeOverlay, roomTypeInfo }) {
  const { tasks,rooms,goods, createTask, HourCheckin, Booking } = useTasks();
  const [newRoomType, setNewRoomType] = useState(roomTypeInfo.room_type);
  const [newRoomPrice, setNewRoomPrice] = useState(roomTypeInfo.roomprice_hour);
  const [newExtraPerson, setNewExtraPerson] = useState(roomTypeInfo.extra_person_charge);
  const [newMaxPerson, setNewMaxPerson] = useState(roomTypeInfo.max_person);
  const [id, setId] = useState(roomTypeInfo._id);
  const [Durationvalue, setDurationValue] = useState(null);
  const [RoomID, setRoomID] = useState("");
  const [RoomFloor, setRoomFloor] = useState("");
  const [RoomName, setRoomName] = useState("");
  const [check_in, setCheckin] = useState("");
  const [check_out, setCheckout] = useState("");
  const [Company, setCompany] = useState("");
  const [Customer, setCustomer] = useState("");
  const [Address, setAddress] = useState("");
  const [Contact, setContact] = useState("");
  const [Nationality, setNationality] = useState("");
  const [Email, setEmail] = useState("");
  const [NoPerson, setNoPerson] = useState("");
  const [ExtraPerson, setExtraPerson] = useState("");
  const [PersonWDiscount, setPersonWDiscount] = useState("");
  const [Discount, setDiscount] = useState("");
  const [DiscountID, setDiscountID] = useState("");
  const [Note, setNote] = useState("");
  const [visibleRMModal, setvisibleRMModal] = useState(false);
  const [room_set, setRoomSet] = useState([]);
  const [RoomTypeIds, setRoomTypeIds] = useState([]);
  const [control_num, setcontrol_num] = useState("");
  const [RoomIDTemp, setRoomIDTemp] = useState("");
  const [roomNote, setroomNote] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible_checkout, setDatePickerVisibility_checkout] = useState(false);


 
  const cancelAction = {
    title: "Cancel",
    action: closeOverlay,
  };
  

  const getRooms = () => {
  
      const tngCharacters = rooms.filter(room => room.room_type_id.includes(id));


  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
 
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setCheckin(date)
    var returned_endate = moment(date).add(parseInt(roomTypeInfo.hour_duration), 'hours');
  
    setCheckout(returned_endate)
    hideDatePicker();
    const newdar = Booking.filter(x =>  x.in_check >= moment(date).unix()&& x.in_check <= moment(returned_endate).unix() && x.status =='Confirmed'&& x.room ==roomTypeInfo.temp_id)


    if(newdar.length > 0){

      Alert.alert(
        "WARNING!",
        "There are "+ newdar.length+ " reservation on the same day. Allocate a room for them",
        [
         
          { text: "OK", onPress: () =>  null
    }
    ],
    { cancelable: false }
    
    );
    

    }
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
      if( check_in == "" && Customer == "" && Address == "" || Contact == ""  || Nationality == "" || NoPerson == "" ||  RoomID == "" ){
        Toast.show('Please Complete All the Fields')
       
      }
    else{
      HourCheckin(newRoomType,newRoomPrice,newMaxPerson,id,RoomID,RoomFloor,RoomName,check_in,check_out,Company,Customer,Address,Contact,Nationality,Email,NoPerson,ExtraPerson,PersonWDiscount,Discount,DiscountID,Note,newExtraPerson, control_num,roomTypeInfo, RoomTypeIds, RoomIDTemp,"","Over The Counter","",
      0,"", 0,);
      setRoomID(""),setRoomFloor(""),setRoomName("")
    }
      }

  return (
    <Overlay
      overlayStyle={{ width: "90%" }}
      isVisible={visible}
      onBackdropPress={closeOverlay}
    >
      <ScrollView style={{height: "80%"}}>
      <View>
        <Text>Room Type</Text>
        <TextInput
                        style={styles.textInputTitle}
                        autoCorrect={true}
                        returnKeyType={'next'}
                        placeholder="Room Type"
                        autoFocus={true}
                       value={newRoomType}
                       editable = {false}
                    />
     <Text style={styles.textTitle}>Check-in*:</Text>
     <Button title={check_in == ""?"Show Date Picker": moment(check_in).format('MMMM D, YYYY hh:mm a')} onPress={showDatePicker} color={Colors.buttons}/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
        <Text style={styles.textTitle}>Check-out*:</Text>
     <Button title={check_out == ""?"Show Date Picker": moment(check_out).format('MMMM D, YYYY hh:mm a')} color={'gray'}/>
 
      

      <Text style={styles.textTitle}>Room Number*</Text>

<Button title={RoomName==""?"Select Room Number": "Room: "+RoomName} onPress={() => {setvisibleRMModal(true)}} color={Colors.buttons} />
     
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
item.status=="Available" && item.room_type_id.indexOf(roomTypeInfo.temp_id) >= 0?
<View style={{flexDirection: 'row', paddingLeft: 20}}>
<TouchableOpacity onPress={()=>{setroomNote(item.note), setRoomIDTemp(item.room_id), setRoomID(item._id),setRoomFloor(item.floor),setRoomName(item.name),setRoomTypeIds(item.room_type_id), setvisibleRMModal(false) }}>
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
          
        
</View> : null
}

/> 
:null}

                            
                          
                            </View>
                          </View>
                                  </Modal>
       <Text>Room Price</Text>
               <TextInput
                        style={styles.textInputTitle} 
                        autoCorrect={true}
                        keyboardType='numeric'
                        returnKeyType={'next'}
                        autoFocus={true}
                        value={newRoomPrice}
                        editable = {false}
                    />
                          <Text>Room Note</Text>
               <TextInput
                        style={styles.textInputTitle} 
                        placeholder="Room Note"
                        autoFocus={true}
                        value={roomNote}
                        multiline={true}
                        editable = {false}
                    />    
                    <Text>Control Number</Text>
                    <TextInput
                                    style={styles.textInputTitle}
                                    autoCorrect={true}
                                    returnKeyType={'next'}
                                    placeholder="Control Numer"
                                    autoFocus={true}
                                   value={control_num}
                                   onChangeText={(text) => setcontrol_num(text)}
                                />
                    <Text style={styles.textTitle}>Company Name</Text>
                    <TextInput
                        style={styles.textInputTitle}
                        onChangeText={(text) => setCompany(text)}
                        autoCorrect={true}
                        value={Company}
                    />
                    <Text style={styles.textTitle}>Customer Name*</Text>
                    <TextInput
                        style={styles.textInputTitle}
                       onChangeText={(text) => setCustomer(text)}
                        autoCorrect={true}
                        value={Customer}
                    />
                    <Text style={styles.textTitle}>Address*</Text>
                    <TextInput
                        style={styles.textInputTitle}
                        onChangeText={(text) => setAddress(text)}
                        autoCorrect={true}
                        value={Address}
                    />
                    <Text style={styles.textTitle}>Contact No.*</Text>
                    <TextInput
                        style={styles.textInputTitle}
                        onChangeText={(text) => setContact(text)}
                        keyboardType={'phone-pad'}
                        returnKeyType={'done'}
                        autoCorrect={true}
                        value={Contact}
                    />
            <Text style={styles.textTitle}>Nationality*: {Nationality}</Text>
            <Picker
              mode='dialog'
              placeholder="Select your Nationality"
              onValueChange={(itemValue, itemIndex) => setNationality(itemValue)}
              style={[styles.textInputTitle, { width: '100%' }]}
              //selectedValue={this.state.selected}
             // onValueChange={this.onValueChange.bind(this)}
            >
              {
                   nationality.map(person => ( <Picker.Item label={person.en_short_name} value={person.en_short_name} key={person.en_short_name} /> ))
              }
            </Picker>
           
<Text style={styles.textTitle}>E-mail</Text>
                    <TextInput
                        style={styles.textInputTitle}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType={'email-address'}
                        returnKeyType={'next'}
                        autoCorrect={true}
                        value={Email}
                    />
                    <Text style={styles.textTitle}>Number of person/s*</Text>
                    <TextInput
                        style={styles.textInputTitle}
                        keyboardType='numeric'
                        autoCorrect={true}
                        onChangeText={(text) => {isNaN(text)? null:parseInt(text) > parseInt(newMaxPerson)? Toast.show('Maximum of '+ newMaxPerson+ ' Person'):setNoPerson(text)}}
                        value={NoPerson}
                    />
                     <Text style={styles.textTitle}>Number of Extra person/s : {newExtraPerson}</Text>
                    <TextInput
                        style={styles.textInputTitle}
                        keyboardType='numeric' 
                        autoCorrect={true}
                        onChangeText={(text) => {isNaN(text)? null:setExtraPerson(text)}}
                        value={ExtraPerson}
                    />
                    <Text style={styles.textTitle}>Number of person/s with discount</Text>
                    <TextInput
                        style={styles.textInputTitle}
                        onChangeText={(text) => {isNaN(text)? null:setPersonWDiscount(text)}}
                        keyboardType='numeric'
                        autoCorrect={true}
                        value={PersonWDiscount}
                    />
                    
                    <Text style={styles.textTitle}>Discount: </Text>
                 <TextInput
                        style={styles.textInputTitle}
                        onChangeText={(text) => {isNaN(text)? null:setDiscount(text)}}
                        placeholder={"0%"}
                        keyboardType={"number-pad"}
                        value={Discount}
                    />
                    <Text style={styles.textTitle}>Discount Code/I.D</Text>
                    <TextInput
                        style={styles.textInputTitle}
                        onChangeText={(text) => setDiscountID(text)}
                        autoCorrect={true}
                        value={DiscountID}
                    />

                     <Text style={styles.textTitle}>Note</Text>
                    <TextInput
                        style={styles.textInputTitle}
                        onChangeText={(text) => setNote(text)}
                        autoCorrect={true}
                        value={Note}
                    />
             
          <Button
            title="Check-In"
            onPress={GoToIn}
            color={Colors.buttons}
          />
      
      </View>
      </ScrollView>
    </Overlay>
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
