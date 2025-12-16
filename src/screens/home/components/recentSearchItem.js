import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ICON} from '../../../assets/png';

const RecentSearchItem = ({
  location = '',
  onPress = () => {},
  onDelete = () => {},
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      <Text>{location}</Text>
      <TouchableOpacity activeOpacity={1} onPress={onDelete}>
        <Image source={ICON.DELETE} style={styles.icon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default RecentSearchItem;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#daecf5',
    borderRadius: 4,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  icon: {
    height: 16,
    width: 16,
  },
});
