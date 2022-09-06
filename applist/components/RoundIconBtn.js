import React, { useReducer } from 'react';
import { View, StyleSheet ,Dimensions} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';
import useAndroidRippleForView from 'react-native/Libraries/Components/Pressable/useAndroidRippleForView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-web';


const RoundIconBtn = ({ antIconName, size, color, style, onPress }) => {
   
  return (
   
    <AntDesign
      name={antIconName}
      size={size || 20}
      color={color || colors.LIGHT}
      style={[styles.icon, { ...style }]}
     onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
 
    icon: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius: 50,
        elevation: 5,
        bottom:-30,
        
        width:50,
        alignSelf:'center'
       // onPress={onPress}
      
      },
      

});

export default RoundIconBtn;