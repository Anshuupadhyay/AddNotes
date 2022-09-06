
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import First from './applist/components/screens/First';
import NoteScreen from './applist/components/screens/NoteScreen';
import Search from './applist/components/Search';
import {createStackNavigator} from '@react-navigation/stack'
import NoteDetail from './applist/components/NoteDetail';
import {NavigationContainer} from '@react-navigation/native'
import NoteProvider from './applist/cotexts/NoteProvider';

const Stack=createStackNavigator()
export default function App() {
  const [user,setUser]=useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if(result!=null)
    {
      setUser(JSON.parse(result))
    }
    
  }
const RenderNoteScreen=(props)=><NoteScreen {...props} user={user}/>

  useEffect(()=>{
    //AsyncStorage.clear();//  
  findUser();
  },[])
  if(!user.name) return <First onFinish={findUser }/>
  return (
    <> 
    <NavigationContainer>
      <NoteProvider>
      <Stack.Navigator
    screenOptions={{headerTitle:' ',headerTransparent:true}}
    >
      <Stack.Screen component={RenderNoteScreen} name="NoteScreen"/>
      <Stack.Screen component={NoteDetail} name="NoteDetail"/>
    </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
