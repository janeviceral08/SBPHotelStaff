import React, { useState } from "react";
import { Alert, TouchableOpacity, View, StyleSheet, Text } from 'react-native';

import { useTasks} from "../providers/TasksProvider";
import { MaintenanceViewDetails } from "./MaintenanceViewDetails";
import Toast from "react-native-simple-toast";        
import Colors from '../components/styles/Color';
import { Col, Card, CardItem, Body, Left, List, Content, Thumbnail, Right, Icon,  Container, Header } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'


export function MaintenanceView({ item }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const actions = [];

  // For each possible status other than the current status, make an action to
  // move the room into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
 
  return (
    <>
      <MaintenanceViewDetails
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (item.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
        roomInfo={item}
      />
   
       <CardItem bordered style={{  width: '95%', marginLeft: '2.5%', flexDirection: 'row', padding: 10}}  key={item.name} >
                 <Left>
                 <MaterialCommunityIcons name={'circle-outline'} size={20} />
                 </Left>
                  
           <Body style={{marginLeft: -70}}>
           <Text>Room {item.name}</Text>
           </Body>
                  <Right style={{flexDirection: 'row', marginLeft: 80}}>
                 
                  <TouchableOpacity   onPress={() => {
      setActionSheetVisible(true);
    }}>
                  <Octicons name={'checklist'} size={25} style={{marginLeft: 25}} color={Colors.buttons}  />
                  </TouchableOpacity>
                  </Right>
                   </CardItem>
    </>
  );
}
const style = StyleSheet.create({

  itemName: {
    textAlign: 'left',
    fontSize: 18,
    color:'black',

  },
  
  
  
  });
  