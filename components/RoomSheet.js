import React, { useState } from "react";
import { View } from "react-native";
import { ListItem, Overlay, Input,Text, Button } from "react-native-elements";
import { useRooms} from "../providers/RoomsProvider";
// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
export function RoomSheet({ actions, visible, closeOverlay, roomInfo }) {
  const { EditRoom } = useRooms();
  const [newFloor, setNewFloor] = useState(roomInfo.floor);
  const [newRoomNumber, setNewRoomNumber] = useState(roomInfo.name);

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
      <Text>Room Number</Text>
      <Input
           placeholder="Room Number"
           onChangeText={(text) => setNewRoomNumber(text)}
           autoFocus={true}
           value={newRoomNumber}
         />
         <Text>Floor Number</Text>
      <Input
           placeholder="Floor Number"
           onChangeText={(text) => setNewFloor(text)}
           autoFocus={true}
           value={newFloor}
         />
          <Button
            title="Edit"
            onPress={() => {
         
              EditRoom(roomInfo, newFloor, newRoomNumber);
            }}
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
