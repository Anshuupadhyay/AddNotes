import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';


const NoteModal = ({ visible, onClose,onSubmit,note,isEdit }) => {
    const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const handleModalClose=()=>{
    Keyboard.dismiss();
}

  useEffect(()=>{
    if(isEdit)
    {
    setTitle(note.title)
    setDesc(note.desc)
    }
    },[isEdit])
  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };


const handleSubmit=()=>{
if (!title.trim() && !desc.trim()) return onClose();


if(isEdit)
{
  //logic
  onSubmit(title,desc);
}
else{
  onSubmit(title,desc);
  setTitle('');
  setDesc('');
}
onClose()
}
const closeModal=()=>{
  if(!isEdit)
  {
    setTitle('');
    setDesc('');
  }
   
    onClose();
}

 return (
    <>
    <StatusBar hidden/>
    <Modal visible={visible} animationType='fade'>
    <View style={styles.container}>
          <TextInput
             value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            placeholder='Topic'
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={desc}
            multiline
            placeholder='Details'
            onChangeText={text => handleOnChangeText(text, 'desc')}
            style={[styles.input, styles.desc]}
           
          />
           <View style={styles.btnContainer}>
           <RoundIconBtn
              size={15}
              antIconName='check' onPress={handleSubmit}
            
            />
            
             {title.trim()||desc.trim()? <RoundIconBtn
                size={15}
                style={styles.Btnround}
                antIconName='close'
                onPress={closeModal}
              />:null}
            </View>
          </View>
          <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
    </Modal>
    </>
 ) 
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
      },
      input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 20,
        color: colors.DARK,
      },
      title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
      },
      desc: {
        height: 100,
      },
      btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
      },
      modalBG: {
    flex: 1,
    zIndex: -1,
  },
  Btnround:{
    marginLeft: 15 ,
    borderRadius: 50
  }
})
export default NoteModal;