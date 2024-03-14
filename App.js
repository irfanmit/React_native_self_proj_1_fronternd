import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Updates from 'expo-updates'

// icons
import Ionicons from "react-native-vector-icons/Ionicons";

//statusbar
import { StatusBar } from "expo-status-bar";

//context
import { ContextProvider } from "./store/context";
import { Context } from "./store/context";

//notification
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Import your pages
import Home from "./pages/Home";
import To_Do from "./pages/To_Do";
import Chats from "./pages/Chats";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

//compo
import ItemDetail from "./pages/ItemDetail";
import ContactListDetail from "./components/Contacts/ContactListDetail";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "To-Do") {
            iconName = "list";
          } else if (route.name === "Chat") {
            iconName = "chatbox";
          } else if (route.name === "User") {
            iconName = "person-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="To-Do" component={To_Do} />
      <Tab.Screen name="Chat" component={Chats} />
      <Tab.Screen name="User" component={UserProfile} />
    </Tab.Navigator>
  );
}

function App() {
  const ctx = React.useContext(Context);
  return (
    <NavigationContainer>
      <ContextProvider>
        <StatusBar style="light" backgroundColor="black" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!ctx.login && 
            <>
            <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          }
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} /> 
              <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ItemDetail" component={ItemDetail} />
          <Stack.Screen name="ContactListDetail" component={ContactListDetail} />
        </Stack.Navigator>
      </ContextProvider>
    </NavigationContainer>
  );
}

export default App;
