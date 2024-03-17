import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, ActivityIndicator } from 'react-native';

//icons
import Ionicons from "react-native-vector-icons/Ionicons";

//compo
import Button from './Button';

//context
import { Context } from '../store/context';

//https
import { addTask } from '../utils/https';

const Form_to_do = ({task_des_editing, editing, handlePressEdit, id}) => {


  const [task_des, setTask_des] = useState('');
  const[sending, setSending] = useState(false);
  
  useEffect(() => {
    if (task_des_editing) {
      setTask_des(task_des_editing);
    }
  }, [task_des_editing]);

  const ctx = useContext(Context);

  const handleAdd = async() => {
      try {
        setSending(true)
        const data = await addTask(task_des, ctx.value.currentUserData._id, setSending);
        setSending(false)
        ctx.set_to_do_Data(data);
        setTask_des('');
        console.log(ctx.to_do_data);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };

   useEffect(() => {

   },[ctx.to_do_data])
  
  
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextInput
        placeholder="Enter text.."
        value={task_des}
        onChangeText={setTask_des}
        style={{ flex: 1, borderWidth: 1, borderColor: 'gray', padding: 10, marginRight: 10 }}
      />
      <View style={{marginRight : 8}}>
      {editing ? (  
        sending ?  <ActivityIndicator size = 'large' color='black' />  : <Ionicons name="send" size={30} onPress={() => ctx.value.handlePressEdit(id, task_des)} />
        ) : (
          sending ? <ActivityIndicator /> : <Ionicons name="send" size={30} onPress={handleAdd} />
        )}
      </View>
    </View>
  );
};

export default Form_to_do;
