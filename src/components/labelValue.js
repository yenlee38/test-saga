import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LabelValue = ({value = '', label = ''}) => {
  return (
    <View style={styles.container}>
      <Text>{label}: </Text>
      <Text>{value}</Text>
    </View>
  );
};

export default LabelValue;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
