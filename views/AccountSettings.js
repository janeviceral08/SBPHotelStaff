import React, { useState, useEffect } from "react";
import { View, ScrollView, TextInput, Button, Modal, StyleSheet, TouchableOpacity, FlatList,Alert } from "react-native";
import { Left, Body, Right, List } from 'native-base';
import { ListItem, Overlay, Input, Text} from "react-native-elements";
import { Picker } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../components/styles/styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTasks } from "../providers/TasksProvider";
import Colors from '../components/styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import Toast from "react-native-simple-toast";
import { useAuth } from "../providers/AuthProvider";
import Loader from '../components/styles/Loader'

export function AccountSettings({ navigation }) {
  const { userData, EditUser } = useAuth();
const [full_name, setfull_name]= useState(userData.full_name)
const [address, setaddress]= useState(userData.address)
const [gender, setgender]= useState(userData.gender)
const [age, setage]= useState(userData.age)
const [hotel_id, sethotel_id]= useState(userData.hotel_id)
const [hot_name, sethot_name]= useState(userData.hot_name)
const [hot_mobile, sethot_mobile]= useState(userData.hot_mobile)
const [hotel_tel, sethotel_tel]= useState(userData.hotel_tel)
const [hotel_email, sethotel_email]= useState(userData.hotel_email)
const [hot_address, sethot_address]= useState(userData.hot_address)
const [hot_website, sethot_website]= useState(userData.hot_website)
const [Loading, setLoading] = useState(false);



const UpdateUser = async () =>{
//userData,full_name,address,gender,age

try {
  setLoading(true)
  await  EditUser(userData.name,full_name,address,gender,age,hotel_id,hot_name,hot_mobile,hotel_tel,hotel_email,hot_address,hot_website);
  setLoading(false)
} catch (err) {
  setLoading(false)
  Alert.alert("An error occurred while Updating", err.message);
}
}


  return (
    <View>
<ScrollView>
     <Loader loading={Loading} />
   
    
        <View style={{margin: 10}}> 
<Text>Email</Text>
       <TextInput
                       style={styles.textInputTitle}
                       autoCorrect={true}
                       returnKeyType={'next'}
                       placeholder="Email"
                       autoFocus={true}
                       editable={false}
                       value={userData.name}
                   />
                  
                   <Text>Full Name</Text>
       <TextInput
                       style={styles.textInputTitle}
                       autoCorrect={true}
                       returnKeyType={'next'}
                       placeholder="Email"
                       autoFocus={true}
                       defaultValue={userData.full_name}
                       onChangeText={(text) => setfull_name(text)}
                   />
                     <Text>Address</Text>
       <TextInput
                       style={styles.textInputTitle}
                       autoCorrect={true}
                       returnKeyType={'next'}
                       placeholder="Email"
                       autoFocus={true}
                       defaultValue={userData.address}
                       onChangeText={(text) => setaddress(text)}
                   />
                     <Text>Gender</Text>
       <TextInput
                       style={styles.textInputTitle}
                       autoCorrect={true}
                       returnKeyType={'next'}
                       placeholder="Email"
                       autoFocus={true}
                       defaultValue={userData.gender}
                       onChangeText={(text) => setgender(text)}
                   />
                     <Text>Age</Text>
       <TextInput
                       style={styles.textInputTitle}
                       autoCorrect={true}
                       returnKeyType={'next'}
                       placeholder="Email"
                       autoFocus={true}
                       
                       defaultValue={userData.age}
                       onChangeText={(text) => setage(text)}
                   />
                               <Text>Business Name</Text>
       <TextInput
                       style={styles.textInputTitle}
                       placeholder="Business Name"
                       defaultValue={userData.hot_name}
                       onChangeText={(text) => sethot_name(text)}
                   />
                     <Text>Business Address</Text>
       <TextInput
                       style={styles.textInputTitle}
                       placeholder="Business Address"
                       defaultValue={userData.address}
                       onChangeText={(text) => sethot_address(text)}
                   />
              
                    <Text>Business Mobile Number</Text>
       <TextInput
                       style={styles.textInputTitle}
                       keyboardType={'number-pad'}
                       placeholder="Business Mobile Number"
                       defaultValue={userData.hot_mobile}
                       onChangeText={(text) => sethot_mobile(text)}
                   />
                    <Text>Business Telephone Number</Text>
       <TextInput
                       style={styles.textInputTitle}
                       keyboardType={'phone-pad'}
                       placeholder="Business Telephone Number"
                       defaultValue={userData.hotel_tel}
                       onChangeText={(text) => sethotel_tel(text)}
                   />
                    <Text>Business Email</Text>
       <TextInput
                       style={styles.textInputTitle}
                       keyboardType={'email-address'}
                       placeholder="Business Email"
                       defaultValue={userData.hotel_email}
                       onChangeText={(text) => sethotel_email(text)}
                   />
                    <Text>Business Website</Text>
       <TextInput
                       style={styles.textInputTitle}
                       keyboardType={'url'}
                       placeholder="Business Website"
                       defaultValue={userData.hot_website}
                       onChangeText={(text) => sethot_website(text)}
                   />
  <Text>Localhost Address</Text>
       <TextInput
                       style={styles.textInputTitle}
                       autoCorrect={true}
                       returnKeyType={'next'}
                       placeholder="Localhost Address"
                       autoFocus={true}
                       
                       defaultValue={userData.hotel_id}
                       onChangeText={(text) => sethotel_id(text)}
                   />
<Button
            title="Update User Information"
            onPress={UpdateUser}
            color={Colors.buttons}
          />
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
  