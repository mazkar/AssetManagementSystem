import React from 'react';
import {Text, View} from 'react-native';
import styles from '../../screen/Dashboard/styles';
import {ICONS} from '../../assets/theme';
import {Chart} from '..';

const OverviewProgres = props => {
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

  return (
    <View style={styles.surveyProgres}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContiner}>
            <Text style={styles.txtTitle}>SDR</Text>
          </View>
        </View>

        {/* victory chart */}
        <Chart
          data={survey}
          surveyOpen={valueOpen}
          surveyDone={valueDone}
          totalSurvey={valueTotal}
        />
      </View>
    </View>
  );
};

export default OverviewProgres;
