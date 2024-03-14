import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

//context
import { Context } from "../../store/context";

//socket
import { io } from "socket.io-client";

//https
import { addMsg } from "../../utils/https";
import { getMsg } from "../../utils/https";

export default function ContactListDetail(props) {
  const ctx = React.useContext(Context);
  const ToUserNo = props.route.params.mobileNo;
  const toUserName = props.route.params.name;
  const currentUserNo = ctx.value.currentUserData.mobileNo;

  const socket = useRef();

  const [message, setMessage] = useState(""); // State to manage input value
  const [arrivalMessgae, setArrivalMessage] = useState();
  const [fetchedMessages, setFetchedMessages] = useState([]);

  const handleAddMsg = async () => {
    try {
      await addMsg(currentUserNo, ToUserNo, message);
      // Clear the input after sending the message
      setMessage("");
      socket.current.emit("send-msg", {
        to: ToUserNo,
        from: currentUserNo,
        message: message,
        toExpo : ctx.value.expoPushToken
      });
      setFetchedMessages((prev) => [
        ...prev,
        { fromSelf: true, message: message },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
      socket.current = io("http://192.168.202.161:8000");
      socket.current.emit("add-user", currentUserNo);
    
  }, [currentUserNo, ToUserNo]);

  useEffect(() => {
    
      socket.current.on("msg-recieve", (msg) => {
        console.log("arrivaal message data" , msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    
  }, []);

  useEffect(() => {
    if (arrivalMessgae) {
      setFetchedMessages((prev) => [...prev, arrivalMessgae]);
    }
  }, [arrivalMessgae]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUserNo && ToUserNo) {
        try {
          const data = await getMsg(currentUserNo, ToUserNo);
          setFetchedMessages(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [currentUserNo, ToUserNo]);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "green", width: "100%", height: "80%" }}>
        <FlatList
          data={fetchedMessages}
          renderItem={({ item }) => (
            <View style={item.fromSelf ? styles.fromChat : styles.toChat}>
              <Text style={styles.item}>{item.message}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{ backgroundColor: "black" }}>
        <Text style={{ color: "white" }}>
          {toUserName} - {currentUserNo}
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Send message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddMsg}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 10,
  },
  toChat: {
    color: "white",
    gap: 12,
    alignItems: "flex-start",
    marginTop: 40,
  },
  fromChat: {
    color: "white",
    gap: 12,
    alignItems: "flex-end",
    marginTop: 40,
  },
});
