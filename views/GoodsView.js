import React, { useState, useEffect } from "react";
import { View,StyleSheet, Dimensions, Text, Image, TouchableOpacity, Alert ,TextInput,KeyboardAvoidingView, Platform, TouchableHighlight, ScrollView,Modal,Button, Pressable, FlatList } from "react-native";
import { Col,Card, CardItem, Body, Left, List, Content,Picker, Thumbnail, Right,Grid, Icon,  Container, Header, Item,Input, Tab, Tabs,ScrollableTab,ListItem,Switch   } from 'native-base';
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
import DropDownPicker from 'react-native-dropdown-picker';
const SCREEN_WIDTH = Dimensions.get('window').width;
export function GoodsView({ navigation, route }) {

  const { Goods, Cart,checkin, createCart, saveOrders, BacktoGoods, category, DeleteCarts, BacktoGoodsone} = useTasks();
  const [visibleModal, setvisibleModal] = useState(false);
  const [checkout_button, setcheckout_button] = useState(true);
 const [customer_id, setcustomer_id] = useState("");
 const [customer_room, setcustomer_room] = useState("");
 const [customer_name, setcustomer_name] = useState("");
 const [Payments, setPayments] = useState("");
 const [AmountPaid, setAmountPaid] = useState("");
 const [total_cus, settotal_cus] = useState(0);
  const [Good, setGoods] = useState(Goods)

const currencyFormat = (num) => {
  return '₱' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const saveTocart = () => {
const change = parseFloat(AmountPaid) - parseFloat(Cart&& Cart.length ? Cart.reduce((sum, i) => (
  sum += (i.quantity * i.price)
), 0): 0)
  if(customer_room == ""){
    Toast.show('Please Choose Room Number')
  }
  else if(Payments == ""){
    Toast.show('Please Choose Payment')
  }
  else if(Payments == "Paid" && AmountPaid == ""){
    Toast.show('Please Enter Amount Paid')
  }
  else if(isNaN(AmountPaid)){
    Toast.show('Please Enter Valid Number')
  }
  
  else if(Payments == "Paid"){
    Alert.alert(
      "Change of    "+ change.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      "Do you Want to Proceed?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "OK", onPress: () =>   {
          Toast.show('Please Wait A Moment')
          saveOrders(customer_id, customer_room, customer_name, total_cus,  Payments, AmountPaid)
    settotal_cus(0)
    setcustomer_name("")
    setcustomer_room("")
    setcustomer_id("")
    setPayments("")
    setAmountPaid("")
  }         
  }
  ],
  { cancelable: false }
  
  );
  }
  
  else{
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
        saveOrders(customer_id, customer_room, customer_name, total_cus, Payments, AmountPaid)
  settotal_cus(0)
  setcustomer_name("")
  setcustomer_room("")
  setcustomer_id("")
  setPayments("")
  setAmountPaid("")
}         
}
],
{ cancelable: false }

);
  }
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
    <View style={{flex: 1}}>
      <View style={{width: '100%',}}>
            <Header searchBar rounded  style={{backgroundColor: Colors.BackColor}} androidStatusBarColor={Colors.BackColor}>
          <Item style={{height: 30}}>
            <Ionicons name="search" size={18} color={Colors.BackColor}/>
            <Input placeholder="Search" style={{borderColor: 'red', height: 40}}    onChangeText={(text) => searchData(text)}/>
              </Item>
        
        </Header>
        </View>
        <View style={{height: '54%'}}>
      
        
        <Tabs renderTabBar={()=> <ScrollableTab style={{height: 22, backgroundColor: Colors.BackColor}}  tabsContainerStyle={{backgroundColor: Colors.BackColor , height: 21, marginBottom: 5,}}/>}>
          <Tab heading="All"  tabStyle={{backgroundColor: Colors.BackColor, color: 'white' }} activeTabStyle={{backgroundColor: Colors.BackColor, color: 'white', }}>
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
   
       
  </View>

  <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: '38%'}}>
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
                                  <Text note style={[styless.textDescription, { color:'black', fontWeight: 'bold', paddingRight: 10}]}>Price</Text>
                              
                                  <Text note style={[styless.textDescription,  { color:'black', fontWeight: 'bold'}]}> SubTotal</Text>
                              </Right>
                             
           </View>
  <ScrollView>

  {Cart.map((Cart, i) =>
        <View style={{flexDirection: 'row', paddingLeft: 20}} key={i}>
                  
                   <Left style={{flexDirection:'row'}}>
                                   <Text note style={{ paddingRight: 10, fontSize:14, color:'black', marginRight: 30, fontSize:15}}>
                                       {Cart.quantity}
                                   </Text>
                                   <Pressable>
                                   <Text note style={[styless.textDescription,  { color:'black',fontSize:15, width: 110}]} numberOfLines={1}>
                                       {Cart.item}
                                   </Text>
                                   </Pressable>
                               </Left>
                             
                               <Body />
                               
                               <Right style={{flexDirection:'row', flex:1, fontSize:15,justifyContent: 'space-between', paddingRight: 17}}>
                                   <Text note style={[styless.textDescription, { color:'black', marginLeft: -50}]}>{Cart.price}</Text>
                               
                                   <Text note style={[styless.textDescription,  { color:'black', marginRight: 20}]}> {Cart.quantity * Cart.price}</Text>
                                 
                                  
                                   <AntDesign name="closecircleo" size={18} color={"black"} onPress={() => BacktoGoods(Cart)}/>
                             
                               </Right>
                              
            </View>)
      }
    
         </ScrollView>
      
      






      
        <Card>
          <ListItem icon>
            <Left>
          
            <TouchableOpacity    onPress={del} style={{ backgroundColor:'white', padding: 2,borderWidth: 1, borderColor:Colors.BackColor, marginLeft: -10, flexDirection: 'row'}} >
                
                <MaterialCommunityIcons name={'close-circle'} size={25} color={Colors.BackColor}  />
                <Text style={{color: Colors.BackColor, fontSize: 18, fontWeight: 'bold'}}>Clear</Text>
                      </TouchableOpacity>
              
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>T O T A L :   {Cart&& Cart.length ? Cart.reduce((sum, i) => (
															sum += (i.quantity * i.price)
														), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0}</Text>
            </Body>
            <Right>
            <TouchableOpacity    onPress={saveTocart} style={{padding: 2, backgroundColor:'white', borderWidth: 1, borderColor:Colors.BackColor, flexDirection: 'row'}} >
                
                <MaterialCommunityIcons name={'cash-register'} size={25} color={Colors.BackColor}  />
                <Text style={{color: Colors.BackColor, fontSize: 18, fontWeight: 'bold'}}>Pay</Text>
                      </TouchableOpacity>
            </Right>
            <Body>
            <View style={{flexDirection: 'row', marginLeft: -10}}>
                    <MaterialCommunityIcons name={'cash-register'} size={20} color={Colors.BackColor} style={{marginTop: 12}} onPress={() => setAmountPaid("")}/>
                    <Text style={[styless.textTitle,{marginTop: 12}]}> : </Text>
                    <TextInput
                                   style={{width: '60%'}}
                                   onChangeText={(text) => {isNaN(parseFloat(text))? null:setAmountPaid(text)}}
                                    keyboardType={'number-pad'}
                                    value={AmountPaid}
                                />
                    </View>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
          
            <TouchableOpacity onPress={()=>setvisibleModal(true)}>
    <View style={{flexDirection: 'row'}}>
    <Fontisto name={'room'} size={20} color={Colors.BackColor}  style={{ paddingTop: 2}}/>
    <Text style={styless.textTitle}>  : {customer_room}</Text>
    </View>
    </TouchableOpacity>
              
            </Left>
            <Body>
            <View style={{flexDirection: 'row'}}>
                    <Ionicons name={'person-sharp'} size={20} color={Colors.BackColor} style={{marginTop: 12}} />
                    <Text style={[styless.textTitle,{marginTop: 12}]}> : </Text>
                    <TextInput
                                   style={{width: '80%'}}
                                    onChangeText={(text) => setcustomer_name(text)}
                                    keyboardType={'default'}
                                    defaultValue={customer_name}
                                />
                    </View>
            </Body>
            <Right>
            <Picker
              mode='dialog'
              placeholder="Select Payment"
              onValueChange={(itemValue, itemIndex) => setPayments(itemValue)}
              style={[{ width: '40%' }]}
            >
              <Picker.Item label={'Select Payment'}/>
             <Picker.Item label={'Paid'} value={'Paid'} key={'Paid'} />
             <Picker.Item label={'Room Charge'} value={'Room Charge'} key={'Room Charge'} />
            </Picker>
            </Right>
          </ListItem>
  
         
        </Card>











      <Modal
                                                        visible={visibleModal}
                                                        onRequestClose ={() =>setvisibleModal(false)} 
                                                    
                                                        onBackdropPress={() => setvisibleModal(false)} transparent={true}>
                                                    <View style={stylesss.centeredView}>
                                                <View style={stylesss.modalView}>
                                                <View style={{alignSelf: 'flex-end'}}>
                            <Pressable  onPress={() => setvisibleModal(false)}>
                            <AntDesign name="closecircleo" size={20} color={"black"} />
                            </Pressable>
                            
                          </View>
                                                  <Text style={styless.textTitle}>  Guest:</Text>
                                                  {checkin && checkin.length > 0 ?
              <FlatGrid
             
                  data={checkin}
                  spacing={5}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) =>
                
                
           <Card style={{borderColor: Colors.BackColor,borderWidth: 1, borderRadius: 5, paddingRight: 10}} key={index}>
<TouchableOpacity  onPress={()=>{ setcustomer_id(item.temp_id),setcustomer_room(item.room_no),setcustomer_name(item.customer),settotal_cus(item.total_addtional), setvisibleModal(false)}}>
  <View style={{padding: 10, flex: 1, flexDirection: 'row'}}>
  <Fontisto name={'room'} size={20} color={Colors.BackColor}/>
        <Text style={styless.textTime} numberOfLines={1}>: Room ({item.room_no})</Text>
        
    </View>  
</TouchableOpacity> 
</Card>
                
                }
              /> :
             <View><Text style={{paddingLeft: 70}}>Sorry, No Data</Text></View>
              }

                                                
                                              
                                                </View>
                                              </View>
                                                      </Modal>











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
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
height: 500,
    alignItems: "flex-start",
    shadowColor: "#000",
  width: 350,
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

