import {View, Dimensions, Image, Platform} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginPage from '../screen/login';
import Dashboard from '../screen/Dashboard';
import Profile from '../screen/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function Route() {
  const auth = true;
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Splash" component={LoginPage} headerMode="screen" /> */}
      {/* <Stack.Screen name="Login" component={LoginPage} headerMode="screen" />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        headerMode="screen"
      /> */}
      <Stack.Screen
        name="BottomNav"
        options={{headerShown: false}}
        component={BottomNav}
        // headerMode="screen"
      />
      <Stack.Screen
        name="Profile"
        options={{headerShown: false}}
        component={Profile}
        // headerMode="screen"
      />
    </Stack.Navigator>
  );
}

export function BottomNav() {
  const Height = Dimensions.get('window').height;

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          marginHorizontal: 20,
          bottom: 21,
          height: 60,
          elevation: 0,
          borderRadius: 40,
          backgroundColor: '#000',
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size}) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused
              ? require('../assets/images/homeActive.png')
              : require('../assets/images/home.png');
          } else if (route.name === 'Login') {
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
        name="Login"
        component={LoginPage}
        // options={{headerShown: false}}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile2"
        component={LoginPage}
        // options={{headerShown: false}}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
