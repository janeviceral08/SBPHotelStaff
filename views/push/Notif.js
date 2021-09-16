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

 class Notif extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
  }

  componentDidMount (){
    console.log('checkinStat componentDidMount: ', this.props.checkinStat.length)
    
    
    
    
    /*
    this.props.TodayReserveInfo.map((item,index)=>{
      let countDownDate = new Date(item.in_check*1000)
    let now = new Date().getTime();
    let distance = countDownDate - now;
   
    let minutes30 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)-30);
    console.log('res: ', minutes30)
      this.notif.scheduleNotifforReserve('sample.mp3', minutes30, item.in_check, item.reservation_code)}
      )
      this.props.checkinStat.map((item,index)=>{
        let countDownDate = new Date(item.check_out*1000)
      let now = new Date().getTime();
      let distance = countDownDate - now;
     
      let minutes30 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)-30);
      console.log('ck: ',item.room_no + minutes30)
      this.notif.scheduleNotif('sample.mp3', minutes30, item.room_no, item.check_out, item.temp_id)}
      )
    Toast.show('Notification has been set')
  */
  }

  render() {
    /*console.log('checkinStat: ', this.props.checkinStat.length)

    this.notif.getScheduledLocalNotifications(notifs => {

      console.log('notifs',notifs.length);
   var arr2 = notifs.map(v => ( v.id ));

  console.log('result',arr2);
  var filteredDataTodayReserveInfo = this.props.TodayReserveInfo.filter(function(item) {
    return arr2.indexOf(item.reservation_code) == -1;
});
var filteredDatacheckinStat = this.props.checkinStat.filter(function(item) {
  return arr2.indexOf(item.updated_at) == -1;
});

console.log('filteredDataTodayReserveInfo: ',filteredDataTodayReserveInfo.length);
console.log('filteredDatacheckinStat: ',filteredDatacheckinStat.length);
 
filteredDatacheckinStat.length > 0?
filteredDatacheckinStat.map((item,index)=>{
  let countDownDate = new Date(item.check_out*1000)
  let now = new Date().getTime();
  let distance = countDownDate - now;
  let minutes30 = Math.round(distance / 60000-30);
  console.log('minutes30: ', minutes30)
  this.notif.scheduleNotif('sample.mp3', minutes30, item.room_no, item.check_out,item.updated_at)})
  :
 null

    filteredDataTodayReserveInfo.length > 0?
    filteredDataTodayReserveInfo.map((item,index)=>{
      let countDownDate = new Date(item.in_check*1000)
      let now = new Date().getTime();
      let distance = countDownDate - now;
      let minutes30 = Math.round(distance / 60000-1440);
      console.log('minutes30 sched: ', Math.round(distance / 60000-1440))
      this.notif.scheduleNotifforReserve('sample.mp3', minutes30, item.in_check, item.reservation_code)})
    :
  null

     
    })*/


    return (
      <View style={styles.container}>
          
              <TouchableOpacity
              style={styles.button}
              onPress={() => {
               // this.notif.cancelAll();
           //    this.notif.getScheduledLocalNotifications(notifs =>{ console.log('getScheduledLocalNotifications: ',notifs.length)


              // var arr2 = notifs.map(v => ( v.message ));
             //  var filteredDatacheckinStat = this.props.checkinStat.filter(function(item) {
             //   return arr2.indexOf(item.temp_id) == -1;
             // })
            //console.log('filteredDatacheckinStat: ', filteredDatacheckinStat.length)
           // });
               // this.notif.getDeliveredNotifications(notifs => console.log('getDeliveredNotifications: ', notifs));
                this.props.checkinStat.map((item,index)=>{
                  let countDownDate = new Date(item.check_out*1000)
                let now = new Date().getTime();
                let distance = countDownDate - now;
               
                let minutes30 = Math.round(distance / 60000-1440)
                console.log('ck: ',item.room_no + minutes30)
                this.notif.scheduleNotif('sample.mp3', minutes30, item.room_no, item.check_out,item.temp_id)}
                )
              
                Toast.show('Notification has been set')
              }}
              disabled={this.props.checkinStat.length > 0 ? false:true}>
              <Text>Press to Receive Check-out Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                //this.notif.cancelAll();
               // this.notif.getScheduledLocalNotifications(notifs => console.log('getScheduledLocalNotifications: ',notifs));
              
                this.props.TodayReserveInfo.map((item,index)=>{
                  let countDownDate = new Date(item.in_check*1000)
                let now = new Date().getTime();
                let distance = countDownDate - now;
               
                let minutes30 =Math.round(distance / 60000-1440)
               // console.log('res: ', minutes30)
                  this.notif.scheduleNotifforReserve('sample.mp3', minutes30, item.in_check, item.reservation_code)}
                  )
                Toast.show('Notification has been set')
              }}
              disabled={this.props.checkinStat.length > 0 ? false:true}>
              <Text>Press to Receive Reservation Notification</Text>
            </TouchableOpacity>
      </View>
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
    flexDirection: 'row',
    marginTop: -10
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 5,
    padding: 5,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e87b1c',
    borderRadius: 5,
  },
});
export default Notif;