import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {GeneralButton} from '..';
import {COLORS, FONTS} from '../../assets/theme';
import {useNavigation} from '@react-navigation/native';
const ItemSurveyOpen = props => {
  const navigation = useNavigation();
  const {style, atmId, location, deadline, vendor, index, onPress} = props;
  return (
    <View style={[styles.container, style]}>
      <View style={styles.txtContainer}>
        <View style={styles.txtRowContainer}>
          <Text style={[styles.txt1, {marginRight: 4}]}>{index}.</Text>
          <View>
            <Text style={[styles.txt1, {marginBottom: 8}]}>{vendor}</Text>
            <View style={styles.txtRowContainer}>
              <View>
                <Text style={styles.txt2}>Task ID</Text>
                <Text style={styles.txt2}>Loc</Text>
                <Text style={styles.txt2}>Deadline</Text>
              </View>
              <View>
                <Text style={styles.txt2}> : </Text>
                <Text style={styles.txt2}> : </Text>
                <Text style={styles.txt2}> : </Text>
              </View>
              <View style={{width: '68%'}}>
                <Text style={[styles.txt1, {marginBottom: 8}]}>{atmId}</Text>
                <Text
                  style={[styles.txt1, {marginBottom: 8}]}
                  numberOfLines={1}>
                  {location}
                </Text>
                <Text style={[styles.txt1, {marginBottom: 8}]}>{deadline}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <GeneralButton
        style={styles.surveyButton}
        mode="contained"
        onPress={onPress}>
        Procceed
      </GeneralButton>
    </View>
  );
};

export default ItemSurveyOpen;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
  },
  txt1: {
    fontSize: FONTS.v15,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    color: COLORS.DARK,
  },
  txt2: {
    fontSize: FONTS.v15,
    fontWeight: '400',
    color: COLORS.DARK,
    marginBottom: 8,
  },
  txtContainer: {marginBottom: 16},
  txtRowContainer: {flexDirection: 'row'},
});
