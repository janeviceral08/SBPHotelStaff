import React, { useState } from "react";
import { StyleSheet, View, Dimensions,  Image, TouchableOpacity, Alert ,TextInput,
  TouchableHighlight, ScrollView, StatusBar,RefreshControl,  Modal,} from 'react-native';
import { Col, Card, CardItem, Body, Button, Left, ListItem, List, Content, Thumbnail, Right, Text,Grid, Icon,  Container, Header, Root } from 'native-base';
import styless from './styles/styles_component'
import Colors from './styles/Color';
//import { Text, ListItem } from "react-native-elements";
//import { useTasks } from "../providers/TasksProvider";
import { GoodSheet } from "./GoodSheet";
import { Good } from "../schemas";

export function GoodItem({ goods }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  //const { createCart } = useTasks();
  const actions = [

  ];
  // For each possible status other than the current status, make an action to
  // move the Good into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
 
  return (
    <>
      <GoodSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (goods.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
        GoodInfo={goods}
      
      />
           <View> 
                 {<Card transparent style={{ backgroundColor: "white",borderRadius: 20, borderWidth:1 }}>
<CardItem style={{borderColor: Colors.BackColor, paddingBottom: 0, marginBottom: 0, paddingLeft: 0, paddingRight: 10, paddingTop: 0,borderRadius: 10, borderWidth:1 }}>
<TouchableOpacity   onPress={() => createCart(goods)}>

<View style={{flexShrink: 10}}>
  <Text numberOfLines={1} style={styless.categoriesStoreName}>{goods.product}</Text>
</View>  
  


  
<Text style={{fontStyle: "italic",  fontSize: 10, paddingLeft: 20}}>Quantity :{goods.quantity}</Text>

  
  <View>
  <Text style={styless.categoriesPrice}>₱{goods.price} </Text>
  </View>
  
</TouchableOpacity>
</CardItem>
</Card> 


               }
                  </View>  
      
    </>
  );
}
