import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICON} from '../../../assets/png';
import LabelValue from '../../../components/labelValue';
import {getTemp} from '../../../helps/string';

const LocationItem = ({
  location,
  temperature,
  description,
  iconUrl,
  humidity,
  windSpeed,
  onFavorite = () => {},
  onDetail = () => {},
  isFavorite = false,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onDetail}>
      <LabelValue label="Location" value={location} />
      <LabelValue label="Temperature" value={getTemp(temperature)} />
      <View style={styles.row}>
        <LabelValue label="Description" value={description} />
        <Image source={{uri: iconUrl}} style={styles.imgIcon} />
      </View>
      <LabelValue label="Humidity" value={humidity} />
      <LabelValue label="WindSpeed" value={windSpeed} />
      <View style={styles.bottomItem}>
        <TouchableOpacity activeOpacity={1} onPress={onFavorite}>
          <Image
            source={ICON.HEART}
            style={[styles.imgFavIcon, isFavorite && styles.favoriteIcon]}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default LocationItem;

const styles = StyleSheet.create({
  favoriteIcon: {
    tintColor: 'red',
  },
  imgFavIcon: {
    height: 24,
    width: 24,
    tintColor: 'gray',
  },
  imgIcon: {
    height: 24,
    width: 24,
  },
  container: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  bottomItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
