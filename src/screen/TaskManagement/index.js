import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RootContainer, AppBar, GeneralButton} from '../../component';
import {COLORS} from '../../assets/theme';
import SurveyOpen from './TaskPending';

export default function TaskManagement({navigation}) {
  const [changeTab, setChangeTab] = useState(false);
  const handlerOpenTab = () => {
    console.log(true);
    setChangeTab(false);
  };

  const handlerDoneTab = () => {
    setChangeTab(true);
  };

  return (
    <RootContainer isTransparent>
      <View style={styles.container}>
        <AppBar
          title="Task Management"
          onPressNav={() => {
            navigation.navigate('Dashboard');
          }}
        />
        <View style={styles.btnSurveyWrapper}>
          <GeneralButton
            style={{
              ...styles.openButton,
              backgroundColor: changeTab ? COLORS.WHITE : COLORS.PRIMARY_MEDIUM,
            }}
            labelStyle={{
              color: changeTab ? COLORS.PRIMARY_MEDIUM : COLORS.WHITE,
            }}
            mode="contained"
            onPress={handlerOpenTab}>
            Pending
          </GeneralButton>
          <GeneralButton
            style={{
              ...styles.openButton,
              backgroundColor: changeTab ? COLORS.WHITE : COLORS.PRIMARY_MEDIUM,
            }}
            labelStyle={{
              color: changeTab ? COLORS.PRIMARY_MEDIUM : COLORS.WHITE,
            }}
            mode="contained"
            onPress={handlerOpenTab}>
            Progres
          </GeneralButton>
          <GeneralButton
            style={{
              ...styles.doneButtonStyle,
              backgroundColor: changeTab ? COLORS.PRIMARY_MEDIUM : COLORS.WHITE,
            }}
            mode="contained"
            labelStyle={{
              color: changeTab ? COLORS.WHITE : COLORS.PRIMARY_MEDIUM,
            }}
            onPress={handlerDoneTab}>
            Done
          </GeneralButton>
        </View>
        {changeTab ? <SurveyOpen /> : <SurveyOpen />}
      </View>
    </RootContainer>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  btnSurveyWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 20,
  },
  openButton: {
    width: '30%',
    borderWidth: 1,
    color: COLORS.PRIMARY_MEDIUM,
    borderColor: COLORS.PRIMARY_MEDIUM,
  },
  doneButtonStyle: {
    width: '30%',
    borderWidth: 1,
    color: COLORS.PRIMARY_MEDIUM,
    borderColor: COLORS.PRIMARY_MEDIUM,
  },
});
