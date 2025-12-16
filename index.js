import {Navigation} from 'react-native-navigation';
import App from './App';
import {initRootNavigation, pushBottomTabBar} from './src/navigator/navigation';

Navigation.events().registerAppLaunchedListener(() => pushBottomTabBar());
