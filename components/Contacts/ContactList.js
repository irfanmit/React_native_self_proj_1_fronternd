import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../../store/context";
import { contactListFetching } from "../../utils/https";

export default function ContactList() {
  const ctx = useContext(Context);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await contactListFetching();
        ctx.value.setContactLists(data);
        // Initialize filtered contacts with the fetched data
        setFilteredContacts(data);
      } catch (err) {
        console.log("error while fetching contact ", err);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    // Filter the contacts based on the search query
    const filtered = ctx.value.contactsList.filter((contact) => {
      return contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredContacts(filtered);
  }, [searchQuery, ctx.value.contactsList]);

  const handleChatdetail = (mobileNo, name) => {
    console.log(mobileNo, name);
    navigation.navigate("ContactListDetail", {
      mobileNo: mobileNo,
      name: name
    });
  };

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredContacts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              handleChatdetail(
                item.phoneNumbers && item.phoneNumbers[0].number,
                item.name
              )
            }
          >
            <View style={styles.item}>
              <View style={{ backgroundColor: "white", borderRadius: 100 }}>
                <Ionicons name="person-circle-outline" size={40} />
              </View>
              <Text style={{ color: "white" }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginLeft: 10,
    height: 80,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 20,
    width: "140%",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
});
