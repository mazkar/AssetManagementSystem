import {
  View,
  Text,
  // ScrollView,
  // RefreshControl,
  StyleSheet,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import React, {useState, useCallback, useEffect} from 'react';

import useNavigation from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {COLORS, FONTS} from '../../assets/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import BgLogin from '../../assets/images/svg/bgLogin.svg';
import VectLogin from '../../assets/images/svg/vectorLogin.svg';

import constants from '../../assets/constants';
import Logo from '../../assets/images/svg/appLogo.svg';
import {
  GeneralButton,
  GeneralTextInput,
  TextInputPassword,
  PopUpLoader,
} from './../../component/index';

const LoginPage = () => {
  // const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [handlerChangeLanguage, setHandlerChangeLanguage] = useState(0);
  const [authLoading, setAuthLoading] = useState(false);

  // FORM
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = React.useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const refreshScreen = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  // Hanlde Login

  function doLoginUser() {
    console.log('Login');

    // check
  }

  // IOS
  const headerFlexContainerIos = height => {
    console.log('INI HEIGHT', height);
    if (height >= 926) {
      console.log('HEADER 986');
      return 1.3;
    } else if (height < 926 && height >= 896) {
      console.log('HEADER 926 && 896');
      return 1.2;
    } else if (height < 926 && height >= 844) {
      console.log('HEADER 986 && 844');
      return 1.1;
    } else if (height >= 736 && height >= 812) {
      console.log('HEADER 844 && 812');
      return 1;
    } else if (height < 812 && height >= 736) {
      console.log('height < 812 && height >= 736');
      return 0.9;
    } else {
      console.log('ELSE HEADER');
      return 0.8;
    }
  };

  const footerFlexContainerIos = height => {
    console.log('INI HEIGHT', height);
    if (height >= 896) {
      console.log('FOOTER 986');
      return 1.3;
    } else if (height < 926 && height >= 844) {
      console.log('FOOTER 986 && 844');
      return 1.2;
    } else if (height < 844 && height >= 812) {
      console.log('FOOTER 844 && 812');
      return 1.1;
    } else if (height < 812 && height >= 736) {
      console.log('FOOTER 812 && 736');
      return 1;
    } else {
      console.log('ELSE FOOTER');
      return 0.8;
    }
  };

  // ANDROID
  const headerFlexContainerAndroid = height => {
    if (height <= 732) {
      console.log('HEADER height <= 732');
      return 0.85;
    } else {
      console.log('HEADER ELSE');
      return 0.9;
    }
  };

  const footerFlexContainerAndroid = height => {
    if (height <= 732) {
      console.log('FOOTER height <= 732');
      return 0.725;
    } else {
      console.log('FOOTER ELSE');
      return 1;
    }
  };

  const handlerIndonesiaText = () => {
    setHandlerChangeLanguage(0);
  };

  const handlerEnglishText = () => {
    setHandlerChangeLanguage(1);
  };

  return (
    <View style={styles.container} edges={['left', 'right', 'top']}>
      <View
        style={{
          ...styles.headerContainer,
          flex:
            Platform.OS === 'ios'
              ? headerFlexContainerIos(Dimensions.get('screen').height)
              : headerFlexContainerAndroid(Dimensions.get('screen').height),
        }}>
        <View style={styles.logoWrapper}>
          <Text
            width={constants.SCREEN_WIDTH * (1 / 3)}
            height={constants.SCREEN_WIDTH * (1 / 3)}
          />
          <Text>LOGO</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.formContiner}>
          <Text>Username/Email</Text>
          <GeneralTextInput
            placeholder={
              handlerChangeLanguage === 0
                ? 'masukkan username/email'
                : 'enter username/email'
            }
            mode="outlined"
            value={username}
            onChangeText={e => setUsername(e)}
            style={styles.inputUserName}
          />
          <Text>Password</Text>
          <TextInputPassword
            placeholder={
              handlerChangeLanguage === 0
                ? 'masukkan password'
                : 'enter password'
            }
            mode="outlined"
            value={password}
            secureTextEntry={hidePassword}
            icoPress={() => {
              setHidePassword(!hidePassword);
              return false;
            }}
            onChangeText={e => setPassword(e)}
            style={styles.inputUserPassword}
          />
          <View style={styles.rowContiner}>
            {/* <View style={styles.rememberMe}>
              <Checkbox.Android
                status={rememberMe.status === true ? 'checked' : 'unchecked'}
                onPress={doRememberUser}
              />

              {handlerChangeLanguage === 0 ? (
                <Text>Ingat Saya</Text>
              ) : (
                <Text>Remember Me</Text>
              )}
            </View> */}

            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('LupaPassword');
                console.log('res');
              }}>
              {handlerChangeLanguage === 0 ? (
                <Text style={styles.lupaEP}>
                  Lupa Password{' '}
                  <Icon
                    name="question-circle"
                    size={17}
                    color={COLORS.PRIMARY_MEDIUM}
                  />
                </Text>
              ) : (
                <Text style={styles.lupaEP}>
                  Forget Password{' '}
                  <Icon
                    name="question-circle"
                    size={17}
                    color={COLORS.PRIMARY_MEDIUM}
                  />
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <GeneralButton
            style={styles.gettingButton}
            mode="contained"
            onPress={doLoginUser}>
            Login
          </GeneralButton>

          {/* BUTTON WRAPPER BOTTOM */}
          <View style={styles.bhsContainer}>
            <TouchableOpacity onPress={handlerIndonesiaText}>
              <Text
                style={{
                  ...styles.txtBhs,
                  color:
                    handlerChangeLanguage === 0
                      ? COLORS.PRIMARY_MEDIUM
                      : COLORS.GRAY_MEDIUM,
                }}>
                Indonesia
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerEnglishText}>
              <Text
                style={{
                  ...styles.txtBhs,
                  color:
                    handlerChangeLanguage === 1
                      ? COLORS.PRIMARY_MEDIUM
                      : COLORS.GRAY_MEDIUM,
                }}>
                English
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.footerContainer,
          flex:
            Platform.OS === 'ios'
              ? footerFlexContainerIos(Dimensions.get('screen').height)
              : footerFlexContainerAndroid(Dimensions.get('screen').height),
        }}>
        <View style={styles.contentButtonContainer}></View>
        <View style={{flex: 1}}>
          {/* <BgLogin
            width={'100%'}
            preserveAspectRatio="none"
            height={'100%'}
            style={{position: 'absolute', bottom: 0}}
          />
          <VectLogin style={styles.vectLog} height={'70%'} /> */}
          <Text style={styles.cpyrht}>
            {constants.COPYRIGHT} | ATM Business Group
          </Text>
        </View>
      </View>

      {authLoading ? (
        <PopUpLoader visible={true} />
      ) : (
        <PopUpLoader visible={false} />
      )}

      <FlashMessage statusBarHeight={30} />
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  // CONTAINER
  container: {flex: 1},
  // ITEMS CONTAINER
  headerContainer: {
    justifyContent: 'center',
    // backgroundColor: 'yellow',
  },
  contentContainer: {
    flex: 2,
    padding: 20,
    // backgroundColor: 'green',
  },
  contentButtonContainer: {
    flex: 0.7,
    paddingHorizontal: 20,
    // backgroundColor: 'brown',
    flexDirection: 'column',
  },
  footerContainer: {
    // backgroundColor: 'gray',
  },

  // HEADER ITEMS STYLE
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gettingButton: {marginTop: 10},

  inputUserName: {backgroundColor: COLORS.WHITE, marginBottom: 24},
  inputUserPassword: {backgroundColor: COLORS.WHITE},
  rememberMe: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  lupaEP: {
    color: COLORS.PRIMARY_MEDIUM,
  },
  bhsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  txtBhs: {
    marginHorizontal: 5,
    fontSize: FONTS.v15,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    fontFamily: 'Barlow',
  },

  // ITEMS CONTENT INPUT WRAPPER
  formContiner: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 8,
  },
  rowContiner: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  // BUTTON WRAPPER BOTTOM STYLES
  rowBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  btnContainer1: {
    flex: 1,
    paddingRight: 10,
  },
  btnContainer2: {
    flex: 1,
    paddingLeft: 10,
  },

  // FOOTER ITEMS
  vectLog: {position: 'absolute', bottom: 0, left: -20},
  cpyrht: {
    fontSize: FONTS.v11,
    fontWeight: '600',
    fontFamily: 'Barlow',
    textAlign: 'center',
    color: COLORS.WHITE,
    position: 'absolute',
    left: 100,
    bottom: 20,
  },
});
