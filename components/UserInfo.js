import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Overlay, Input, Button, Text } from "react-native-elements";
import styles from "../stylesheet";
import { useAuth} from "../providers/AuthProvider";
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function UserInfo({  }) {
    const { EditUser, userData} = useAuth();
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState(userData.address);
  const [newRoomType, setRoomType] = useState(userData.age);
  const [RoomExtraPerson, setRoomExtraPerson] = useState(userData.full_name);
  const [RoomMaxPer, setRoomMaxPer] = useState(userData.gender);

  return (
    <>
      <ScrollView style={{padding: 20}}>
            <Text>Address</Text>
          <Input
            placeholder="New Task Name"
            onChangeText={(text) => setNewTaskName(text)}
            autoFocus={true}
            value={newTaskName}
          />
          <Text>Age</Text>
           <Input
            placeholder="New Room Type"
            onChangeText={(text) => setRoomType(text)}
            autoFocus={true}
            value={newRoomType}
          />
          <Text>Full Name</Text>
           <Input
            placeholder="Room price"
            onChangeText={(text) => setRoomExtraPerson(text)}
            autoFocus={true}
            value={RoomExtraPerson}
          />
          <Text>Gender</Text>
           <Input
            placeholder="Hours Duration"
            onChangeText={(text) => setRoomMaxPer(text)}
            autoFocus={true}
            value={RoomMaxPer}
          />
         
          
          <Button
            title="Update"
            onPress={() => {
              setOverlayVisible(false);
              EditUser(newTaskName,newRoomType, RoomExtraPerson, RoomMaxPer,userData );
            }}
          />
        </ScrollView>
    </>
  );
}
