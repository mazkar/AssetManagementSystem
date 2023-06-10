import {View, Text} from 'react-native';
import React from 'react';
import {GeneralButton} from '../../component';
import {useDispatch} from 'react-redux';
import {resetReducer} from '../../store/models/auth/actions';

export default function Profile({navigation}) {
  const dispatch = useDispatch();

  const handleLogut = () => {
    dispatch(resetReducer());
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View style={{paddingHorizontal: 24, paddingVertical: 72}}>
      <GeneralButton
        // style={styles.gettingButton}
        mode="contained"
        onPress={() => handleLogut()}>
        Sign Out
      </GeneralButton>
    </View>
  );
}
