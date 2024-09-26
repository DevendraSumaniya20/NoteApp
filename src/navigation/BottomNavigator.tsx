import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomIcon from '../components/CustomIcon';
import {Home, Notes, Profile} from '../screens';
import colors from '../theme/colors';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type TabParamList = {
  Home: undefined;
  Notes: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomNavigator: React.FC = () => {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const [activeRoute, setActiveRoute] = React.useState<string>('Home');

  const getIconName = (routeName: string, focused: boolean) => {
    const icons: Record<string, [string, string]> = {
      Home: ['home', 'home-outline'],
      Notes: ['add-circle', 'add-circle-outline'],
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
          name="Notes"
          component={Notes}
          options={{
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                style={styles.fab}
                onPress={() => navigation.navigate('Notes')}>
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
  },
  fab: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.neonRed_80,
    justifyContent: 'center',
    alignItems: 'center',
    top: -35,
    borderColor: colors.white,
    borderWidth: 2,
  },
  tabBar: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 0,
    elevation: 0,
  },
});

export default BottomNavigator;
