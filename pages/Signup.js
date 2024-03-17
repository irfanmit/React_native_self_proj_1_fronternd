import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";

import { useNavigation } from "@react-navigation/native";

//https
import { signup } from "../utils/https";
import { Context } from "../store/context";

//notify
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [Name, setName] = useState("");
  const [sending, setSending] = useState(false);

  const navigation = useNavigation();
  const ctx = useContext(Context);


  React.useEffect(() => {
    const getPushToken = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: "9bfa8038-56e6-4df2-b340-f20a13167312",
      });
      console.log(token);
      ctx.value.setExpoPushToken(token);
      console.log("expo context :  ", ctx.value.expoPushToken);
    };

    getPushToken();
  }, []);

  const handleSignup = async () => {
    setSending(true);
    try {
      const data = await signup(
        username,
        password,
        mobileNo,
        ctx.value.expoPushToken,
        Name,
        setSending
      );
      if (data) {
        setSending(false);
        console.log("signup sucess");
        navigation.navigate("Login");
      }
    } catch (err) {
      setSending(false)
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
      <Text>Signup</Text>
      <TextInput
        placeholder="Enter your name"
        value={Name}
        onChangeText={setName}
      />
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
      {sending? <ActivityIndicator/> : <Button title="Signup" onPress={handleSignup} />}
    </View>
  );
};

export default Signup;
