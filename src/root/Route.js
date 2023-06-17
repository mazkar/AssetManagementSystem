import {View, Dimensions, Image, Platform} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginPage from '../screen/login';
import Dashboard from '../screen/Dashboard';
import Profile from '../screen/Profile';

import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import MapTracker from '../component/widget/MapTracker';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function Route() {
  const token = useSelector(state => state?.auth?.token);

  return (
    <Stack.Navigator
      initialRouteName={token == null ? 'Login' : 'Main'}
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Splash" component={LoginPage} headerMode="screen" /> */}
      {/* <Stack.Screen name="Login" component={LoginPage} headerMode="screen" />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        headerMode="screen"
      /> */}
      <Stack.Screen
        name="Main"
        options={{headerShown: false}}
        component={BottomNav}
        // headerMode="screen"
      />
      <Tab.Screen
        name="Login"
        component={LoginPage}
        // options={{headerShown: false}}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Tracker"
        component={MapTracker}
        // options={{headerShown: false}}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export function BottomNav() {
  const Height = Dimensions.get('window').height;

  return (
    <Tab.Navigator
      // tabBarOptions={{

      //   tabBarActiveBackgroundColor: 'red',
      //   style: {
      //     position: 'absolute',
      //     marginHorizontal: 20,
      //     bottom: 21,
      //     height: 60,
      //     elevation: 0,
      //     borderRadius: 40,
      //     backgroundColor: '#000',
      //   },
      // }}
      screenOptions={({route}) => ({
        showLabel: false,
        tabBarStyle: {
          // borderTopLeftRadius: 24,
          // borderTopRightRadius: 24,
          borderRadius: 24,
          marginBottom: 12,
          marginLeft: 18,
          marginRight: 18,
        },
        tabBarIcon: ({focused, size}) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused
              ? require('../assets/images/homeActive.png')
              : require('../assets/images/home.png');
          } else if (route.name === 'Task') {
            iconName = focused
              ? require('../assets/images/userActive.png')
              : require('../assets/images/user.png');
          } else if (route.name === 'Profile2') {
            iconName = focused
              ? require('../assets/images/userActive.png')
              : require('../assets/images/user.png');
          }

          // You can return any component that you like here!
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                top:
                  Platform.OS === 'ios' ? iphoneIconsPositionCenter(Height) : 0,
              }}>
              <Image
                source={iconName}
                resizeMode="contain"
                style={{width: size, height: size}}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Task"
        component={Dashboard}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="Profile2"
        component={Profile}
        // options={{headerShown: false}}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
