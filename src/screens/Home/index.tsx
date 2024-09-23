import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import {CustomHeader, CustomMargin} from '../../components';
import {BottomTabParamList} from '../../navigation/AppNavigator';
import MasonryList from '@react-native-seoul/masonry-list';

interface HomeScreenProps {
  navigation: BottomTabNavigationProp<BottomTabParamList, 'Home'>;
}

const Home: React.FC<HomeScreenProps> = ({navigation}) => {
  const [data, setData] = useState<{key: string}[]>([
    {key: 'Task 1'},
    {key: 'Task 2'},
    {key: 'Task 3'},
  ]);

  const renderItem = ({item}: {item: {key: string}}) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.key}</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[colors.neonBlue, colors.neonRed]}
      style={styles.container}>
      <CustomMargin>
        <View style={styles.header}>
          <Text>Hello, User</Text>
          <TouchableOpacity>
            <Text>bell</Text>
          </TouchableOpacity>
        </View>
        <Text>Manage Your Daily Task</Text>
        <View style={styles.imageContainer}>
          <Image />
          <Image />
          <Image />
        </View>
        <View style={styles.ongoingContainer}>
          <Text>On Going</Text>
          <TouchableOpacity>
            <Text>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      </CustomMargin>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    marginVertical: moderateScale(10),
  },
  ongoingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemContainer: {
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  image: {
    width: '100%',
    height: moderateHeight(100), // Adjust height as needed
    marginBottom: moderateScale(5),
  },
});

export default Home;
