import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const IconCustom = ({uri, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <Image source={{uri}} style={styles.imgIcon} />
    </TouchableOpacity>
  );
};

export default IconCustom;

const styles = StyleSheet.create({
  imgIcon: {
    height: 24,
    width: 24,
  },
});
