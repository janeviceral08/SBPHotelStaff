import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NotifService from './NotifService';
import Toast from "react-native-simple-toast";

 class addNotif extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
    
   
  }

  render() {
  //  console.log('checkinStat: ', this.props.checkinStat.length)
  //this.notif.cancelAll();
  var countDownDate = new Date(this.props.out*1000)
  var now = new Date().getTime();
  var distance = countDownDate - now;
 
  var minutes30 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)-30);
 
  this.notif.scheduleNotif('sample.mp3', minutes30, this.props.room, this.props.out, this.props.temp_id)
  Toast.show('Notification has been set')
    return (
      {/*<View style={styles.container}>
              
              <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Toast.show('Notification has been set')
              }}
              disabled={this.props.checkinStat.length > 0 ? false:true}>
              <Text>Press to Receive Notification of Checkout</Text>
            </TouchableOpacity>
    
            </View>*/}
    );
  }

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e87b1c',
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e87b1c',
    borderRadius: 5,
  },
});
export default addNotif;