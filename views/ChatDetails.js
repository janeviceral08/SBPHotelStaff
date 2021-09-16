import React, { useState, useEffect }  from "react";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right, List, ListItem } from 'native-base';
import { Dimensions, StyleSheet, ScrollView, Image, View, Alert, TextInput, Button, Platform, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
var {height, width } = Dimensions.get('window');
import FastImage from 'react-native-fast-image'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;
import Toast from "react-native-simple-toast";
import moment from 'moment'
import Colors from '../components/styles/Color';
import styless from '../components/styles/styless';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAuth } from "../providers/AuthProvider";
const BannerWidth = Dimensions.get('window').width;


export function ChatDetails({ navigation, route }) {
  const {  userData } = useAuth();
    const [chat, setChat] = useState([]);
    const [TextInput_Student_Name, setTextInput_Student_Name] = useState("");
    const [TextInput_Student_Class, setTextInput_Student_Class] = useState("");
    const [TextInput_Student_PhoneNumber, setTextInput_Student_PhoneNumber] = useState("");
    const [TextInput_Student_Email, setTextInput_Student_Email] = useState("");
    const [button, setbutton] = useState(false);

//console.log('route: ', route.params.idNote)



    const InsertStudentRecordsToServer =()=>{
       


        setbutton(true)
     
        fetch("http://"+userData.hotel_id+"/backend/InsertStudentData.php", {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          student_name : TextInput_Student_Name,
  
          student_class :  route.params.idNote,
  
          student_phone_number : 'Admin',
  
          student_email: moment().unix(),
      })
  
        })
            .then(
  
           
              fetch('http://'+userData.hotel_id+'/backend/updatechatroom.php', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
          
                  last_message : TextInput_Student_Name,
  
                  user :  route.params.idNote,
          
                  from_whom : 'Admin',
          
                  time_sent: moment().add(8, 'hours'),
          
                })
          
                }).then(() => {
             // Showing response message coming from server after inserting records.
           
             Toast.show('Sent')
             setbutton(false)
             setTextInput_Student_Name('')
             setTextInput_Student_Class('')
             setTextInput_Student_PhoneNumber('')
             setTextInput_Student_Email('')
                    })
       
          )



    }




    useEffect(()=>{
        setInterval( () => {

            fetch("http://"+userData.hotel_id+"/backend/ShowAllStudentsList.php", {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
          
                  user_name:  route.params.idNote,
          
          
          
                })
          
              }).then((response) => response.json())
                .then((responseJson) => {
                    console.log('responseJson: ', responseJson)
          setChat(responseJson)

                
                }).catch((error) => {
                  console.error(error);
                })
      
        },5000)
        
      },[])

  return (
    <View style={{ flex:1,
        paddingTop: (Platform.OS == 'ios') ? 20 : 0,
        marginLeft: 5,
        marginRight: 5}}>
   
   <FlatList
       inverted
      style={{marginBottom: 15}}
  data={chat}
  renderItem={({item}) => 
  item.student_phone_number === 'Admin'?
    <View >
        <Text style={{textAlign: 'center', fontSize: 12, fontWeight: 'bold'}}>
          {  moment().format('MMM D, YYYY') === moment(item.student_email  * 1000).format('MMM D, YYYY')?
          'Today '+ moment(item.student_email  * 1000).format('h:mm a')
          : moment().format('MMM D, YYYY') !=  moment(item.student_email  * 1000).format('MMM D, YYYY')?
         moment(item.student_email  * 1000).format('MMM D, YYYY h:mm a')
:moment(item.student_email  * 1000).format('MMM D, YYYY h:mm a')
        
        }</Text>
   <Text style={[styles.FlatListItemStyle], {alignSelf: 'flex-end', backgroundColor: Colors.buttons, color:'white', maxWidth: '80%', borderRadius: 15, borderBottomRightRadius: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5, paddingLeft: 7, paddingRight: 7}}> {item.student_name} </Text>

  </View>
   :<View >
         <Text style={{textAlign: 'center', fontSize: 12, fontWeight: 'bold'}}>
         {  moment().format('MMM D, YYYY') === moment(item.student_email  * 1000).format('MMM D, YYYY')?
          'Today '+ moment(item.student_email  * 1000).format('h:mm a')
          : moment().format('MMM D, YYYY') != moment(item.student_email  * 1000).format('MMM D, YYYY')?
          moment(item.student_email  * 1000).format('MMM D, YYYY h:mm a')
:moment(item.student_email  * 1000).format('MMM D, YYYY h:mm a')
        
        }
        
        
        
        </Text>

    <Text style={[styles.FlatListItemStyle],{ backgroundColor: 'white', color:'black', maxWidth: '80%', borderRadius: 15, borderBottomLeftRadius: 5, marginBottom: 5, paddingTop: 5, paddingBottom: 5, paddingLeft: 7, paddingRight: 7}}> {item.student_name} </Text>
    </View>
    
    }

  keyExtractor={(item, index) => index}
      

       />
         
            





         <View style={{flexDirection: 'row', marginTop: -15}}>
<TextInput
      
      placeholder="Type Message Here"

      onChangeText={ TextInputValue => setTextInput_Student_Name(TextInputValue) }

      underlineColorAndroid='transparent'
      maxLength ={250}
      style={[styles.TextInputStyleClass], {width: 250, borderWidth: 1}}
    />{
      button ==false?<TouchableOpacity activeOpacity = { .4 } style={[styles.TouchableOpacityStyle],{width: 100, backgroundColor: Colors.buttons}} onPress={InsertStudentRecordsToServer} >

      <Text style={styles.TextStyle}> Send </Text>
      
      </TouchableOpacity>:
      <TouchableOpacity activeOpacity = { .4 } style={[styles.TouchableOpacityStyle],{width: 100, backgroundColor: 'gray'}} >

      <Text style={styles.TextStyle}> Sending... </Text>
      
      </TouchableOpacity>
    }
      

</View>
    </View>
  );
}


const styles = StyleSheet.create({

    MainContainer :{
  
      alignItems: 'center',
      flex:1,
      paddingTop: 30,
      backgroundColor: '#fff'
  
    },
    FlatListItemStyle: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
    
  
    MainContainer_For_Show_StudentList_Activity :{
      
      flex:1,
      paddingTop: (Platform.OS == 'ios') ? 20 : 0,
      marginLeft: 5,
      marginRight: 5
      
      },
  
    TextInputStyleClass: {
  
    textAlign: 'center',
    width: '90',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 5 ,
  
    },
  
    TouchableOpacityStyle: {
  
      paddingTop:10,
      paddingBottom:10,
      borderRadius:5,
      marginBottom:7,
      width: '90%',
      backgroundColor: '#00BCD4'
  
    },
  
    TextStyle:{
      color:'#fff',
      textAlign: 'center',
      padding: 20
    },
  
    rowViewContainer: {
      fontSize: 20,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
    }
  
  });