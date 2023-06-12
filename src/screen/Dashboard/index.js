import {View, Text, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import RootContainer from '../../component/RootContainer/index';
import {useNavigation} from '@react-navigation/core';
import ColorBgContainer from '../../component/ColorBgContainer';
import {COLORS, FONTS} from '../../assets/theme';
import {Button, Menu, Divider, Avatar, Card} from 'react-native-paper';
import {ms} from 'react-native-size-matters';

// iCONS
import FaIcons from 'react-native-vector-icons/Ionicons';

export default function Dashboard() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);

  // Notification

  const showNotif = () => {
    setNotifVisible(true);
  };

  const closeNotif = () => {
    setNotifVisible(false);
  };

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
          <View style={styles.mainContainer}>
            <View style={styles.notif}>
              <View>
                <Avatar.Text size={28} label="MA" color={COLORS.WHITE} />
              </View>
              <View>
                <Menu
                  visible={notifVisible}
                  onDismiss={closeNotif}
                  anchor={
                    <FaIcons
                      onPress={showNotif}
                      style={{fontSize: 22, color: COLORS.PRIMARY_MEDIUM}}
                      name={
                        notifVisible
                          ? 'notifications-sharp'
                          : 'notifications-outline'
                      }
                    />
                  }>
                  <Menu.Item
                    onPress={() => {}}
                    title="Task 1 Assigned to You"
                  />
                  <Menu.Item onPress={() => {}} title="Task  Assigned to You" />
                  <Divider />
                  <Menu.Item
                    onPress={() => {}}
                    title="Task 3 Assigned to You"
                  />
                </Menu>
              </View>
            </View>

            <View style={styles.helloContainer}>
              <View>
                <Text style={styles.profileName}>Hello Admin</Text>
              </View>
            </View>

            <View style={styles.overviewContainer}>
              <View>
                <Text style={styles.overviewText}>Overview</Text>
              </View>
              <View>
                <Card>
                  <Card.Content>
                    <Text variant="titleLarge">Card title</Text>
                    <Text variant="bodyMedium">Card content</Text>
                  </Card.Content>
                </Card>
              </View>
              {/* <View>
                <Text style={styles.profileName}>Overview</Text>
              </View> */}
            </View>
            {/* <View style={styles.profileSection}>
              <Text style={styles.profileName}>Mohamad Azka Rijalfaris</Text>
            </View> */}
          </View>
        </ScrollView>
      </RootContainer>
    </ColorBgContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  profileSection: {
    paddingVertical: 22,
    paddingHorizontal: 18,
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  profileName: {
    fontSize: FONTS.v20,
    fontWeight: '500',
    fontFamily: 'barlow',
    color: COLORS.BLACK,
  },
  notif: {
    // paddingVertical: 4,
    paddingHorizontal: 18,
    marginTop: ms(16),
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    // alignItems: 'flex-end',
  },
  helloContainer: {
    // paddingVertical: 4,
    paddingHorizontal: 18,
    // marginTop: ms(16),
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    // alignItems: 'flex-end',
  },
  overviewContainer: {
    // paddingVertical: 4,
    paddingHorizontal: 18,
    marginTop: ms(16),
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    // alignItems: 'flex-end',
  },
  overviewText: {
    fontSize: FONTS.v15,
    fontWeight: '400',
    fontFamily: 'barlow',
    color: COLORS.GRAY_HARD,
  },
});
