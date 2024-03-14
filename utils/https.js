import * as Contacts from "expo-contacts";
import axios from 'axios';
//context
// import { useContext } from "react";
// import { Context } from "../store/context";

// const ctx = useContext(Context);
const ip_add = "192.168.202.161";

import { io } from "socket.io-client";
const socket = io.connect("http://localhost:800");

// const getPushToken = async () => {
//   try {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: "9bfa8038-56e6-4df2-b340-f20a13167312",
//     });
//     console.log(token);
//     ctx.value.setExpoPushToken(token);
//     console.log(ctx.value.expoPushToken);
//   } catch (err) {
//     console.log("error in notification", err);
//   }
// };

const toggleStatus = async (id) => {
  try {
    const response = await fetch(`http://${ip_add}:8000/User/togglevent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      throw new Error("Failed to toggle status");
    }

    // Optionally, you can handle the response data here
    const data = await response.json();
    // console.log('Toggle status response:', data);
  } catch (error) {
    console.error("Error toggling status:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

const to_do_lists = async () => {
  try {
    const response = await fetch(`http://${ip_add}:8000/User/to_do_lists`);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of error
  }
};

const task_deletion = async (id) => {
  try {
    const response = await fetch(`http://${ip_add}:8000/User/taskDel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      throw new Error("Failed to delte task");
    }

    // Optionally, you can handle the response data here
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error toggling status:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

const addTask = async (task_des) => {
  try {
    const response = await fetch(`http://${ip_add}:8000/User/addTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task_des: task_des }),
    });

    if (!response.ok) {
      throw new Error("Failed to delte task");
    }

    // Optionally, you can handle the response data here
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error toggling status:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

const editTask = async (id, task_des) => {
  try {
    const response = await fetch(`http://${ip_add}:8000/User/editTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, task_des: task_des }),
    });

    if (!response.ok) {
      throw new Error("Failed to edit task");
    }

    // Optionally, you can handle the response data here
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error toggling status:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

const contactListFetching = async (setContactLists) => {
  try {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync();
      if (data) {
        return data; // Update the state with fetched contacts
      }
    }
  } catch (error) {
    console.error("Error fetching contact list:", error);
    // Handle the error here
  }
};

const signup = async (email, password, mobileNo, expoPushToken, Name) => {
  try {
    const response = await fetch(`http://${ip_add}:8000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, mobileNo, expoPushToken, Name }),
    });

    if (!response.ok) {
      throw new Error("Failed to signup");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const response = await fetch(`http://${ip_add}:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const addMsg = async (From, to, message) => {
  try {
    const response = await fetch(`http://${ip_add}:8000/addMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ From, to, message }),
    });

    if (!response.ok) {
      throw new Error("Failed to add message");
    }

    // const data = await response.json();
    // console.log("Message added success");
    // return data;
  } catch (error) {
    console.error("Error adding message :", error);
    throw error;
  }
};

const getMsg = async (From, to) => {
  try {
    const response = await fetch(`http://${ip_add}:8000/getMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ From, to }),
    });
    // Parse the response as JSON
    const data = await response.json();
    // console.log(data);
    return data; // Return the parsed data
  } catch (err) {
    console.log("Error while getting messages: ", err);
    return { success: false, error: "Error while getting messages" };
  }
};

// const imageUploader = async (formData) => {
//   try {
//       const response = await axios.post('https://example.com', formData), {
       
//       if(!response.ok){
//         console.log("bad response");
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
// }



export {
  to_do_lists,
  toggleStatus,
  task_deletion,
  addTask,
  editTask,
  contactListFetching,
  signup,
  login,
  addMsg,
  getMsg,
  socket,
  // imageUploader,
};
