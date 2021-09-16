import React, { useState } from "react";
import { StyleSheet, View, Dimensions,  Image, TouchableOpacity, Alert ,TextInput,
  TouchableHighlight, ScrollView, StatusBar,RefreshControl,  Modal,} from 'react-native';
import { Col, Card, CardItem, Body, Button, Left, ListItem, List, Content, Thumbnail, Right, Text,Grid, Icon,  Container, Header, Root } from 'native-base';
import styless from './styles/styles_component'
import Colors from './styles/Color';
//import { Text, ListItem } from "react-native-elements";
import { useTasks } from "../providers/TasksProvider";
import { CheckinSheet } from "./CheckinSheet";
import { HourCheckinSheet } from "./HourCheckinSheet";
import { HourPromoCheckinSheet } from "./HourPromoCheckinSheet";
import { DailyPromoCheckinSheet } from "./DailyPromoCheckinSheet";
import { Good } from "../schemas";
import moment from "moment";

export function CheckinItem({ checkin }) {
  const {  deleteCartAll, deleteCart } = useTasks();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [actionSheetVisibleHour, setActionSheetVisibleHour] = useState(false);
  const [actionSheetVisiblePromoHour, setActionSheetVisiblePromoHour] = useState(false);
  const [actionSheetVisiblePromoDaily, setActionSheetVisiblePromoDaily] = useState(false);

  //const { } = useTasks();

//console.log('Cart cart: ', Cart)
  // For each possible status other than the current status, make an action to
  // move the Good into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
 
  return (
    <>
          <CheckinSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (checkin.status) {
            setActionSheetVisible(false);
          }
        }}
        checkinInfo={checkin}
      
      />
        <HourCheckinSheet
        visible={actionSheetVisibleHour}
        closeOverlay={() => {
          if (checkin.status) {
            setActionSheetVisibleHour(false);
          }
        }}
        checkinInfo={checkin}
      
      />
       <HourPromoCheckinSheet
        visible={actionSheetVisiblePromoHour}
        closeOverlay={() => {
          if (checkin.status) {
            setActionSheetVisiblePromoHour(false);
          }
        }}
        checkinInfo={checkin}
      
      />
       <DailyPromoCheckinSheet
        visible={actionSheetVisiblePromoDaily}
        closeOverlay={() => {
          if (checkin.status) {
            setActionSheetVisiblePromoDaily(false);
          }
        }}
        checkinInfo={checkin}
      
      />
 <View > 
             
                 <Card  style={[styless.itemContainer, { backgroundColor: "white",borderRadius: 1, borderWidth:1, width: 160,borderRadius: 10, marginLeft: -3, marginBottom: 10, marginRight:10 }]}>
                 <CardItem style={{borderColor:Colors.BackColor, paddingBottom: 0, marginBottom: -10, paddingLeft: 0, paddingRight: 0, paddingTop: 0,borderRadius: 1, borderWidth:1,borderRadius: 10, }}>
                 <TouchableOpacity 
                 style={{marginLeft: -10}} onPress={()=> {checkin.hour_key == ""? setActionSheetVisible(true):checkin.hour_key == "1"? setActionSheetVisibleHour(true):checkin.hour_key == "3"?setActionSheetVisiblePromoHour(true):setActionSheetVisiblePromoDaily(true)}}>
                 
                 <View style={{height:20,flexShrink: 1}}>
                   <Text  numberOfLines={1} style={styless.categoriesStoreName}>{checkin.room_type} ( {checkin.room_no} )</Text>
                 
                 </View>  
                   
                 
                 
                 
                 <Text style={{ fontSize: 12, paddingLeft: 20}} numberOfLines={1}>Customer :  {checkin.customer}</Text>
            
                 <Text style={{ fontSize: 12, paddingLeft: 20}}>Person/s :   {checkin.no_person}</Text>
                 <Text style={{  fontSize: 10, paddingLeft: 20}}>In:  {  moment(checkin.check_in  * 1000).format('MMM D, YYYY h:mm a')}</Text>
                 <Text style={{  fontSize: 10, paddingLeft: 20}}>Out: {moment(checkin.check_out * 1000).format('MMM D, YYYY h:mm a')}</Text>
                 <Text style={{  fontSize: 11, paddingLeft: 20, color: checkin.note == ''?'black':'red'}}>Note: {checkin.note}</Text>
               
          
                 </TouchableOpacity>
                 </CardItem>
                 </Card>


                 

                  </View> 
    
      
    </>
  );
}
