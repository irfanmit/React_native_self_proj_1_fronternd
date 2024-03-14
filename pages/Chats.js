import * as React from "react";
import { View, Text } from "react-native";

//compo
import ContactList from "../components/Contacts/ContactList";

function Chats() {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", backgroundColor: "black" }}
    >
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontSize: 30, color: "white" }}>Chat - Page</Text>
      </View>
      <ContactList />
    </View>
  );
}

export default Chats;
