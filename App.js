/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import Solareumsdk from 'react-native-solareum-sdk';
import {Button, Input} from 'react-native-elements';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [address, onChangeAddress] = useState('');
  const [amount, onChangeAmount] = useState('');
  const [token, onChangeToken] = useState('');
  const [app_client_id, setAppClientId] = useState('');
  const [client_id, setClientId] = useState('');
  const [signature, setSignature] = useState('');
  const [status, setStatus] = useState('');

  const handleBackApp = event => {
    let cId = event['client_id'];
    let sign = event['signature'];
    let stt = event['status'];
    setSignature(sign);
    setStatus(stt);
    setClientId(cId);
  };

  const openSolareum = (address, token, amount, app_client_id, scheme) => {
    const pay = {
      address: address,
      token: token,
      client_id: app_client_id,
      quantity: amount,
      e_usd: '1',
      scheme: scheme,
    };

    console.log('pay:', pay);
    var str = JSON.stringify(pay);
    console.log('open solareum');
    Solareumsdk.pay(str);
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const getRandomString = () => {
    let result = '';
    const base =
      '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const baseLength = base.length;

    for (let i = 0; i < 20; i++) {
      const randomIndex = getRandomInt(0, baseLength);
      result += base[randomIndex];
    }

    return result;
  };

  const onPress = () => {
    if (address === '' || amount === '' || token === '') {
      Alert.alert('Fill information');
    } else {
      console.log('🎉 on press');
      openSolareum(address, token, amount, app_client_id, 'solareumexample');
    }
  };

  useEffect(() => {
    onChangeAddress('5FE7TnNxcfPERLoPbasDfqzVb57opS3xsZ88Uh2k7Kug');
    onChangeToken('XSB');
    onChangeAmount('10');
    const id = getRandomString();
    setAppClientId(id);
  }, []);

  useEffect(() => {
    Solareumsdk.subscribe().then(handleBackApp);
  }, [signature]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      backgroundColor="white">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.title}>Solareum SDK Example</Text>
      <View style={styles.sectionForm}>
        <Input
          label="Address"
          keyboardType="decimal-pad"
          placeholder="Enter address"
          value={address}
          onChangeText={value => onChangeAddress(value)}
        />
        <Input
          label="Token"
          keyboardType="decimal-pad"
          placeholder="Enter token"
          value={token}
          onChangeText={value => onChangeToken(value)}
        />
        <Input
          label="Amount"
          keyboardType="number-pad"
          placeholder="Enter amount"
          value={amount}
          onChangeText={value => onChangeAmount(value)}
        />
        <Input
          label="Client ID"
          keyboardType="decimal-pad"
          placeholder="Enter address"
          value={app_client_id}
          onChangeText={value => setAppClientId(value)}
        />
      </View>
      <View style={styles.openButton}>
        <Button title="Pay" onPress={onPress} />
      </View>
      <DataContainer
        client_id={client_id}
        signature={signature}
        status={status}
      />
    </ScrollView>
  );
};

const DataContainer = ({client_id, signature, status}) => {
  return (
    <View style={styles.sectionForm}>
      <Text style={styles.sectionTitle}>
        {' '}
        Client ID: <Text style={styles.sectionSubtitle}>{client_id}</Text>
      </Text>
      <Text style={styles.sectionTitle}>
        {' '}
        Signature: <Text style={styles.sectionSubtitle}>{signature}</Text>
      </Text>
      <Text style={styles.sectionTitle}>
        {' '}
        Status: <Text style={styles.sectionSubtitle}>{status}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    marginTop: 50,
    height: '100%',
    width: '100%',
  },

  sectionForm: {
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  openButton: {
    height: 50,
    marginTop: 30,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#1e88f7',
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    marginBottom: 40,
  },

  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default App;
