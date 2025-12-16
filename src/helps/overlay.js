import {Navigation} from 'react-native-navigation';

export const showModal = ({componentId, componentName, message, title}) => {
  Navigation.showOverlay({
    component: {
      name: componentName,
      id: componentId,
      passProps: {
        title,
        message,
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
};
