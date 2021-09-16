import React, { useState, useEffect } from "react";
import { View,StyleSheet, Dimensions, Text, Image, TouchableOpacity, Alert ,TextInput, TouchableHighlight, ScrollView,Modal,Button, Pressable, FlatList } from "react-native";
import { Col,Card, CardItem, Body, Left, List, Content, Thumbnail, Right,Grid, Icon,  Container, Header, Item,Input, Tab, Tabs,ScrollableTab  } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTasks} from "../providers/TasksProvider";
import { FlatGrid } from 'react-native-super-grid';
import styless from '../components/styles/styles_component'
import Colors from '../Colors';
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import Toast from "react-native-simple-toast";
const SCREEN_WIDTH = Dimensions.get('window').width;
export function Carts({ navigation }) {

  const { Goods, Cart,checkin, createCart, saveOrders, BacktoGoods, category, DeleteCarts} = useTasks();
  const [visibleModal, setvisibleModal] = useState(false);
  const [checkout_button, setcheckout_button] = useState(true);
 const [customer_id, setcustomer_id] = useState("");
 const [customer_room, setcustomer_room] = useState("");
 const [customer_name, setcustomer_name] = useState("");
 const [total_cus, settotal_cus] = useState(0);
  const [Good, setGoods] = useState(Goods)
  const renderRow = (Cart) => {
    return (<View style={{flexDirection: 'row', paddingLeft: 20}}>
                  
    <Left style={{flexDirection:'row'}}>
                    <Text note style={{ paddingRight: 10, fontSize:14, color:'black', marginRight: 30}}>
                        {Cart.quantity}
                    </Text>
                    <Pressable>
                    <Text note style={[styless.textDescription,  { color:'black',fontSize:14, width: 140}]} numberOfLines={1}>
                        {Cart.item}
                    </Text>
                    </Pressable>
                </Left>
              
                <Body />
                
                <Right style={{flexDirection:'row', flex:1, fontSize:14,justifyContent: 'space-between', paddingRight: 17}}>
                    <Text note style={[styless.textDescription, { color:'black', marginLeft: -50}]}>{Cart.price}</Text>
                
                    <Text note style={[styless.textDescription,  { color:'black', marginRight: -20}]}> {Cart.quantity * Cart.price}</Text>
                    <AntDesign name="closecircleo" size={15} color={"black"} onPress={() => BacktoGoods(Cart)}/>
              
                </Right>
               
</View>)
  }


  return (
    <View style={{flex: 1}}>
    
  <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: '35%'}}>
  <View style={{flexDirection: 'row', paddingLeft: 20}}>
           
           <Left style={{flexDirection:'row'}}>
                                  <Text note style={{ paddingRight: 10, fontSize:15, color:'black', fontWeight: 'bold', marginRight: 30}}>
                                      QTY
                                  </Text>
                                  <Text note style={[styless.textDescription],  { color:'black',fontSize:15, width: 150, fontWeight: 'bold'}} numberOfLines={1}>
                                      Item
                                  </Text>
                              </Left>
                             
                              <Body />
                              
                              <Right style={{flexDirection:'row', flex:1, fontSize:15,justifyContent: 'space-between', paddingRight: 100}}>
                                  <Text note style={[styless.textDescription, { color:'black', fontWeight: 'bold', paddingRight: 40}]}>Price</Text>
                              
                                  <Text note style={[styless.textDescription,  { color:'black', fontWeight: 'bold'}]}> SubTotal</Text>
                              </Right>
                             
           </View>
  <ScrollView>

  {Cart.map((Cart) =>{
    return renderRow(Cart)})
      }
    
         </ScrollView>
  
         </View>
         
  </View>
  );
}

const styles = StyleSheet.create({

  itemName: {
    fontSize: 16,
    color: Colors.BackColor,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 10
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#7e7e7e',
    paddingLeft: 10,
  },
  itemCode2: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    paddingLeft: 10,
    paddingBottom: 10
  },
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
height: 500,
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

