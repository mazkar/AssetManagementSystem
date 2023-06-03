import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../assets/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AppBar = props => {
  const {title, onPressNav, icoRight} = props;
  return (
    <View style={styles.appBarContainer}>
      <TouchableOpacity onPress={onPressNav}>
        <Icon name="arrow-left" size={20} color={COLORS.PRIMARY_MEDIUM} />
      </TouchableOpacity>
      <Text style={styles.appBarText}>{title}</Text>
      <Icon name={icoRight} size={20} color={COLORS.PRIMARY_MEDIUM} />
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // height: 60,
    elevation: 3,
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderColor: Platform.OS === 'ios' ? COLORS.GRAY_MEDIUM : null,
  },
  appBarText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});
