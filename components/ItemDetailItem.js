import * as React from "react";
import { View, Text } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

//compo
import Button from "./Button";

//icons
import Ionicons from "react-native-vector-icons/Ionicons";

//context
import { Context } from "../store/context";

//https
import { task_deletion } from "../utils/https";
import Form_to_do from "./Form._to_do";
import { editTask } from "../utils/https";

function ItemsDetailItem({ id }) {

  const navigation = useNavigation();
  const ctx = useContext(Context);

  const [editing, setEditing] = React.useState(false);

  const handlePressDeletion = async () => { // Define as async function
    try {
      const data = await task_deletion(id); // Call the taskDel function to delete item
      ctx.set_to_do_Data(data);
      console.log('Data after deletion:', data);
      navigation.navigate('To-Do');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  const handlePressEditing = () => {
    setEditing(true);
  }


  // Find the item with the matching id
  const item = ctx.to_do_data.find((item) => item?._id === id);
  return (
    <View>
      {/* Render the item details */}
      <View
        style={{
          backgroundColor: "grey",
          width: 400,
          marginTop: 150,
          alignItems: "center",
          padding : 15,
          marginTop : '70%',
          borderWidth : 2
        }}
      >
        <Text style={{ fontSize: 23 }}>{item?.task_des}</Text>
        <View style={{position: 'absolute' , top : 10, right : 10}}>
        <Button iconName="create-outline" onPress={handlePressEditing} size={30} />
        </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#98AEBC",
          marginTop: 20,
          width : '100%',
          justifyContent: "space-around",
          borderWidth : 1
        }}
      >
        <View>
          {item?.task_status?.completed ? (
            <Ionicons
              name="checkmark-circle"
              size={40}
              onPress={() => handlePressStatus(item?._id)}
            /> // Pass item._id to handlePress
          ) : (
            <Ionicons
              name="checkmark-circle-outline"
              size={40}
              onPress={() => handlePressStatus(item?._id)}
            /> // Pass item._id to handlePress
          )}
        </View>
        <View style={{justifyContent : 'center'}}>
          {item?.task_status?.pending ? (
            <Ionicons name="ellipsis-horizontal-outline" size={40}></Ionicons>
          ) : (
            <Text style={{fontSize : 20}}>completed</Text>
          )}
        </View>
        <View>
          <Ionicons name="trash-outline" size={40} onPress={() => {handlePressDeletion(item?._id)}} />
        </View>
      </View>
      </View>
      <View>
        {editing? <Form_to_do task_des_editing={item.task_des} editing={editing}  id={item._id} /> : null}
      </View>
    </View>
  );
}

export default ItemsDetailItem;
