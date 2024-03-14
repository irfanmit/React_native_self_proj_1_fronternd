import React, { createContext, useState, useContext } from "react";

//fetching
import { editTask, addTask } from "../utils/https";
import { useNavigation, useNavigationBuilder } from "@react-navigation/native";

export const Context = createContext({
  handlePressEdit : (id, task_des) => {},
  handleAdd : () => {},
});

export const ContextProvider = ({ children }) => {

  const navigation = useNavigation();

  //states
  const [to_do_data, set_to_do_Data] = useState([]);
  const [contactsList, setContactLists] = useState([]);
  const [login , setLogin ] = useState(false);
  const [currentUserData , setCurrentUserData] = useState({
  }); 
  const [expoPushToken, setExpoPushToken] = useState("");
  const [token , setToken] = useState(null);

  const handlePressEdit = async (id, task_des) => {
    try {
      const data = await editTask(id, task_des);
     set_to_do_Data(data)
      navigation.navigate('To-Do');
    } catch (err) {
      console.log("Error while editing:", err)
    }
  };
  handleAdd = async () => {
    try {
      const data = await addTask(task_des);
     set_to_do_Data(data);
      setTask_des('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  const value = {
    handlePressEdit : handlePressEdit,
    handleAdd : handleAdd,
    setContactLists : setContactLists,
    contactsList : contactsList,
    login : login,
    setLogin : setLogin,
    currentUserData : currentUserData,
    setCurrentUserData : setCurrentUserData,
    setExpoPushToken : setExpoPushToken,
    expoPushToken : expoPushToken,
    token : token,
    setToken : setToken
  }

  return (
    <Context.Provider value={{ to_do_data, set_to_do_Data, login, setLogin, value }}>
      {children}
    </Context.Provider>
  );
};
