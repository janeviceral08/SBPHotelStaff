import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Button, Modal, StyleSheet, TouchableOpacity, FlatList } from "react-native";
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
export function EditCheckin({ actions, visible, closeOverlay, check_inInfo }) {
  const { tasks,rooms,goods, createTask, editCheckin } = useTasks();
  const [newMaxPerson, setNewMaxPerson] = useState(check_inInfo.max);
  const [Durationvalue, setDurationValue] = useState(null);
  const [check_in, setCheckin] = useState(check_inInfo.check_in);
  const [check_out, setCheckout] = useState(check_inInfo.check_out);
  const [Company, setCompany] = useState(check_inInfo.company);
  const [Customer, setCustomer] = useState(check_inInfo.company);
  const [Address, setAddress] = useState(check_inInfo.address);
  const [Contact, setContact] = useState(check_inInfo.contact);
  const [Nationality, setNationality] = useState(check_inInfo.nationality);
  const [Email, setEmail] = useState(check_inInfo.email);
  const [NoPerson, setNoPerson] = useState(check_inInfo.no_person);
  const [ExtraPerson, setExtraPerson] = useState(check_inInfo.extra_person);
  const [PersonWDiscount, setPersonWDiscount] = useState(check_inInfo.no_person_discount);
  const [Discount, setDiscount] = useState(check_inInfo.discount);
  const [DiscountID, setDiscountID] = useState(check_inInfo.discount_code);
  const [Note, setNote] = useState(check_inInfo.note);
  const [visibleRMModal, setvisibleRMModal] = useState(false);
  const [room_set, setRoomSet] = useState([]);
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




  return (
    <Overlay
      overlayStyle={{ width: "90%" }}
      isVisible={visible}
      onBackdropPress={closeOverlay}
    >
      <ScrollView style={{height: "80%"}}>
      <View>
   
     <Text style={styles.textTitle}>Check-in*:</Text>
     <Button title={check_in == ""?"Show Date Picker": moment(check_in).format('MMMM D, YYYY hh:mm a')} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
        <Text style={styles.textTitle}>Check-out*:</Text>
     <Button title={check_out == ""?"Show Date Picker": moment(check_out).format('MMMM D, YYYY hh:mm a')} onPress={showDatePicker_checkout} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible_checkout}
        mode="datetime"
        onConfirm={handleConfirm_checkout}
        onCancel={hideDatePicker_checkout}
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
            <Text style={styles.textTitle}>Nationality*: </Text>
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
                        onChangeText={(text) => {parseInt(text) > parseInt(newMaxPerson)? Toast.show('Maximum of '+ newMaxPerson+ ' Person'):setNoPerson(text)}}
                        value={NoPerson}
                    />
                     <Text style={styles.textTitle}>Number of Extra person/s : {newExtraPerson}</Text>
                    <TextInput
                        style={styles.textInputTitle}
                        keyboardType='numeric' 
                        autoCorrect={true}
                        onChangeText={(text) => setExtraPerson(text)}
                        value={ExtraPerson}
                    />
                    <Text style={styles.textTitle}>Number of person/s with discount</Text>
                    <TextInput
                        style={styles.textInputTitle}
                        onChangeText={(text) => setPersonWDiscount(text)}
                        keyboardType='numeric'
                        autoCorrect={true}
                        value={PersonWDiscount}
                    />
                    
                    <Text style={styles.textTitle}>Discount: </Text>
                 <TextInput
                        style={styles.textInputTitle}
                        onChangeText={(text) => setDiscount(text)}
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
            onPress={() => {
         
              editCheckin(newMaxPerson,check_in,check_out,Company,Customer,Address,Contact,Nationality,Email,NoPerson,ExtraPerson,PersonWDiscount,Discount,DiscountID,Note, check_inInfo);
            }}
          />
        {[...actions, cancelAction].map(({ title, action }) => (
       
          <ListItem
            key={title}
            title={title}
            onPress={() => {
              closeOverlay();
              action();
            }}
            
          />
        
        ))}
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
