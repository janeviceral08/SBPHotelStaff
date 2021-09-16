import React, { useState } from "react";
import { Alert } from 'react-native';
import { Text, ListItem } from "react-native-elements";
import { useRooms} from "../providers/RoomsProvider";
import { RoomSheet } from "./RoomSheet";
import { Room } from "../schemas";

export function RoomItem({ room }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const { deleteRoom, setRoomStatus } = useRooms();
  const actions = [
    {
      title: "Delete",
      action: () => {
        Alert.alert(
          "Delete the Room from database?",
          "You cannot undo the process if you proceed",
          [
            {
              text: "Cancel",
              onPress: () => this.componentDidMount(),
              style: "cancel"
            },
            { text: "OK", onPress: () =>   

            {
              deleteRoom(room);
            }
          }
          ],
          { cancelable: false }
          );
   

       
      },
    },
  ];

  // For each possible status other than the current status, make an action to
  // move the room into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
 
  return (
    <>
      <RoomSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (room.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
        roomInfo={room}
      />
      <ListItem
        key={room.id}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        title={'Room: '+room.name}
        bottomDivider
    
      />
    </>
  );
}
