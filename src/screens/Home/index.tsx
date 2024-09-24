import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../theme/colors';
import {moderateHeight, moderateScale} from '../../utils/responsive';
import {CustomMargin} from '../../components';
import {BottomTabParamList} from '../../navigation/AppNavigator';
import CustomIcon from '../../components/CustomIcon';
import {BlurView} from '@react-native-community/blur';

interface HomeScreenProps {
  navigation: BottomTabNavigationProp<BottomTabParamList, 'Home'>;
}

const Home: React.FC<HomeScreenProps> = ({navigation}) => {
  const [demo, setDemo] = useState<
    {
      id: number;
      title: string;
      priority: string;
      time: string;
      dueDate: string;
    }[]
  >([
    {
      id: 1,
      title: 'Task 1',
      priority: 'high',
      time: '10:00 AM',
      dueDate: 'August 24',
    },
    {
      id: 2,
      title: 'Task 2',
      priority: 'low',
      time: '11:00 AM',
      dueDate: 'August 24',
    },
    {
      id: 3,
      title: 'Task 3',
      priority: 'high',
      time: '12:00 PM',
      dueDate: 'August 24',
    },
    {
      id: 4,
      title: 'Task 4',
      priority: 'low',
      time: '1:00 PM',
      dueDate: 'August 24',
    },
  ]);

  const onEdit = (id: number) => {
    console.log('Edit task with id:', id);
  };

  const onDelete = (id: number) => {
    setDemo(prev => prev.filter(item => item.id !== id));
    console.log('Delete task with id:', id);
  };

  const getDemo = ({
    item,
  }: {
    item: {
      id: number;
      title: string;
      priority: string;
      time: string;
      dueDate: string;
    };
  }) => {
    const isHighPriority = item.priority === 'high';
    return (
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.priorityText,
              {
                backgroundColor: isHighPriority
                  ? colors.neonRed
                  : colors.neonGreen,
              },
            ]}>
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
          </Text>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDetail}>Time: {item.time}</Text>
          <Text style={styles.itemDetail}>Due Date: {item.dueDate}</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => onEdit(item.id)}
            accessibilityLabel="Edit Task">
            <CustomIcon name="pencil" size={24} color={colors.neonBlue} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            style={styles.deleteIcon}
            accessibilityLabel="Delete Task">
            <CustomIcon name="trash" size={24} color={colors.neonRed} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[colors.darkGray_80, colors.lavender_60]}
      style={styles.container}>
      <CustomMargin>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hello, User</Text>
          <TouchableOpacity>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitleText}>Manage Your Daily Task</Text>

        <View style={styles.imageContainer}>
          <View style={styles.imageBlock}>
            <Text style={styles.imageTitle}>Image</Text>
            <Text style={styles.imageTitle}>Title</Text>
            <Text style={styles.imageTitle}>Numbers</Text>
          </View>

          <View style={styles.imageBlock}>
            <View style={styles.imageBlock}>
              <Text style={styles.imageTitle}>Image</Text>
              <Text style={styles.imageTitle}>Title</Text>
              <Text style={styles.imageTitle}>Numbers</Text>
            </View>
            <View style={styles.imageBlock}>
              <Text style={styles.imageTitle}>Image</Text>
              <Text style={styles.imageTitle}>Title</Text>
              <Text style={styles.imageTitle}>Numbers</Text>
            </View>
          </View>
        </View>

        <View style={styles.ongoingContainer}>
          <Text style={styles.ongoingText}>On Going</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Tasks')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Add BlurView here */}
        <BlurView
          style={styles.blurContainer}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white">
          <FlatList
            data={demo}
            renderItem={getDemo}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </BlurView>
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
    marginTop: moderateScale(32),
  },
  headerText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.white,
  },
  iconText: {
    fontSize: moderateScale(20),
    color: colors.white,
  },
  subtitleText: {
    fontSize: moderateScale(16),
    color: colors.white,
    marginVertical: moderateScale(10),
  },
  imageContainer: {
    marginVertical: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageBlock: {
    alignItems: 'center',
  },
  imageTitle: {
    fontSize: moderateScale(14),
    color: colors.white,
    marginVertical: moderateScale(2),
  },
  ongoingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateScale(15),
  },
  ongoingText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: colors.white,
  },
  seeAllText: {
    fontSize: moderateScale(14),
    color: colors.neonCyan,
  },
  itemContainer: {
    padding: moderateScale(20),
    backgroundColor: colors.black,
    borderRadius: moderateScale(16),
    marginVertical: moderateScale(8),
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    padding: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  priorityText: {
    color: colors.white,
    width: '20%',
    textAlign: 'center',
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(2),
  },
  itemTitle: {
    fontSize: moderateScale(16),
    color: colors.white,
    marginTop: moderateScale(8),
  },
  itemDetail: {
    fontSize: moderateScale(14),
    color: colors.lightGray,
    marginTop: moderateScale(4),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    marginLeft: moderateScale(14),
  },
  blurContainer: {
    marginBottom: moderateHeight(80),
    borderRadius: moderateScale(16),
    overflow: 'hidden',
  },
});

export default Home;
