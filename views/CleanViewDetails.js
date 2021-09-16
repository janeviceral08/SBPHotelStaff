import React, { useState } from "react";
import { View, Button, ScrollView,TouchableOpacity, TextInput, Alert } from "react-native";
import { ListItem, Overlay,Text } from "react-native-elements";
import { useTasks} from "../providers/TasksProvider";
import Colors from '../components/styles/Color';
import MultiSelect from 'react-native-multiple-select';
import Tags from "react-native-tags";
import AntDesign from 'react-native-vector-icons/AntDesign'


// Action sheet contains a list of actions. Each action should have a `title`
// string and `action` function property. A "Cancel" action is automatically
// added to the end of your list of actions. You must also provide the
// closeOverlay function that this component will call to request that the
// action sheet be closed.
export function CleanViewDetails({ actions, visible, closeOverlay, roomInfo }) {
  const { Room_checklist_add, tasks } = useTasks();
  const [newFloor, setNewFloor] = useState("");
  const [newRoomNumber, setNewRoomNumber] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [tagsEdit, settagsEdit] = useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
 //   Toast.show('Added '+ selectedItems)


  
  };
  const reports_info = roomInfo.checkList.map( (item) => ({id: item, item}) )

console.log('reports_info: ',reports_info)
  return (
    <Overlay
      overlayStyle={{ width: "90%", maxHeight: "85%" }}
      isVisible={visible}
      onBackdropPress={closeOverlay}
    >
      <ScrollView>
      <View>
    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}> Room {roomInfo.name}</Text>
          <Text style={{marginTop: 20, fontSize: 18, fontWeight: 'bold'}} >Check List</Text>
          
            <MultiSelect
            
            items={reports_info}
            uniqueKey='item'
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText='Select Check List'
            searchInputPlaceholderText='Search Check List...'
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor={Colors.buttons}
            tagBorderColor={Colors.buttons}
            tagTextColor={Colors.buttons}
            selectedItemTextColor='white'
            selectedItemIconColor='white'
            itemTextColor='#000'
            displayKey='item'
            searchInputStyle={{ color: Colors.buttons }}
            submitButtonColor={Colors.buttons}
            submitButtonText='Submit'
            removeSelected
            
            />
              <Text style={{marginTop: 10 , fontSize: 18, fontWeight: 'bold'}}>Note</Text>
      <TextInput
           placeholder="Note"
           onChangeText={(text) => setNewRoomNumber(text)}
           multiline={true}
           underlineColorAndroid="transparent"
           numberOfLines={3}
           value={newRoomNumber}
           style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10}}
         />
        
          <View style={{marginBottom: 10}}><Text>&nbsp;</Text></View>
          <Button
            title="Done"
            onPress={() => {
                Alert.alert(
                    "Proceed?",
                    "Are you sure to proceed this action?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => null,
                            style: "cancel"
                          },
                      { text: "OK", onPress: () => Room_checklist_add(roomInfo, newRoomNumber,selectedItems )
                }
                ],
                { cancelable: false }
                
                );
        
            }}
            color={Colors.buttons}

       
          />
       
      </View>
      </ScrollView>
    </Overlay>
  );
}
