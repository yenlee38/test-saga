import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Navigation} from 'react-native-navigation';
import {useDispatch, useSelector} from 'react-redux';
import {ICON} from '../../assets/png';
import EmptyComponent from '../../components/empty';
import {hideLoading, showLoading} from '../../helps/loading';
import {showModal} from '../../helps/overlay';
import {getTemp, urlIcon} from '../../helps/string';
import {
  CURRENT_WEATHER_OVERLAY,
  DETAIL_SCREEN,
  ERROR_OVERLAY,
} from '../../navigator/screens';
import {updateFavoriteAction} from '../../redux/favorite/actions';
import {getFavoriteState} from '../../redux/favorite/selector';
import {
  removeHistoryRecentSearchHandled,
  updateHistoryRecentSearchHandled,
} from '../../redux/history/actions';
import {getHistoryState} from '../../redux/history/selectors';
import {
  getCurrentLocalNameHandled,
  getCurrentWeatherHandled,
  getSearchWeatherHandled,
} from '../../redux/weather/actions';
import {getWeathersState} from '../../redux/weather/selectors';
import LocationItem from './components/locationItem';
import RecentSearchItem from './components/recentSearchItem';
import styles from './style';

const HomeScreen = () => {
  const [searchText, setSearchText] = useState();
  const dispatch = useDispatch();
  const weatherSelector = useSelector(getWeathersState);
  const historySearchSelector = useSelector(getHistoryState);
  const favoriteSelector = useSelector(getFavoriteState);

  const isFavoriteWeather = useCallback(
    item => {
      return favoriteSelector.some(element => element.id === item.id);
    },
    [favoriteSelector],
  );

  const onSearch = useCallback(async () => {
    Keyboard.dismiss();
    if (!searchText?.trim()) {
      return;
    }
    showLoading();
    dispatch(updateHistoryRecentSearchHandled(searchText));
    dispatch(
      getSearchWeatherHandled(
        {
          searchText,
        },
        () => hideLoading(),
        () => hideLoading(),
      ),
    );
  }, [searchText]);

  const onSearchRecent = useCallback(async text => {
    Keyboard.dismiss();
    showLoading();
    dispatch(updateHistoryRecentSearchHandled(text));
    dispatch(
      getSearchWeatherHandled(
        {
          searchText: text,
        },
        () => hideLoading(),
        () => hideLoading(),
      ),
    );
  }, []);

  const onGetCurrentWeather = async ({lon, lat}) => {
    showLoading();
    dispatch(getCurrentLocalNameHandled({lat, lon}));
    dispatch(
      getCurrentWeatherHandled(
        {lat, lon, units: 'metric'},
        data => {
          hideLoading();
          Navigation.showOverlay({
            component: {
              id: CURRENT_WEATHER_OVERLAY,
              name: CURRENT_WEATHER_OVERLAY,
              passProps: {
                data: data,
              },
              options: {
                overlay: {
                  interceptTouchOutside: false,
                },
                layout: {
                  backgroundColor: 'transparent',
                  componentBackgroundColor: 'transparent',
                },
              },
            },
          });
        },
        error => {
          hideLoading();
          console.error(error?.message);
          showModal({
            componentId: ERROR_OVERLAY,
            componentName: ERROR_OVERLAY,
            title: `ERROR:${error?.status || '404'}`,
            message: 'Cannot not get current weather, please try again!!',
          });
        },
      ),
    );
  };

  const onFavorite = item => {
    dispatch(updateFavoriteAction(item));
  };

  const onRemoveHistoryItem = item => {
    dispatch(removeHistoryRecentSearchHandled(item));
  };

  const onGoToDetail = item => {
    Navigation.push('HOME_TAB', {
      component: {
        name: DETAIL_SCREEN,
        options: {
          bottomTabs: {
            visible: false,
          },
        },
        passProps: {
          location: item?.location || '',
        },
      },
    });
  };

  const renderItemRecent = ({item}) => {
    return (
      <RecentSearchItem
        key={item}
        location={item || ''}
        onPress={() => {
          setSearchText(item || '');
          onSearchRecent(item);
        }}
        onDelete={() => onRemoveHistoryItem(item)}
      />
    );
  };

  const renderItemLocation = ({item}) => {
    return (
      <LocationItem
        location={item?.name || ''}
        temperature={getTemp(item?.main?.temp || '')}
        description={item?.weather?.[0]?.description || ''}
        iconUrl={urlIcon(item?.weather?.[0]?.icon || '')}
        humidity={item?.main?.humidity || ''}
        windSpeed={item?.wind?.speed || ''}
        isFavorite={isFavoriteWeather(item)}
        onDetail={() => onGoToDetail(item)}
        onFavorite={() => onFavorite(item)}
      />
    );
  };

  const ItemSeparate = () => {
    return <View style={styles.separator} />;
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.setRNConfiguration({
        authorizationLevel: 'whenInUse',
      });

      try {
        showLoading();
        const granted = await Geolocation.requestAuthorization('whenInUse');
        hideLoading();
        return granted === 'granted';
      } catch (error) {
        return false;
      }
    } else if (Platform.OS === 'android') {
      try {
        showLoading();
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        hideLoading();

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.warn(err.message);
        return false;
      }
    }
  };

  const onGetCurrentLocation = async () => {
    const hasLocationPermission = await requestLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          onGetCurrentWeather({
            lat: position?.coords?.latitude,
            lon: position?.coords?.longitude,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          forceRequestLocation: true, // nên thử bật
          showLocationDialog: true, // Android
        },
      );
    } else {
      showModal({
        componentId: ERROR_OVERLAY,
        componentName: ERROR_OVERLAY,
        title: 'ERROR:401',
        message: "Don't have permission!!",
      });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text>Hello Ngoc Yen!</Text>
          <TouchableOpacity activeOpacity={1} onPress={onGetCurrentLocation}>
            <Image style={styles.imgIcon} source={ICON.LOCATION} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            value={searchText}
            placeholder="Search location"
            style={styles.txtSearch}
            onChangeText={setSearchText}
            onEndEditing={onSearch}
          />
          <TouchableOpacity activeOpacity={1} onPress={onSearch}>
            <Image
              style={styles.imgIcon}
              source={{
                uri: 'https://img.icons8.com/ios-filled/50/search--v1.png',
              }}
            />
          </TouchableOpacity>
        </View>
        {!!historySearchSelector?.length && (
          <View style={styles.recentContainer}>
            <Text>Recent Search</Text>
            <View style={styles.recentWrap}>
              {historySearchSelector?.map(item => renderItemRecent({item}))}
            </View>
          </View>
        )}
        <View style={styles.recentContainer}>
          <Text>Weather: </Text>
          <FlatList
            data={weatherSelector}
            renderItem={renderItemLocation}
            contentContainerStyle={styles.contentFlatList}
            ListEmptyComponent={
              <EmptyComponent
                description={
                  'Search weather by name location to watch any weather you want.'
                }
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
