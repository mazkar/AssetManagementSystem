import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  ItemSurveyOpen,
  PopUpLoader,
  RefreshScreen,
  SurveyEmpty2,
} from '../../component/index.js';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

const SurveyOpen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [surveyToShow, setSurveyToShow] = useState([]);
  const currentDate = new Date().getTime();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const stateslc = useSelector((state) => console.log('all state =>', state));

  const surveyOpen = [
    {
      id: 1,
      atmId: '001',
      survey: 'Delivery Request',
      location: 'Werehouse Semarang',
      endDate: 1654199313000,
    },
    {
      id: 2,
      atmId: '002',
      survey: 'Delivery Request',
      location: 'Werehouse Bandung',
      endDate: 1654199313000,
    },
    {
      id: 3,
      atmId: '003',
      survey: 'Pick Up Request',
      location: 'Werehouse Jakarta',
      endDate: 1654199313000,
    },
  ];

  const navigationSurvey = item => {
    if (item.survey === 'Vendor FLM') {
      navigation.navigate('VendorFLM', {data: item});
    } else if (item.survey === 'Vendor FLM RPL') {
      navigation.navigate('VendorFLMRPL', {data: item});
    } else if (item.survey === 'Vendor SLM') {
      navigation.navigate('VendorSLM', {data: item});
    } else if (item.survey === 'Vendor CCTV') {
      navigation.navigate('VendorCCTV', {data: item});
    } else if (item.survey === 'Site Quality') {
      navigation.navigate('SiteQuality', {data: item});
    } else if (item.survey === 'Vendor Maintenance Premises') {
      navigation.navigate('VendorMaintenancePremises', {data: item});
    } else if (item.survey === 'Vendor Kebersihan') {
      navigation.navigate('VendorKebersihan', {data: item});
    } else if (item.survey === 'Inventory Cassette') {
      navigation.navigate('InventoryCassette', {data: item});
    } else if (item.survey === 'Media Promosi') {
      navigation.navigate('MediaPromosi', {data: item});
    } else {
      navigation.navigate('CobaScreen');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && <PopUpLoader visible={true} />}

      {errorMessage.message === 'Request failed with status code 500' ? (
        <></>
      ) : !isLoading && !!errorMessage ? (
        <RefreshScreen style={styles.refresh} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listData} // center emptyData component
          // data={surveyOpen}
          data={surveyOpen}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <ItemSurveyOpen
              style={styles.itemSurveyOpen}
              index={index + 1}
              vendor={item.survey !== null ? item.survey : '-'}
              atmId={item.atmId !== null ? item.atmId : '-'}
              location={item.location !== null ? item.location : '-'}
              deadline={
                item.endDate !== null
                  ? moment.unix(item.endDate / 1000).format('DD MMM YYYY')
                  : '--/--/----'
              }
              onPress={() => {
                // dispatch(surveyTimeAction.setSurveyTime(new Date().getTime()));
                // navigationSurvey(item);
                console.log('Nav');
              }}
            />
          )}
          ListEmptyComponent={
            <SurveyEmpty2 label1="Anda Belum Memiliki Survey Tersedia" />
          }
        />
      )}
    </View>
  );
};

export default SurveyOpen;

const styles = StyleSheet.create({
  container: {marginHorizontal: 20, flex: 1},
  itemSurveyOpen: {marginBottom: 20},
  listData: {flexGrow: 1},
  surveyEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 100,
    backgroundColor: 'transparent',
  },
});
