import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const Search = ({ containerStyle, value, onClear, onChangeText }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder='Search'
      />
      {value ? (
        <AntDesign
          name='close'
          size={20}
          color={colors.TEXTCOLOR}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 30,
    borderRadius: 30,
    paddingLeft: 15,
    fontSize: 20,

  },
  container: {
    justifyContent: 'center',
   
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default Search;