/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, {useEffect} from 'react';

 import {
   SafeAreaView,
   Button,
   StatusBar,
   StyleSheet,
   useColorScheme,
   View,
   Alert
 } from 'react-native';
 import {Colors} from 'react-native/Libraries/NewAppScreen';
 import Solareumsdk from 'react-native-solareum-sdk';
 
 const App =()  => {
   const isDarkMode = useColorScheme() === 'dark';
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
 
 
   const handleBackApp = (event) => {
     console.log("App = ",event);
     console.log(typeof(event));     
     let client_id = event["client_id"]
     let signature = event["signature"]
     let status = event["status"]
     Alert.alert(client_id + signature + status);
   }
 
   useEffect(()=>{
     Solareumsdk.subscribe({
       handleEvent: handleBackApp
     })
   }, [])
 
 
  
   
   const openSolareum = () => {
    const pay = {
      'address': "huong",
      'token': 'USDC',
      'client_id': "0918822343",
      'quantity': 0.1,
      'e_usd': 1,
      'scheme': "solareumexample"
     }
     var str = JSON.stringify(pay);
     console.log('open solareum');
     Solareumsdk.pay(str);
   };
 
 
   return (
     <SafeAreaView style={backgroundStyle}>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <View style={styles.sectionContainer}>
         <Button title="Open Solareum" onPress={openSolareum}>
         </Button>
       </View>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 10,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 
 
 