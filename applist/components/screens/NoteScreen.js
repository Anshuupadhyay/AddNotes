import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import { useNotes } from '../../cotexts/NoteProvider';
import NoteModal from '../NoteModel';
import Noterender from '../Noterender';
import RoundIconBtn from '../RoundIconBtn';
import Search from '../Search';
const NoteScreen = ({user,navigation}) => {
    const [greet, setGreet] = useState('');
const [modalvisi,setmodal]=useState(false);


const {notes,setNotes}=useNotes()
const onSubmitHandler=async (title,desc)=>{
    const time=new Date().getTime();
    const note={id:Date.now(),title,desc,time}
    const updatedNotes=[...notes,note]
    setNotes(updatedNotes)
    setmodal(false)
    await AsyncStorage.setItem('notes',JSON.stringify(updatedNotes))
}


const openNote=(note)=>{
    navigation.navigate('NoteDetail',{note})
}

    return (
        <>
        
        <StatusBar hidden/>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style={styles.container}>
         <Text style={styles.header}>{`Welcome ${user.name}!`}</Text>
         
         <FlatList 
         data={notes}
         numColumns={2}
         horizontal={false}
         columnWrapperStyle={{justifyContent:'space-evenly',marginBottom:12}}
          keyExtractor={item=>item.id.toString()} 
        renderItem={({item})=><Noterender onPress={()=>openNote(item)} item={item}/>}
        />
        {!notes.length?(<View style={[
                StyleSheet.absoluteFillObject,
                styles.headercontainer,
              ]}>
            <Text style={[styles.heading2]}>Add your views about IISC</Text> 
             </View>):null}
         
    
        
         </View>
         </TouchableWithoutFeedback>
         <RoundIconBtn 
            onPress={()=>{
                setmodal(true);
            }}
            antIconName='plus' style={styles.btn}/>
       <NoteModal visible={modalvisi} 
       onClose={()=>{setmodal(false)}}
       onSubmit={onSubmitHandler}
       />
    
        </>

    )
}
const styles = StyleSheet.create({
    
    container: {
      paddingHorizontal: 20,
      flex: 1,
      zIndex: 1,
    },
    header: {
        
        fontSize: 25,
        fontWeight: 'bold',
      },
     headercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
      },
     heading2: {
        fontSize: 15,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2,
  },
  btn:{
    position:'absolute',
    right:25,
    bottom:18,
    zIndex:1,
  }
})
export default NoteScreen