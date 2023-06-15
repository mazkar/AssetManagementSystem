import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styles from '../../screen/Dashboard/styles';
import {ICONS} from '../../assets/theme';
import {Chart} from '..';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import MapTracker from '../widget/MapTracker';

const TaskPending = props => {
  const {valueOpen, valueDone, valueTotal, surveyChart = []} = props;
  const survey = [
    {
      name: 'Done',
      y: 1,
    },
    {
      name: 'Open',
      y: 2,
    },
  ];
  console.log('data chart =>', surveyChart);

  const navigateToTracking = () => {
    props.navigation.navigate('Tracker');
  };

  return (
    <ScrollView horizontal style={styles.surveyProgres}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToTracking()}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContiner}>
            <Text style={styles.txtTitle}>Delivery Tracking PO-223</Text>
          </View>
        </View>

        {/* victory chart */}
        <MapTracker />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TaskPending;
