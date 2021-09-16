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
export function Product_INFOs({ navigation, route }) {

  const { Goods, Cart,checkin, createCart, saveOrders, BacktoGoods, category, DeleteCarts} = useTasks();
  const [visibleModal, setvisibleModal] = useState(false);
  const [checkout_button, setcheckout_button] = useState(true);
 const [customer_id, setcustomer_id] = useState("");
 const [customer_room, setcustomer_room] = useState("");
 const [customer_name, setcustomer_name] = useState("");
 const [total_cus, settotal_cus] = useState(0);
  const [Good, setGoods] = useState(Goods)

const currencyFormat = (num) => {
  return '₱' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const saveTocart = () => {

  Alert.alert(
    "Do you Want to Proceed?",
    "Are you sure ?",
    [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "OK", onPress: () =>   {
        Toast.show('Please Wait A Moment')
        saveOrders(customer_id, customer_room, customer_name, total_cus)
  settotal_cus(0)
  setcustomer_name("")
  setcustomer_room("")
  setcustomer_id("")
}         
}
],
{ cancelable: false }

);
}
const del = () => {

  Alert.alert(
    "Do you Want to Proceed Deleting?",
    "Are you sure ?",
    [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "OK", onPress: () =>   {
        Toast.show('Please Wait A Moment')
        DeleteCarts()
  settotal_cus(0)
  setcustomer_name("")
  setcustomer_room("")
  setcustomer_id("")
}         
}
],
{ cancelable: false }

);
}
const searchData = (text) => {
  
  const newData = Goods.filter(item => {
    const itemData = item.name.toUpperCase();
    const textData = text.toUpperCase();
   
    return itemData.indexOf(textData) > -1
  });

  setGoods(newData)  
  
 

  }

  return (

        <Container>
        
        <Tabs  renderTabBar={()=> <ScrollableTab  tabsContainerStyle={{backgroundColor: Colors.BackColor }}/>}>
          <Tab heading="All"  tabStyle={{backgroundColor: Colors.BackColor, color: 'white' }} activeTabStyle={{backgroundColor: Colors.BackColor, color: 'white'  }}>
          {Good && Good.length > 0 ?
    <FlatGrid
    data={Good}
    spacing={5}
    keyExtractor={item => item._id}
    renderItem={({ item }) => (
      <Pressable style={{ borderRadius: 10  }} onPressIn={() =>createCart(item)}>
        <Card style={{ borderRadius: 10  }}>
          
        <Text style={[styles.itemName, {color: '#32b5fc'}]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.itemCode,{color: item.quantity<1? 'red':'#7e7e7e'}]}>QTY: {item.quantity}</Text>
        <Text style={styles.itemCode2}>Price: {currencyFormat(item.price)}</Text>
        </Card>
        </Pressable>
    )}
  />
:<FlatGrid
data={Goods}
spacing={5}
keyExtractor={item => item._id}
renderItem={({ item }) => (
  <Pressable style={{ borderRadius: 10  }} onPress={() =>createCart(item)}>
    <Card style={{ borderRadius: 10  }}>
      
    <Text style={[styles.itemName, {color: '#32b5fc'}]} numberOfLines={1}>{item.name}</Text>
    <Text style={styles.itemCode}>QTY: {item.quantity}</Text>
    <Text style={styles.itemCode2}>Price: {currencyFormat(item.price)}</Text>
    </Card>
    </Pressable>
)}
/>
    }
          </Tab>

{
category.map((items)=>
<Tab heading={items.name} key={items.catid}  tabStyle={{backgroundColor: Colors.BackColor, color: 'white' }} activeTabStyle={{backgroundColor: Colors.BackColor, color: 'white'  }}>
          {Good && Good.length > 0 ?
    <FlatGrid
    data={Good}
    spacing={5}
    keyExtractor={item => item._id}
    renderItem={({ item }) => (
      item.cat === items.catid?
      <Pressable style={{ borderRadius: 10  }} onPressIn={() =>createCart(item)}>
        <Card style={{ borderRadius: 10  }}>
          
        <Text style={[styles.itemName, {color: '#32b5fc'}]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.itemCode,{color: item.quantity<1? 'red':'#7e7e7e'}]}>QTY: {item.quantity}</Text>
        <Text style={styles.itemCode2}>Price: {currencyFormat(item.price)}</Text>
        </Card>
        </Pressable>
        :null
    )}
  />
:<FlatGrid
data={Goods}
spacing={5}
keyExtractor={item => item._id}
renderItem={({ item }) => (
  item.cat === items.catid?
  <Pressable style={{ borderRadius: 10  }} onPress={() =>createCart(item)}>
    <Card style={{ borderRadius: 10  }}>
      
    <Text style={[styles.itemName, {color: '#32b5fc'}]} numberOfLines={1}>{item.name}</Text>
    <Text style={styles.itemCode}>QTY: {item.quantity}</Text>
    <Text style={styles.itemCode2}>Price: {currencyFormat(item.price)}</Text>
    </Card>
    </Pressable>
    :null
)}
/>
    }
          </Tab>
)}

          
          
        </Tabs>
      </Container>
       
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

