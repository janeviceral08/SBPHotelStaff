import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get('window').width;

import { ActionSheet } from "./ActionSheet";
import { HourActionSheet } from "./HourActionSheet";
import { PromoActionSheet } from "./PromoActionSheet";
import { useTasks } from "../providers/TasksProvider";
import Colors from '../Colors';
export function TaskItem({ task, vac, occ }) {
  const { rooms,checkin,expiration, Order, Booking } = useTasks();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [HourActionSheetVisible, setHourActionSheet] = useState(false);
  const [PromoActionSheetVisible, setPromoActionSheet] = useState(false);
  const vacnts = () => {
    const filter = task.temp_id;
    const filterRes = rooms.filter((task) => {return(task.room_type_id.indexOf(filter) >= 0 && task.status == "Available")})
    return filterRes.length
  }
  
  
  const occs = () => {
    const filter = task.temp_id;
    const filterRes = checkin.filter((task) => {return(task.room_type_id.indexOf(filter) >= 0 && task.status == "Available")})
    return filterRes.length
  }
  
  // For each possible status other than the current status, make an action to
  // move the task into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
const overlay_tab = (task) => {
  task.rate_mode =='Daily'?
  setActionSheetVisible(true):
  task.rate_mode =='Hour'?
  setHourActionSheet(true):
  setPromoActionSheet(true)
}

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (task.status) {
            setActionSheetVisible(false);
          }
        }}
  
        roomTypeInfo={task}
      />
      <HourActionSheet
        visible={HourActionSheetVisible}
        closeOverlay={() => {
          if (task.status) {
            setHourActionSheet(false);
          }
        }}
   
        roomTypeInfo={task}
      />
      <PromoActionSheet
        visible={PromoActionSheetVisible}
        closeOverlay={() => {
          if (task.status) {
            setPromoActionSheet(false);
          }
        }}
        roomTypeInfo={task}
      />
     <TouchableOpacity
     
      key={task.id}
      onPress={() => {overlay_tab(task)
      }}
     
    >
      <Text style={style.itemName} numberOfLines={1}>{task.name+ ' -'+ task.rate_mode}</Text>
      <Text style={style.itemCode1}>Vacant:       {vacnts()}</Text>
  <Text style={[style.itemCode2]}>Occupied:   {occs()}</Text>
      </TouchableOpacity>

    </>
  );
}

const style = StyleSheet.create({

  itemName: {
    textAlign: 'center',
    fontSize: SCREEN_WIDTH > 500? 15: 18,
    color:Colors.bottom_nav_background,
    fontWeight:'bold',
  },
  itemCode1: {
    color: Colors.bottom_nav_background,
    color: '#e87b1c',   fontSize: SCREEN_WIDTH > 500? 15: 18,fontWeight: 'bold',
    textAlign: 'center'
  },
  itemCode2: {
    color: 'gray',   fontSize: SCREEN_WIDTH > 500? 15: 18, fontWeight: 'bold',
    textAlign: 'center'
  },
  
  
  });
  