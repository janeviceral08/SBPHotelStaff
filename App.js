import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthProvider } from "./providers/AuthProvider";
import { TasksProvider } from "./providers/TasksProvider";
import { AccountSettings } from "./views/AccountSettings";
import { Chatroom } from "./views/Chatroom";
import { ChatDetails } from "./views/ChatDetails";
import { WelcomeView } from "./views/WelcomeView";
import { ProjectsView } from "./views/ProjectsView";
import { TasksView } from "./views/TasksView";
import { RoomsView } from "./views/RoomsView";
import { GoodsView } from "./views/GoodsView";
import { DetailsView } from "./views/DetailsView";
import { DailyPromoCheckinSheet } from "./views/DailyPromoCheckinSheet";
import { HourPromoCheckinSheet } from "./views/HourPromoCheckinSheet";
import { HourCheckinSheet } from "./views/HourCheckinSheet";
import { PromoActionSheet } from "./views/PromoActionSheet";
import { PrinterSettings } from "./views/PrinterSettings";
import { Maintenance } from "./views/Maintenance";
import { Clean } from "./views/Clean";
import Colors from './Colors';
import { UserInfo } from './components/UserInfo';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Signup } from "./views/Signup";
import { ForConfirm } from "./views/ForConfirm";
import { ConfirmItem } from "./views/ConfirmItem";
import { Confirmed } from "./views/Confirmed";
import { TWConfirmed } from "./views/TWConfirmed";
import { TWConfirmedItem } from "./views/TWConfirmedItem";
import { ConfirmedItem } from "./views/ConfirmedItem";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";





const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTab=({children, onPress}) =>(
  <TouchableOpacity
  style={{
    top: -30,
    justifyContent: 'center',
  alignItems: 'center',...styles.shadow}}
  onPress={onPress}>
    <View
    style={{
      width: 50,
      height: 50,
      borderRadius: 35,
      backgroundColor: 'red'
    }}
    
    >
      {children}
    </View>
  </TouchableOpacity>
);

function Home() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name="TasksView" 
        component={TasksView} 
        options={{headerShown:false}}
        />  
        <Stack.Screen 
        name="Clean" 
        component={Clean} 
        options={{headerShown:false}}
        />  
        <Stack.Screen 
        name="Maintenance" 
        component={Maintenance} 
        options={{headerShown:false}}
        />  
        <Stack.Screen 
        name="ForConfirm" 
        component={ForConfirm} 
        options={{headerShown:false}}
        /> 
        <Stack.Screen 
        name="Confirmed" 
        component={Confirmed} 
        options={{headerShown:false}}
        />
        <Stack.Screen 
        name="ConfirmItem" 
        component={ConfirmItem} 
        options={{headerShown:false}}
        /> 
        <Stack.Screen 
        name="ConfirmedItem" 
        component={ConfirmedItem} 
        options={{headerShown:false}}
        /> 
         <Stack.Screen 
        name="TWConfirmed" 
        component={TWConfirmed} 
        options={{headerShown:false}}
        /> 
           <Stack.Screen 
        name="TWConfirmedItem" 
        component={TWConfirmedItem} 
        options={{headerShown:false}}
        /> 
        <Stack.Screen 
        name="PrinterSettings" 
        component={PrinterSettings} 
        options={{headerShown:false}}
        />  
        <Stack.Screen 
        name="chat" 
        component={chat} 
        options={{headerShown:false}}
        />  
            <Stack.Screen 
        name="AccountSettings" 
        component={AccountSettings} 
        options={{headerShown:false}}
        />
        
    </Stack.Navigator>
  );
}

function Goods() {
  return (
    <Stack.Navigator>
           <Stack.Screen 
        name="GoodsView" 
        component={GoodsView} 
        options={{headerShown:false}}/>  
    </Stack.Navigator>
  );
}
function chat() {
  return (
    <Stack.Navigator>
          <Stack.Screen 
        name="Chatroom" 
        component={Chatroom} 
        options={{headerShown:false}}
        /> 
        <Stack.Screen 
        name="ChatDetails" 
        component={ChatDetails} 
        options={{headerShown:false}}
        /> 
    </Stack.Navigator>
  );
}



function TabScreen() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: Colors.BackColor,
      inactiveTintColor: '#ffffff',
      style: {
        backgroundColor: Colors.bottom_nav_background,
    
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
      
    }}
    initialRouteName="Home"
    >
       
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused, color, size, tintColor}) => (
              <AntDesign name={'home'} size={25} color={color}  style={{ paddingTop: 2}} active={focused}/>
            ),
            
          }}
        
        />    
        
        <Tab.Screen 
            name="HomeStackScreen" 
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Guest',
              tabBarIcon: ({focused, color, size, tintColor}) => (
                <Ionicons name={'bed-outline'} size={25} color={color}  style={{ paddingTop: 2}} active={focused}/>
              ),
            }} 
            />  
              <Tab.Screen 
            name="Goods" 
            component={Goods} 
            options={{
              tabBarLabel: 'Goods',
              tabBarIcon: ({focused, color, size, tintColor}) => (
                <AntDesign name={'shoppingcart'} size={25} color={color}  style={{ paddingTop: 2}} active={focused}/>
              ),
           
            }}
            
            />   
    </Tab.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoomsView"
        component={RoomsView}
        options={{headerShown:false}}
      />
       <Stack.Screen
        name="DetailsView"
        component={DetailsView}
        options={{
          headerShown:false,
          tabBarVisible:false,
        }}
        tabBarOptions={{
          tabStyle: {height: 0},
          style: {backgroundColor: 'transparent'}
        }}
      />
      <Stack.Screen
        name="DailyPromoCheckinSheet"
        component={DailyPromoCheckinSheet}
        options={{headerShown:false,tabBarVisible:false,}}
      />
      <Stack.Screen
        name="HourPromoCheckinSheet"
        component={HourPromoCheckinSheet}
        options={{headerShown:false,tabBarVisible:false,}}
      />
      <Stack.Screen
        name="HourCheckinSheet"
        component={HourCheckinSheet}
        options={{headerShown:false,tabBarVisible:false,}}
      />
      <Stack.Screen
        name="PromoActionSheet"
        component={PromoActionSheet}
        options={{headerShown:false,tabBarVisible:false,}}
      />
       <Stack.Screen 
        name="ChatDetails" 
        component={ChatDetails} 
        options={{headerShown:false}}
        /> 
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome View"
            component={WelcomeView}
            options={{headerShown:false}}
          />
           <Stack.Screen
            name="UserInfo"
            component={UserInfo}
            options={{ title: "UserInfo"}}
          />
             <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown:false}}
          />
          <Stack.Screen
            name="Hotels"
            component={ProjectsView}
            title="ProjectsView"
         
          />
          <Stack.Screen 
        name="AccountSettings" 
        component={AccountSettings} 
        options={{headerShown:false}}
        />
    
          <Stack.Screen name="Home"  options={{headerShown: false}}>
            {(props) => {
              const { navigation, route } = props;
              const { user, projectPartition, expiration } = route.params;
              return (
                <TasksProvider user={user} projectPartition={projectPartition} expiration={expiration}>
                  <TabScreen navigation={navigation} route={route} />
                </TasksProvider>
              );
            }}
          </Stack.Screen>


        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};
const styles = StyleSheet.create({
  shadow:{
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius:3.5,
    elevation:5
  }
})

export default App;
