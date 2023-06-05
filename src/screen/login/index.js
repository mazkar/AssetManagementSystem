import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import RootContainer from '../../component/RootContainer/index';
import {useNavigation} from '@react-navigation/core';
import ColorBgContainer from '../../component/ColorBgContainer';
import {COLORS} from '../../assets/theme';
import {Button, Menu, Divider, PaperProvider} from 'react-native-paper';
import AppBar from '../../component/widget/AppBar';

export default function LoginPage() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const refreshScreen = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ColorBgContainer bgColor="white">
      <AppBar />
      <RootContainer isTransparent>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshScreen}
              colors={[COLORS.PRIMARY_MEDIUM]}
              tintColor={COLORS.PRIMARY_MEDIUM}
            />
          }>
          <View
            style={{
              paddingTop: 50,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<Button onPress={openMenu}>Show menu</Button>}>
              <Menu.Item onPress={() => {}} title="Item 1" />
              <Menu.Item onPress={() => {}} title="Item 2" />
              <Divider />
              <Menu.Item onPress={() => {}} title="Item 3" />
            </Menu>
          </View>
        </ScrollView>
      </RootContainer>
    </ColorBgContainer>
  );
}
