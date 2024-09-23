import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomIcon from '../components/CustomIcon';
import {Home, Profile, Task} from '../screens';
import {moderateHeight, moderateScale} from '../utils/responsive';
import colors from '../theme/colors';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type TabParamList = {
  Home: undefined;
  Tasks: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomNavigator: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const [activeRoute, setActiveRoute] = React.useState<string>('Home');

  const getIconName = (routeName: string, focused: boolean) => {
    const icons: Record<string, [string, string]> = {
      Home: ['home', 'home-outline'],
      Tasks: ['checkmark-circle', 'checkmark-circle-outline'],
      Profile: ['person', 'person-outline'],
    };
    return focused ? icons[routeName][0] : icons[routeName][1];
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,

          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name={getIconName(route.name, focused)}
              color={color}
              size={size}
              type="Ionicons"
            />
          ),
          tabBarActiveTintColor: colors.neonRed_60,
          tabBarInactiveTintColor: colors.gray,
          tabBarStyle: styles.tabBar,
        })}
        screenListeners={{
          state: e => {
            const routeName = e.data.state?.routes[e.data.state.index]?.name;
            if (routeName) {
              setActiveRoute(routeName);
            }
          },
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen
          name="Tasks"
          component={Task}
          options={{
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                style={styles.fab}
                onPress={() => navigation.navigate('Tasks')}>
                <CustomIcon name="add" color="white" size={24} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },
  fab: {
    position: 'absolute',
    left: '50%',
    marginLeft: -32,
    bottom: moderateScale(36),
    backgroundColor: colors.brightOrange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(32),
    elevation: 8,
    alignSelf: 'center',
    padding: moderateScale(16),
  },
  tabBar: {
    backgroundColor: colors.lavender_80,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: moderateHeight(-2),
    height: moderateHeight(10),
    paddingBottom: moderateHeight(2),
    borderTopRightRadius: moderateScale(16),
    borderTopLeftRadius: moderateScale(16),
  },
});

export default BottomNavigator;
