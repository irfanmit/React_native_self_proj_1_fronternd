import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo

const Button = ({ iconName, onPress, size }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name={iconName} size={size} />
    </TouchableOpacity>
  );
};

export default Button;
