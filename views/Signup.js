import React, { useEffect, useState } from "react";
import { Container, View, Button, Icon, Item, Input, Label, Header } from 'native-base';
import {
  TouchableOpacity,Text, Alert

 } from 'react-native';
import Colors from '../Colors';
import Loader from '../components/styles/Loader'

import Toast from "react-native-simple-toast";
import { useAuth } from "../providers/AuthProvider";
import styles from "../stylesheet";

export function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [acPass, setacPass] = useState("eye");
  const [sec, setsec] = useState(false);
  const { user, signUp, signIn, ups } = useAuth();

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.
    if (user != null) {
      navigation.replace("Projects");
    }
  }, [user]);

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressSignIn = async () => {

    setLoading(true)
    try {
     await signIn(email, password);
    } catch (error) {
      setLoading(false)
      Alert.alert(`Failed to sign in: ${error.message}`);
     
    }
  };

  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.
  const onPressSignUp = async () => {
  
    setLoading(true)
    try {
      const up= await signUp(email, password);
       //Alert.alert(`Failed to sign up: ${error.message}`);
       ups()
      signIn(email, password);
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  return (


  <Container style={{backgroundColor:  Colors.BackColor}}>
         <Header androidStatusBarColor={ Colors.BackColor} style={{backgroundColor:  Colors.BackColor, display:'none'}}>
          
        </Header>
        <Loader loading={Loading} />
   
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
          <View style={{marginBottom: 35, width: '100%'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'left', width: '100%', color: Colors.navbarBackgroundColor}}>H O T E L   B O O K I N G S </Text>
            <Text style={{fontSize: 18, textAlign: 'left', width: '100%', color: Colors.texColor}}>Please Signup  </Text>
          </View>
          <Item floatingLabel>
        
          <Icon type='MaterialIcons' active name='person' style={{color: Colors.texColor}}  />
          
          <Label style={{color: 'white', marginLeft: 10}}>Email</Label>
              
              <Input style={{color: 'white'}} autoCompleteType={'email'}
                       
                        keyboardType={'email-address'} onChangeText={(text) =>setEmail(text)}  />
          </Item>
          <Item floatingLabel>
              <Icon type='MaterialIcons' active name='vpn-key' style={{color: Colors.texColor}} />
              <Label style={{color: 'white', marginLeft: 10}}>Password</Label>
              <Input style={{color: 'white'}} autoCapitalize = "none" onChangeText={(text) => setPassword(text)} secureTextEntry={sec}/>
{acPass =='eye'?
<Icon type='Octicons' active name={acPass} style={{color: 'black'}} onPress={()=> {setacPass('eye-closed'); setsec(true)}}/>
:
<Icon type='Octicons' active name={acPass} style={{color: 'black'}} onPress={()=> {setacPass('eye'); setsec(false)}}/>
}
              
          </Item>
          
         
        
          <View style={{alignItems: 'center', width: '100%'}}>
            <Button onPress={onPressSignUp} style={{backgroundColor: Colors.navbarBackgroundColor, marginTop: 20, width: '100%'}}>
              <Text style={{color: '#fdfdfd' , paddingLeft: 75, fontWeight: 'bold', fontSize: 20, }}>     Sign In    </Text>
            </Button>
          </View>
        </View>
       
      </Container>
  );
}
