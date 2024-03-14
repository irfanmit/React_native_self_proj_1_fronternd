import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';

//context
import { Context } from '../store/context';

//https
import { login } from '../utils/https';

//asyncStor
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  
  const [currentUser , setCurrentUser] = useState({
    
  }); 

  const navigation = useNavigation();
  const ctx = useContext(Context);
  
  const handleLogin = async() => { 
    const data = await login(username, password)
    console.log("printing dats after login ", data.token);
    ctx.value.setToken(data.token);
    if(data){
      // console.log(data.userData);
      ctx.value.setCurrentUserData(data.userData)
      
      setCurrentUser({...currentUser, ...data.userData})
      
      navigation.navigate('BottomNavigator');
    }
  };

  React.useEffect(() => {
    if (ctx.value.token) {
      console.log("validating token.............");
      try {
        fetch('http://192.168.202.161:8000/auth', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + ctx.value.token, 
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              ctx.setLogin(true);
            } else {
              ctx.setLogin(false);
            }
          })
          .catch((error) => {
            ctx.setLogin(false);
            console.error('Authentication status check failed:', error);
          });
      } catch (error) {
        console.error('Authentication status check failed:', error);
      }
    }
  }, [ctx.value.token]);

  const navigate_singup = () => {
    navigation.navigate('Signup');
  }

  return (
    <View style={{justifyContent : 'center', alignitems: 'center', marginTop: 100}}>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput   
        placeholder="Mobile Number"
        value={mobileNo}
        onChangeText={setMobileNo}
        keyboardType="phone-pad" // This sets the keyboard type to numeric
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="signup?" onPress={navigate_singup}/>
    </View>
  );
};

export default Login;
