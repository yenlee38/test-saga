import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  recentWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
  },
  recentContainer: {
    paddingVertical: 8,
  },
  container: {
    padding: 16,
    gap: 8,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgIcon: {
    height: 24,
    width: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 4,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  txtSearch: {
    flex: 1,
    padding: 16,
  },
  contentFlatList: {
    gap: 8,
    marginTop: 16,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#aaa',
  },
});

export default styles;
