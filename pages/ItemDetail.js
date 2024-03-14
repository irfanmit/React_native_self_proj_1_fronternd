import * as React from 'react';
import { View, Text } from 'react-native';

//icons
import Ionicons from "react-native-vector-icons/Ionicons";

//compo
import ItemsDetailItem from '../components/ItemDetailItem';


function ItemDetail({ route }) {
  const { id } = route.params;
    return (
      <View style={{ alignItems: 'center', backgroundColor : 'green', flex:1}}>
        <ItemsDetailItem id={id}/>
      </View>
    );
}

export default ItemDetail;
