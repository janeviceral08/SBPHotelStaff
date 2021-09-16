import React, { useState, useEffect }  from "react";
import { Container, Content, View,  Left, Right, Icon, Card, CardItem, Badge, Text,
    Body, 
} from 'native-base';
var {height, width } = Dimensions.get('window');
import FastImage from 'react-native-fast-image';
import {ActivityIndicator,
Platform,
StyleSheet,


Button,
ScrollView,
DeviceEventEmitter,
NativeEventEmitter,
Switch,
TouchableOpacity,
Dimensions,
ToastAndroid} from 'react-native';
import {BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter} from "react-native-bluetooth-escpos-printer";
import { set } from "lodash";
var {height, width} = Dimensions.get('window');
const BannerWidth = Dimensions.get('window').width;





export function PrinterSettings({ navigation }) {
    const [devices, setdevices]= useState(null)
    const [pairedDs, setpairedDs]= useState([])
    const [foundDs, setfoundDs]= useState([])
    const [bleOpend, setbleOpend]= useState(true)
    const [loading, setloading]= useState(true)
    const [boundAddress, setboundAddress]= useState('')
    const [debugMsg, setdebugMsg]= useState('')
    const [name, setname]= useState('')
   const _listeners = [];




   const _deviceAlreadPaired=(rsp)=> {
    var ds = null;
    if (typeof(rsp.devices) == 'object') {
        ds = rsp.devices;
    } else {
        try {
            ds = JSON.parse(rsp.devices);
        } catch (e) {
        }
    }
    if(ds && ds.length) {
        let pared = pairedDs;
        pared = pared.concat(ds||[]);
        setpairedDs(pared)
        
    }
}


const _renderRow = (rows) => {
    let items = [];
    for(let i in rows){
        let row = rows[i];
        if(row.address) {
            items.push(
                <TouchableOpacity key={new Date().getTime()+i} style={styles.wtf} onPress={()=>{
                    setloading(true)
               
                BluetoothManager.connect(row.address)
                    .then((s)=>{
                        setloading(false)
                        setboundAddress(row.address)
                        setname(row.name || "UNKNOWN")
                       
                    },(e)=>{
                        setloading(false)
                        
                        alert(e);
                    })

            }}>
                {
                    name ==row.name?<CardItem bordered style={{backgroundColor: '#5bb1cd'}}>
                    <Body>
                    <Text style={styles.name}>{row.name || "UNKNOWN"}</Text><Text
                              style={[styles.address],{fontSize: 11}}>{row.address}</Text>
                    </Body>
                  </CardItem>
                  :
                  <CardItem bordered>
          <Body>
          <Text style={styles.name}>{row.name || "UNKNOWN"}</Text><Text
                    style={[styles.address],{fontSize: 11}}>{row.address}</Text>
          </Body>
        </CardItem>
                }

                 
                
                
         </TouchableOpacity>
            );
        }
    }
    return items;
}





   useEffect(() => {

    BluetoothManager.isBluetoothEnabled().then((enabled)=> {
            setbleOpend(Boolean(enabled))
            setloading(false)
    }, (err)=> {
        err
    });

    _listeners.push(DeviceEventEmitter.addListener(
      BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp)=> {
          _deviceAlreadPaired(rsp)
      }));
  
  _listeners.push(DeviceEventEmitter.addListener(
      BluetoothManager.EVENT_CONNECTION_LOST, ()=> {
          setname('')
          setboundAddress('')
      }
  ));
  _listeners.push(DeviceEventEmitter.addListener(
      BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, ()=> {
          ToastAndroid.show("Device Not Support Bluetooth !", ToastAndroid.LONG);
      }
  ))
    

          }, []);






          const _selfTest=()=> {
            setloading(false)
            
        }
        
        const _scan = ()=> {
            setloading(false)
            BluetoothManager.scanDevices()
                .then((s)=> {
                    var ss = s;
                    var found = ss.found;
                    try {
                        found = JSON.parse(found);//@FIX_it: the parse action too weired..
                    } catch (e) {
                        //ignore
                    }
                    var fds =  this.state.foundDs;
                    if(found && found.length){
                        fds = found;
                    }
                    setfoundDs(fds)
                    setloading(false)
                   
                }, (er)=> {
                    setloading(false)
                    console.log('error' + JSON.stringify(er));
                });
        }
        
        


  return (
    <Container style={{backgroundColor: '#f4f5f9'}}>
            <Content>
            <ScrollView style={styles.container}>
                  <View><Text>Bluetooth:  <Switch value={bleOpend} onValueChange={(v)=>{
                setloading(true)
                if(!v){
                   BluetoothManager.enableBluetooth().then((r)=>{
                        var paired = [];
                        if(r && r.length>0){
                            for(var i=0;i<r.length;i++){
                                try{
                                    paired.push(JSON.parse(r[i]));
                                }catch(e){
                                    //ignore
                                }
                            }
                        }
                            setbleOpend(false)
                            setloading(false)
                            setpairedDs(paired)
                    },(err)=>{
                        setloading(false)
                        alert(err)
                    });

                }else{
                    BluetoothManager.enableBluetooth().then((r)=>{
                        var paired = [];
                        if(r && r.length>0){
                            for(var i=0;i<r.length;i++){
                                try{
                                    paired.push(JSON.parse(r[i]));
                                }catch(e){
                                    //ignore
                                }
                            }
                        }
                            setbleOpend(false)
                            setloading(false)
                            setpairedDs(paired)
                    },(err)=>{
                        setloading(false)
                        alert(err)
                    });
                }
            }}/></Text>
               
                    <Button disabled={loading || !bleOpend} onPress={()=>{
                        _scan();
                    }} title="Scan"/>
                </View>
                
               
                

                <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Paired Device:</Text>
            </CardItem>
            {loading ? (<ActivityIndicator animating={true}/>) : null}
            
            {
                _renderRow(pairedDs)
            }
         
          </Card>
        </Content>
              
               

                <Button disabled={loading || boundAddress.length <= 0}
                        title="Print Receipt Testing" onPress={async () => {
                          try {
                            
                              await BluetoothEscposPrinter.printerInit();
                              await BluetoothEscposPrinter.printerLeftSpace(0);
      
                              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                              await BluetoothEscposPrinter.setBlob(0);
                              await  BluetoothEscposPrinter.printText("Hotel Booking\r\n", {
                                  encoding: 'GBK',
                                  codepage: 0,
                                  widthtimes: 2,
                                  heigthtimes: 2,
                                  fonttype: 1
                              });
                              await BluetoothEscposPrinter.setBlob(0);
                              await  BluetoothEscposPrinter.printText("names\r\n", {
                                  encoding: 'GBK',
                                  codepage: 0,
                                  widthtimes: 0,
                                  heigthtimes: 0,
                                  fonttype: 1
                              });
                              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                              await  BluetoothEscposPrinter.printText("namess：name12\r\n", {});
                              await  BluetoothEscposPrinter.printText("32：xsd201909210000001\r\n", {});
                              await  BluetoothEscposPrinter.printText("23：" + (new Date(), "yyyy-mm-dd h:MM:ss") + "\r\n", {});
                              await  BluetoothEscposPrinter.printText("gt：18664896621\r\n", {});
                              await  BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                              let columnWidths = [12, 6, 6, 8];
                              await BluetoothEscposPrinter.printColumn(columnWidths,
                                  [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                  ["sdf", 'sd', 'fe', 'a'], {});
                              await BluetoothEscposPrinter.printColumn(columnWidths,
                                  [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                  ["React-Native-sample-text if we printed this out", '1', '32000', '32000'], {});
                              await  BluetoothEscposPrinter.printText("\r\n", {});
                              await BluetoothEscposPrinter.printColumn(columnWidths,
                                  [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                                  ["React-NativeReact-Native-sample-text if we printed this out1", '1', '32000', '32000'], {});
                              await  BluetoothEscposPrinter.printText("\r\n", {});
                              await  BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                              await BluetoothEscposPrinter.printColumn([12, 8, 12],
                                  [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                                  ["123d", '2', '64000'], {});
                              await  BluetoothEscposPrinter.printText("\r\n", {});
                              await  BluetoothEscposPrinter.printText("re：100%\r\n", {});
                              await  BluetoothEscposPrinter.printText("oit：64000.00\r\n", {});
                              await  BluetoothEscposPrinter.printText("gts：0.00\r\n", {});
                              await  BluetoothEscposPrinter.printText("vd：0.00\r\n", {});
                              await  BluetoothEscposPrinter.printText("sx：64000.00\r\n", {});
                              await  BluetoothEscposPrinter.printText("sdw：ut\r\n", {});
                              await  BluetoothEscposPrinter.printText("sd：sd\r\n", {});
                              await  BluetoothEscposPrinter.printText("sd：sd\r\n", {});
                              await  BluetoothEscposPrinter.printText("sd：" + (new Date(), "yyyy-mm-dd h:MM:ss") + "\r\n", {});
                              await  BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                              await  BluetoothEscposPrinter.printText("sd：\r\n", {});
                              await  BluetoothEscposPrinter.printText("sdw:\r\n\r\n", {});
                              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                              await  BluetoothEscposPrinter.printText("dfd\r\n\r\n\r\n", {});
                              await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                              await  BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
                          } catch (e) {
                              alert(e.message || "ERROR");
                          }
      
                      }}/>
            </ScrollView>

            </Content>
  </Container>
  );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    
    title:{
        width:width,
        backgroundColor:"#eee",
        color:"#232323",
        paddingLeft:8,
        paddingVertical:4,
        textAlign:"left"
    },
    wtf:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    name:{
        flex:1,
        textAlign:"left"
    },
    address:{
        flex:1,
        textAlign:"right"
    }
    });