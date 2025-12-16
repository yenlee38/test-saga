import {Image, StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {Navigation} from 'react-native-navigation';
import {CURRENT_WEATHER_OVERLAY} from '../navigator/screens';
import LabelValue from './labelValue';
import {getTemp, urlIcon} from '../helps/string';
import {useSelector} from 'react-redux';
import {
  getCurrentLocalNameState,
  getCurrentWeatherState,
} from '../redux/weather/selectors';

const AlertCurrentWeather = () => {
  const dismiss = () => Navigation.dismissOverlay(CURRENT_WEATHER_OVERLAY);
  const currentWeatherSelector = useSelector(getCurrentWeatherState);
  const currentNameSelector = useSelector(getCurrentLocalNameState);
  return (
    <View style={styles.root}>
      <View style={styles.alert}>
        <Text style={styles.title}>{currentNameSelector || ''}</Text>
        <Text style={styles.title}>Current Weather Today</Text>
        <LabelValue
          label="Temperature"
          value={getTemp(currentWeatherSelector?.main?.temp || '')}
        />
        <View style={styles.row}>
          <LabelValue
            label="Description"
            value={currentWeatherSelector?.weather?.[0]?.description || ''}
          />
          <Image
            source={{
              uri: urlIcon(currentWeatherSelector?.weather?.[0]?.icon || ''),
            }}
            style={styles.imgIcon}
          />
        </View>
        <LabelValue
          label="Humidity"
          value={currentWeatherSelector?.main?.humidity || ''}
        />
        <LabelValue
          label="WindSpeed"
          value={currentWeatherSelector?.wind?.speed || ''}
        />
        <Button title="OK" onPress={dismiss} />
      </View>
    </View>
  );
};

AlertCurrentWeather.options = props => {
  return {
    overlay: {
      interceptTouchOutside: true,
    },
  };
};

export default AlertCurrentWeather;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  imgIcon: {
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
    backgroundColor: 'whitesmoke',
    width: 250,
    elevation: 4,
    padding: 16,
  },
  title: {
    fontSize: 18,
    paddingVertical: 4,
  },
  message: {
    marginVertical: 8,
  },
});
