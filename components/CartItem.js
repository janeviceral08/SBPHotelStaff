import React, { useState } from "react";
import { StyleSheet, View, Dimensions,  Image, TouchableOpacity, Alert ,TextInput,
  TouchableHighlight, ScrollView, StatusBar,RefreshControl,  Modal,} from 'react-native';
import { Col, Card, CardItem, Body, Button, Left, ListItem, List, Content, Thumbnail, Right, Text,Grid, Icon,  Container, Header, Root } from 'native-base';
import styless from './styles/styles_component'
import Colors from './styles/Color';
//import { Text, ListItem } from "react-native-elements";
import { useTasks } from "../providers/TasksProvider";
import { Pay } from "./Pay";
import { Good } from "../schemas";

export function CartItem({ Cart_info }) {
  const { Cart,  deleteCartAll, deleteCart } = useTasks();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  //const { } = useTasks();
  const actions = [ ];
//console.log('Cart cart: ', Cart)
  // For each possible status other than the current status, make an action to
  // move the Good into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
 
  return (
    <>

 <View style={{flexDirection: 'row', paddingLeft: 20}}>
           
            <Left style={{flexDirection:'row'}}>
                            <Text note style={{ paddingRight: 10, fontSize:14, color:'black', marginRight: 30}}>
                                {Cart_info.quantity}
                            </Text>
                            <TouchableOpacity onLongPress={() => deleteCartAll(Cart_info)} onPress={() => deleteCart(Cart_info)}>
                            <Text note style={[styless.textDescription],  { color:'black',fontSize:14, width: 150}} numberOfLines={1}>
                                {Cart_info.item}
                            </Text>
                            </TouchableOpacity>
                        </Left>
                      
                        <Body />
                        
                        <Right style={{flexDirection:'row', flex:1, fontSize:14,justifyContent: 'space-between', paddingRight: 17}}>
                            <Text note style={[styless.textDescription], { color:'black', marginLeft: -50}}>{Cart_info.price}</Text>
                        
                            <Text note style={[styless.textDescription],  { color:'black', marginRight: -9.}}> {Cart_info.quantity * Cart_info.price}</Text>
                        </Right>
                       
     </View>
    
      
    </>
  );
}
