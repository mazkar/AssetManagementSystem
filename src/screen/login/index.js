import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import RootContainer from '../../component/RootContainer/index';
import {useNavigation} from '@react-navigation/core';
import ColorBgContainer from '../../component/ColorBgContainer';
import {COLORS} from '../../assets/theme';

export default function LoginPage() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const refreshScreen = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ColorBgContainer>
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
          <Text>Login Page</Text>
        </ScrollView>
      </RootContainer>
    </ColorBgContainer>
  );
}
