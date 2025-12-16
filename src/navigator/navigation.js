import {Navigation} from 'react-native-navigation';
import {
  HOME_SCREEN,
  FAVORITE_SCREEN,
  DETAIL_SCREEN,
  LOADING_OVERLAY,
  CURRENT_WEATHER_OVERLAY,
  ERROR_OVERLAY,
} from './screens';
import HomeScreen from '../screens/home';
import FavoriteScreen from '../screens/favorite/index';
import DetailScreen from '../screens/detail';
import LoadingOverlay from '../components/loadingOverlay';
import AlertCurrentWeather from '../components/modal';
import ErrorModal from '../components/errorModal';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '../redux/store';

const wrapperProviderRedux = Component => props => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
};

Navigation.registerComponent(HOME_SCREEN, () =>
  wrapperProviderRedux(HomeScreen),
);
Navigation.registerComponent(FAVORITE_SCREEN, () =>
  wrapperProviderRedux(FavoriteScreen),
);
Navigation.registerComponent(DETAIL_SCREEN, () =>
  wrapperProviderRedux(DetailScreen),
);
Navigation.registerComponent(LOADING_OVERLAY, () =>
  wrapperProviderRedux(LoadingOverlay),
);
Navigation.registerComponent(CURRENT_WEATHER_OVERLAY, () =>
  wrapperProviderRedux(AlertCurrentWeather),
);
Navigation.registerComponent(ERROR_OVERLAY, () =>
  wrapperProviderRedux(ErrorModal),
);

export const initRootNavigation = () => {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#039893',
      },
      title: {
        color: 'white',
      },
      backButton: {
        title: '', // Remove previous screen name from back button
        color: 'white',
      },
      buttonColor: 'white',
    },
    statusBar: {
      style: 'light',
    },
    layout: {
      orientation: ['portrait'],
    },
    bottomTabs: {
      //   titleDisplayMode: 'alwaysShow',
      titleDisplayMode: 'alwaysHide',
    },
    bottomTab: {
      textColor: 'gray',
      selectedTextColor: 'black',
      iconColor: 'gray',
      selectedIconColor: 'black',
    },
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: FAVORITE_SCREEN,
              id: FAVORITE_SCREEN,
              options: {
                topBar: {
                  visible: false,
                },
                statusBar: {
                  style: 'dark',
                },
              },
            },
            component: {
              name: HOME_SCREEN,
              id: HOME_SCREEN,
              options: {
                topBar: {
                  visible: false,
                },
                statusBar: {
                  style: 'dark',
                },
              },
            },
          },
        ],
      },
    },
  });
};

export const pushBottomTabBar = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: DETAIL_SCREEN,
              name: DETAIL_SCREEN,
            },
          },
        ],
      },
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'HOME_TAB',
              children: [
                {
                  component: {
                    id: HOME_SCREEN,
                    name: HOME_SCREEN,
                  },
                },
              ],
              options: {
                bottomTab: {
                  animateBadge: false,
                  text: '',
                  iconColor: 'black',
                  selectedIconColor: '#58CCED',
                  icon: require('../assets/png/iconHome.png'),
                },
              },
            },
          },
          {
            stack: {
              id: 'PROFILE_TAB',
              children: [
                {
                  component: {
                    id: FAVORITE_SCREEN,
                    name: FAVORITE_SCREEN,
                  },
                },
              ],
              options: {
                bottomTab: {
                  animateBadge: false,
                  text: '',
                  iconColor: 'black',
                  selectedIconColor: '#58CCED',
                  icon: require('../assets/png/iconHeart.png'),
                  position: 1,
                },
              },
            },
          },
        ],
      },
    },
  });
};
