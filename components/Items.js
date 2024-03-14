import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

//compo
import Button from "./Button";
import Form_to_do from "./Form._to_do";
//context
import { Context } from "../store/context";

//icons
import Ionicons from "react-native-vector-icons/Ionicons";

//fetching
import { to_do_lists, toggleStatus } from "../utils/https"; // Separate imports
import ItemDetail from "../pages/ItemDetail";

function Items() {

  const [displayForm , setDisplayForm] = React.useState(false);
 
  const ctx = useContext(Context);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await to_do_lists();
        ctx.set_to_do_Data(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handlePressStatus = async (id) => {
    try {
      await toggleStatus(id);
      const updatedData = await to_do_lists(); // Fetch updated data after toggling status
      ctx.set_to_do_Data(updatedData); // Update context with the new data
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handlePressItemDetail = (id) => {
    navigation.navigate('ItemDetail', {id})
  };

  const handlePressAddTask = () => {
 setDisplayForm(true)
  }

  return (
    <View style={{flex : 1}}>
    <View style={{alignItems : 'center', marginTop: 70, backgroundColor: 'green', borderRadius: 100}}>
      <Text style={{ fontSize: 40, color : 'white'}} >To - Do</Text>
    </View>
      <FlatList
        data={ctx.to_do_data}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {item.task_status.completed ? (
              <Ionicons
                name="checkmark-circle"
                size={40}
                onPress={() => handlePressStatus(item._id)}
              /> // Pass item._id to handlePress
            ) : (
              <Ionicons
                name="checkmark-circle-outline"
                size={40}
                onPress={() => handlePressStatus(item._id)}
              /> // Pass item._id to handlePress
            )}
            <Text>
              {item.task_des.length > 15
                ? item.task_des.substring(0, 17) + "...."
                : item.task_des}
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              size={40}
              onPress={() => handlePressItemDetail(item._id)}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.addButton}>

      <Button iconName="add-circle" onPress={handlePressAddTask} size = {50}/>
      </View>
      <View>
        {displayForm && <Form_to_do/>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lists: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  item: {
    height: 80,
    backgroundColor: "grey",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    right: 80,
    zIndex : 10
  },
});

export default Items;
