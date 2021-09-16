import React, { useState } from "react";
import { ScrollView, StyleSheet,View, Alert } from "react-native";
import { Overlay, Input, Button, Text } from "react-native-elements";
import styles from "../stylesheet";
import { Container, Header, Content, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import Colors from '../Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { RoomsView } from "../views/RoomsView";
// The AddTask is a button for adding tasks. When the button is pressed, an
// overlay shows up to request user input for the new task name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// task is created in the realm.
export function SideMenu({ navigation, createTask }) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newRoomType, setRoomType] = useState("");
  const [RoomExtraPerson, setRoomExtraPerson] = useState("");
  const [RoomMaxPer, setRoomMaxPer] = useState("");
  const [RoomHourDur, setRoomHourDur] = useState("");
  const [RoomPrice, setRoomPrice] = useState("");

  const onClickRooms = async (createTask) => {

    <RoomsView name={createTask.name} projectPartition={createTask.partition}/>
  };



  return (
    <>
   
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ width: "75%", height: "100%", left: "-15%"
         }}
        onBackdropPress={() => setOverlayVisible(false)}
      >
      
     
        <Container style={{backgroundColor:  Colors.BackColor}}>
        <Content style={{backgroundColor:  'white'}}>
           <Card style={{backgroundColor:  Colors.BackColor}}>
              <Card.Title
           
                  title={ <Text style={{color: 'white'}}>123</Text>}
                  subtitle={ <Text style={{color: Colors.bottom_nav_background, fontSize: 12, fontWeight: 'bold'}}>23</Text>}
                  left={(props) => <Avatar.Text size={64} color={Colors.sidebar_text} style={{backgroundColor:  'white'}} {...props} label={'Cashier'.slice(0, 1).toUpperCase()} />}
                  color={Colors.textdarkColor}
                />
         
            </Card>
              <ListItem itemDivider style={{backgroundColor: 'white'}} noBorder/> 
              


                 
                <ListItem icon onPress={()=> this.props.navigation.navigate("Printer_Setting")} noBorder>
                     <Left>
                            <Button style={{ backgroundColor: "#FFFFFF" }}>         
                                  <AntDesign name="printer" size={25} color={Colors.sidebar_text} />
                            </Button>
                     </Left>
                    <Body>
                            <Text style={{color: Colors.sidebar_text}}>Goods List</Text>
                    </Body>
                  
                </ListItem>

              

              


                <ListItem icon onPress={()=> this.props.navigation.navigate("App_Settings")} noBorder>
                     <Left>
                            <Button style={{ backgroundColor: "#FFFFFF" }}>         
                                  <AntDesign name="setting" size={25} color={Colors.sidebar_text} />
                            </Button>
                     </Left>
                    <Body>
                            <Text style={{color: Colors.sidebar_text}}>Reports</Text>
                    </Body>
                   
                </ListItem>

                <ListItem icon onPress={() => onClickRooms(createTask)} noBorder>
                     <Left>
                            <Button style={{ backgroundColor: "#FFFFFF" }}>         
                                  <AntDesign name="logout" size={25} color={Colors.sidebar_text} />
                            </Button>
                     </Left>
                    <Body>
                            <Text style={{color: Colors.sidebar_text}}>Add Rooms</Text>
                    </Body>
                   
                </ListItem>




                <ListItem icon onPress={()=> this.props.navigation.navigate("Printer_Setting")} noBorder>
                     <Left>
                            <Button style={{ backgroundColor: "#FFFFFF" }}>         
                                  <AntDesign name="printer" size={25} color={Colors.sidebar_text} />
                            </Button>
                     </Left>
                    <Body>
                            <Text style={{color: Colors.sidebar_text}}>Printer Settings</Text>
                    </Body>
                  
                </ListItem>














        </Content>
       
      </Container>

      </Overlay>
      <Button
        type="clear"
        titleStyle={styles.plusButton}
        title="&#x2630;"
        onPress={() => {
          setOverlayVisible(true);
        }}
      />
    </>
  );
}
