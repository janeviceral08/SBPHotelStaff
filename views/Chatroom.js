import React, { useState, useEffect }  from "react";
import { Container, Header, Title,Content, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right, List, ListItem, Accordion,Input, Item, Button  } from 'native-base';
import { Pressable,View,Dimensions, StyleSheet, ScrollView, Image, TouchableOpacity,BackHandler, Keyboard,Alert,ActivityIndicator,TextInput, Modal, RefreshControl, DeviceEventEmitter, NativeEventEmitter,Switch, FlatList} from 'react-native';
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;
import {Overlay } from "react-native-elements";
import { useTasks} from "../providers/TasksProvider";
import Toast from "react-native-simple-toast";
import nationality from '../components/nationality.json'

import styles from '../components/styles/Home_style';
import moment from 'moment'
import Colors from '../components/styles/Color';
import styless from '../components/styles/styless';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useAuth } from "../providers/AuthProvider";
const BannerWidth = Dimensions.get('window').width;


export function Chatroom({ navigation }) {
  const {  userData } = useAuth();
    const [chat, setChat] = useState([]);




    useEffect(()=>{
        setInterval( () => {
          fetch("http://"+userData.hotel_id+"/backend/ChatRoom.php")
        .then((response) => response.json())
        .then((responseJson) => {
      console.log('responseJson: ', responseJson)
          setChat(responseJson)
   
        })
        .catch((error) => {
          console.error(error);
        });
      
        },60000)
        
      },[])

  return (
    <View>
        <View style={{width: '100%', marginTop: '-2%'}}>
               <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
         <Item>
           <Ionicons name="chatbubbles-outline" size={23} color={Colors.BackColor}/>
           <Text style={{alignItems: 'center'}}>   List of Chat Rooms</Text>
           </Item>
       
       </Header>
               </View>
               
               <FlatList
           
         data={chat}

         renderItem={({item}) =>    <ListItem icon onPress={()=> navigation.navigate('ChatDetails',{idNote: item.temp_id})}>
         <Left>
               <Button style={{ backgroundColor: "#FFFFFF" }}>         
                   <Fontisto name="room" size={25} color={Colors.BackColor} />
               </Button>
         </Left>
         <Body>
               <Text style={{color: 'black'}}>Room {item.room_no}</Text>
               <Text note numberOfLines={1}>{item.last_message}</Text>
         </Body>
         <Right>
         <Text note> {moment(item.time_sent).format('MMM D YYYY h:m a')} </Text>
         </Right>
     </ListItem>}

         keyExtractor={(item, index) => index.toString()}
             
       
              />

     


    </View>
  );
}
