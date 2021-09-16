import React, { useState, useEffect }  from "react";
import { View, Button , Alert, ScrollView} from "react-native";
import { FAB, Portal, Provider } from 'react-native-paper';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { useAuth } from "../providers/AuthProvider";
import { ListItem } from "react-native-elements";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export function ProjectsView({ navigation }) {
  const { projectData, userData, signOut } = useAuth();
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const navigations = useNavigation();

  const { open } = state;

  // the onClickProject navigates to the Task List with the project name
  // and project partition value
  const onClickProject = async (project) => {


    navigation.replace("Home", {
      name: project.name,
      projectPartition: project.partition,
      expiration: project.expiration
    });
  };




  return (
    <View style={{height: '100%'}}>
       {userData.userType=="Maintenance"?
           null
:  <ScrollView>
{projectData.map((project) => (
  project.name == 'My Hotel'? null:
  project.expiration == null?
  <TouchableOpacity  key={project.name} onPress={() =>  Alert.alert('You Sucessfully Created an account!','Email us for setting up.')}>
  <Card>
      <CardItem>
        <Body>
          <Text>
          {project.name}
          </Text>
        </Body>
      </CardItem>
    </Card>
    </TouchableOpacity>
  :
  project.expiration <= moment().unix() ?
  <TouchableOpacity  key={project.name}  onPress={() => Alert.alert('Duration Already Expired','Email us for extension or any questions.')}>
  <Card>
      <CardItem>
        <Body>
          <Text>
          {project.name}
          </Text>
        </Body>
      </CardItem>
    </Card>
    </TouchableOpacity>
 
  
:
<TouchableOpacity  key={project.name} onPress={() => onClickProject(project)}>
<Card>
    <CardItem>
      <Body>
        <Text>
        {project.name}
        </Text>
      </Body>
    </CardItem>
  </Card>
  </TouchableOpacity>

))}


</ScrollView>}
    
<Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'gesture-tap' : 'gesture-tap'}
          actions={
            [
              {
                icon: 'logout-variant',
                label: 'Logout',
                onPress: () =>{  Alert.alert("Log Out", null, [
                  {
                    text: "Yes, Log Out",
                    style: "destructive",
                    onPress: () => {
                      signOut();
                      navigations.replace('Welcome View');
                    },
                  },
                  { text: "Cancel", style: "cancel" },
                ]);},
              },
            
           
              {
                icon: 'shield-account',
                label: 'Account Information',
                onPress: () => navigation.navigate('AccountSettings'),
              },
            
             
            ]
        
        }
       
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
    </View>
  );
}
