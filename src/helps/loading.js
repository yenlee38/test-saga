import {Navigation} from 'react-native-navigation';
import {LOADING_OVERLAY} from '../navigator/screens';

export const showLoading = () => {
  Navigation.showOverlay({
    component: {
      id: LOADING_OVERLAY,
      name: LOADING_OVERLAY,
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
};

export const hideLoading = () => {
  Navigation.dismissOverlay(LOADING_OVERLAY);
};
