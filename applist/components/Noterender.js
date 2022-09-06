import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../misc/colors';

const Noterender = ({ item, onPress }) => {
  const { title, desc } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={5}>
        {title}
      </Text>
      <Text numberOfLines={5}>{desc}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.TEXTCOLOR,
    textShadowColor:colors.TEXTCOLOR,
    
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
 
        justifyContent:'space-around'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.LIGHT,
    flex:1,
    flexDirection:'column',
  },
});

export default Noterender;