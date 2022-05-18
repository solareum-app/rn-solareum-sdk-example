/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, {useEffect,useState} from 'react';

 import {
   SafeAreaView,
   Button,
   StatusBar,
   StyleSheet,
   useColorScheme,
   View,
   Alert,
   Text,
   TextInput
 } from 'react-native';
 import {Colors} from 'react-native/Libraries/NewAppScreen';
 import Solareumsdk from 'react-native-solareum-sdk';
 



 const App =()  => {
   const isDarkMode = useColorScheme() === 'dark';
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
   
   const [address,onChangeAddress] = useState("");
   const [amount,onChangeAmount] = useState("");
   const [token,onChangeToken] = useState("");

   const [client_id,setClientId] = useState("")
   const [signature, setSignature] = useState("")
   const [status, setStatus] = useState("")

 
   const handleBackApp = (event) => {    
     let client_id = event["client_id"]
     let signature = event["signature"]
     let status = event["status"]
     setClientId(client_id)
     setSignature(setSignature)
     setStatus(setStatus)
   }




   const openSolareum = (address,token,amount,client_id,scheme) => {
    const pay = {
      'address': address,
      'token': token,
      'client_id': client_id,
      'quantity': amount,
      'scheme': scheme
     }
     var str = JSON.stringify(pay);
     console.log('open solareum');
     Solareumsdk.pay(str);
   };
 


 
 const getRandomInt = (min, max) => {
   return Math.floor(Math.random() * (max - min)) + min;
 };
 
 const getRandomString = () => {
   let result = "";
   const base =   "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
   const baseLength = base.length;
 
   for (let i = 0; i < 20; i++) {
     const randomIndex = getRandomInt(0, baseLength);
     result += base[randomIndex];
   }
 
   return result;
 };
 
   const onPress = () =>{
     if (address === "" || amount === "" || token === ""){
       Alert.alert("Fill information")
     }else{
      const client_id = getRandomString();
      openSolareum(address,token,amount,client_id,"solareumexample")
     }     
   }
 
   useEffect(()=>{
     Solareumsdk.subscribe().then(handleBackApp)
   }, [])
 
 
   
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <View style = {styles.center}>
       <View style = {styles.sectionForm}>
        <Text style = {styles.sectionTitle}> Address </Text>
        <TextInput 
              style = {styles.sectionTextInput} 
              placeholder='Enter your address'
              value = {address}
              onChangeText = {(text) => onChangeAddress(text)}>
                
        </TextInput>
        <Text style = {styles.sectionTitle}> Token </Text>
        <TextInput 
              style = {styles.sectionTextInput} 
              placeholder='Enter token'
              value = {token}
              onChangeText = {(text) => onChangeToken(text)}>
      
          </TextInput> 
         <Text style = {styles.sectionTitle}> Amount </Text>
         <TextInput 
              style = {styles.sectionTextInput} 
              placeholder='Enter amount'
              value = {amount}
              onChangeText = {(text) => onChangeAmount(text)}
              keyboardType="numeric">
          </TextInput>
      </View>
       <View style={styles.openButton}>        
         <Button title="Open Solareum" onPress={onPress}>
         </Button>
       </View>
       </View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({

  center :{
    display : "flex",
    // justifyContent: "center",
    marginTop: 50,
    height: "100%",
    width: "100%"
  },

  sectionForm: {
    paddingTop: 20,
    marginLeft: 10,
    marginLeft: 10
  },
   openButton: {
    height: 50,
    marginTop: 30,
    paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 20,
     fontWeight: '500',
     marginBottom: 10,
     marginTop: 10
   },



   sectionTextInput:{
     marginTop: 10,
     marginLeft: 20,
     marginRight: 20
   },
  
  
 });
 
 export default App;
 
 
 