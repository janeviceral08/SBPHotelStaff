
import React, { useState } from "react";
import { View } from "react-native";
import { ListItem, Overlay, Input,Text, Button } from "react-native-elements";
import { useTasks } from "../providers/TasksProvider";
import Toast from "react-native-simple-toast";
// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
export function GoodSheet({ actions, visible, closeOverlay, GoodInfo }) {
  const [newproduct, setproduct] = useState(GoodInfo.name);
  const [newprice, setprice] = useState(GoodInfo.price);
  const [newquantity, setquantity] = useState(GoodInfo.quantity);
  const cancelAction = {
    title: "Cancel",
    action: closeOverlay,
  };


  return (
    <Overlay
      overlayStyle={{ width: "90%" }}
      isVisible={visible}
      onBackdropPress={closeOverlay}
    >
      <View>
      <Text>Product</Text>
      <Input
           placeholder="Product"
           onChangeText={(text) => setproduct(text)}
           autoFocus={true}
           value={newproduct}
         />
         <Text>Price</Text>
      <Input
           placeholder="Price"
           onChangeText={(text) => setprice(text)}
           autoFocus={true}
           value={newprice.toString()}
         />
         <Text>Quantity</Text>
      <Input
           placeholder="Quantity"
           onChangeText={(text) => setquantity(text)}
           autoFocus={true}
           value={newquantity.toString()}
         />
        
        {[...actions, cancelAction].map(({ title, action }) => (
       
          <ListItem
            key={title}
            title={title}
            onPress={() => {
              closeOverlay();
              action();
            }}
            
          />
        
        ))}
      </View>
    </Overlay>
  );
}
