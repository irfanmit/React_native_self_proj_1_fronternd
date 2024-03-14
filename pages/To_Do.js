import * as React from "react";
import { View, Text } from "react-native";

//compo
import Items from "../components/Items";

//context
// import { Context } from "../store/context";

function To_Do() {

  // const ctx = React.useContext(Context);

//   React.useEffect(() => {
//     const getPushToken = async () => {
//       const { status: existingStatus } = await Notifications.getPermissionsAsync();
//       let finalStatus = existingStatus;
//       if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync()
//         finalStatus = status;
//       }
//       if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!')
//         return;
//       }
//  token = await Notifications.getExpoPushTokenAsync({
//       projectId: "9bfa8038-56e6-4df2-b340-f20a13167312",
//     });
//     console.log(token);
//     ctx.value.setExpoPushToken(token);
//     console.log("expo context :  ",ctx.value.expoPushToken)
//     };
  
//     getPushToken();
//   }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#36454F" }}>
      {/* <Text style={{ color: 'white' }}>Higf</Text> */}
      <Items />
    </View>
  );
}

export default To_Do;
