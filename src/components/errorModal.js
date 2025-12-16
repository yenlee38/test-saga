import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {ERROR_OVERLAY} from '../navigator/screens';
import {ICON} from '../assets/png';

const ErrorModal = ({message, title}) => {
  const dismiss = () => Navigation.dismissOverlay(ERROR_OVERLAY);

  return (
    <View style={styles.root}>
      <View style={styles.alert}>
        <View style={styles.iconContainer}>
          <Image source={ICON.WARING} style={styles.icon} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Button title="OK" onPress={dismiss} />
      </View>
    </View>
  );
};

ErrorModal.options = props => {
  return {
    overlay: {
      interceptTouchOutside: true,
    },
  };
};

export default ErrorModal;

const styles = StyleSheet.create({
  iconContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  icon: {
    height: 24,
    width: 24,
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  alert: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 250,
    elevation: 4,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
  },
  message: {
    marginVertical: 8,
    textAlign: 'center',
  },
});
