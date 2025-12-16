import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ICON} from '../assets/png';

const EmptyComponent = ({image, description}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image || ICON.EMPTY} />
      {!!description && <Text style={styles.content}>{description}</Text>}
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: 147,
    resizeMode: 'contain',
  },
  content: {
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
