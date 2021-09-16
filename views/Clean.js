import React, { useState, useEffect } from "react";

import { Dimensions, StyleSheet, ScrollView, TouchableOpacity, Button, PermissionsAndroid,Alert, BackHandler, Pressable, Modal, FlatList } from 'react-native';
import { Container, Content, View, Left, Right, Icon, Card, CardItem, Badge, Text, Body, Thumbnail, Item, Input, Label, Header, SwipeRow} from 'native-base';
var {height, width } = Dimensions.get('window');
const SCREEN_WIDTH = Dimensions.get('window').width;
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from "react-native-modal-datetime-picker";
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../Colors';
import { useTasks} from "../providers/TasksProvider";
import { CleanView } from "./CleanView";


export function Clean({ navigation }) {
    const { rooms, cleaned, maintain } = useTasks();
    const [room_data, setguest]= useState(rooms)

    const searchData = (text) => {
  
        const newData = rooms.filter(item => {
          const itemData = item.name.toUpperCase();
          const textData = text.toUpperCase();
         
          return itemData.indexOf(textData) > -1
        });
      
        setguest(newData)  
        }
      
    
    const getClean =(item)=>{
        Alert.alert(
            "Do you Want to Proceed?",
            "You will set the room "+item.name+" into Available?",
            [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "Yes", onPress: () =>   {
                cleaned(item)
        }         
        }
        ],
        { cancelable: false }
        
        );
    }

    const getMaintain =(item)=>{
        Alert.alert(
            "Do you Want to Proceed?",
            "You will set the room "+item.name+" into Under Maintenance?",
            [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "Yes", onPress: () =>   {
                maintain(item)
        }         
        }
        ],
        { cancelable: false }
        
        );
    }

  return (
    <View>
        <View style={{width: '100%'}}>
               <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
         <Item>
           <MaterialCommunityIcons name="book-search-outline" size={23} color={Colors.BackColor}/>
           <Input placeholder="Cleaning Search Room Number" style={{borderColor: 'red'}}    onChangeText={(text) => searchData(text)}/>
           </Item>
       
       </Header>
               </View>
               <Card>
                 {
                 room_data && room_data.length > 0 ?
                 
                 room_data.map((item, i) =>
                 
                 item.status== 'Cleaning'?

      
                 <CleanView key={`${item._id}`} item={item} />
                :null
                  ) 
                :
                rooms.map((item, i) =>
                 
                item.status== 'Cleaning'?

     
                <CleanView key={`${item._id}`} item={item} />
               :null
                 ) }
                
                
                
                </Card>

    </View>
  );
}
