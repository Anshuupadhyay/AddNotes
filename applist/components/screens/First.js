import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    TextInput,  
    Dimensions,
  } from 'react-native';
import colors from '../../misc/colors';
import RoundIconBtn from '../RoundIconBtn';
const First=({onFinish})=>
{
const [name,newUser]=useState('  ');
    const texthandler=(ele)=>{
     newUser(ele); 
    }

    const handleSubmit = async () => {
        const user = { name: name };
        await AsyncStorage.setItem('user', JSON.stringify(user));
      if(onFinish) onFinish();
      };
    return(
        <>
        <StatusBar hidden/>
        <View style={styles.container}>
        <Text style={styles.text1}>Share your views about IISC Bangalore</Text>
        <Text style={styles.text}>Enter your name</Text>
        <TextInput
        value={name}
        onChangeText={texthandler}
          placeholder='Enter Name'
          style={styles.textInput}
        />
          {name.trim().length >= 3 ? (
          <RoundIconBtn antIconName='arrowright' onPress={handleSubmit} />
        ) : null}
        </View>
        
        </>
    )
};
const width = Dimensions.get('window').width - 0;
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    
        justifyContent:'center',
        alignItems: 'center',  
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.TEXTCOLOR,
        color: colors.PRIMARY,
        width,
        height: 40,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 18,
        marginBottom: 15,
    padding:8,
      },
      text1:{
       padding:8,
        fontSize:20,
      },
      text:{
       padding:8,
        fontSize:15,
      }
})
export default First