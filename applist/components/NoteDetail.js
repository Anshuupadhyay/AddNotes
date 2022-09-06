import {ScrollView, Text,StyleSheet,View, Alert} from 'react-native'
import React, { useState } from 'react';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../cotexts/NoteProvider';
import NoteModal from './NoteModel';

const NoteDetail=props=>{
 
const [showModel,setShowModal]=useState(false);
const [isEdit,setEdit]=useState(false);
const [note,setnewNote]=useState(props.route.params.note)
const {setNotes}=useNotes()
    

   //const updateHandler=()=>{}
   const updateHandler = async (title, desc) => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

   const newNotes=notes.filter(n => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        setnewNote(n)
      }
      return n;
    });
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
  }
const onclosehandler=()=> setShowModal(false)


const openModalEdit=()=>{
  setEdit(true);
  setShowModal(true);
}


    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);
    
        const newNotes = notes.filter(n => n.id !== note.id);
        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        props.navigation.goBack();
      };
const nodeletin=()=>{
    props.navigation.goBack();
}


    const displayDeleteAlert = () => {
        Alert.alert(
          'Are You Sure!',
          'This action will delete your note permanently!',
          [
            {
              text: 'Delete',
              onPress: deleteNote,
            },
            {
              text: 'No Thanks',
              onPress: () => nodeletin,
            },
          ],
          {
            cancelable: true,
          }
        );
      };
    
    
    return (
        <>
        <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: 50}]}
      >
         <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
        </ScrollView>
        <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName='delete'
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
       onPress={displayDeleteAlert}
        />
        <RoundIconBtn antIconName='edit'
       onPress={openModalEdit}  />
      </View>
      <NoteModal isEdit={isEdit}  note={note} onClose={onclosehandler}
       onSubmit={updateHandler}  visible={showModel}/>
        </>
    )
}

const styles=StyleSheet.create({
    container:{
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 30,
         color: colors.TEXTCOLOR,
        fontWeight: 'bold',
      },
      desc: {
        fontSize: 20,
        opacity: 0.8,
      },
      btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50,
      },

})
export default NoteDetail