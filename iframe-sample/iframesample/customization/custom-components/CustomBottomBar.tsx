/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
import React, {useState} from 'react';
import {
  useMeetingInfo,
  ControlsComponentsArray,
  useRtc,
  useRender,
  customEvents,
} from 'customization-api';
import {View, Dimensions, StyleSheet, Platform} from 'react-native';
import isMobileOrTablet from '../../src/utils/isMobileOrTablet';
import {useEffect} from 'react';
import {BtnTemplate} from '../../agora-rn-uikit';
import CustomIcons from './custom_icon';

const CustomBottomBar = () => {
  const [
    LocalAudioMute,
    LocalVideoMute,
    LocalSwitchCamera,
    ScreenshareButton,
    Recording,
    LocalEndcall,
    LiveStreamControls,
  ] = ControlsComponentsArray;

  let onLayout = (e: any) => {
    setDim([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };
  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  const isDesktop = dim[0] > 1224;
  const {
    data: {isHost},
  } = useMeetingInfo();

  const {dispatch} = useRtc();
  const {activeUids} = useRender();

  const addIframe = (triggerEvent: boolean) => {
    if (!activeUids.filter((i) => i === 0).length) {
      dispatch({
        type: 'AddCustomContent',
        value: [0, {type: 'iframe'}],
      });
      if (triggerEvent) {
        customEvents.send('Addiframe', JSON.stringify({}), 3);
      }
    }
  };

  useEffect(() => {
    customEvents.on('Addiframe', (data) => {
      if (data) {
        addIframe(false);
      }
    });
  });

  return (
    <View
      style={[
        style.controlsHolder,
        {
          paddingHorizontal: isDesktop ? '25%' : '1%',
          backgroundColor: $config.SECONDARY_FONT_COLOR + 80,
        },
      ]}
      onLayout={onLayout}>
      {isHost && (
        <View style={{alignSelf: 'center'}}>
          <BtnTemplate
            icon={CustomIcons.iframe}
            style={{width: 32, height: 32, marginLeft: 8}}
            color={$config.PRIMARY_COLOR}
            btnText={'Iframe'}
            onPress={() => {
              addIframe(true);
            }}
          />
        </View>
      )}
      {$config.EVENT_MODE && !isHost ? (
        <LiveStreamControls showControls={true} />
      ) : (
        <>
          {/**
           * In event mode when raise hand feature is active
           * and audience is promoted to host, the audience can also
           * demote himself
           */}
          {$config.EVENT_MODE && <LiveStreamControls showControls={!isHost} />}
          <View style={{alignSelf: 'center'}}>
            <LocalAudioMute />
          </View>
          {!$config.AUDIO_ROOM && (
            <View style={{alignSelf: 'center'}}>
              <LocalVideoMute />
            </View>
          )}
          {!$config.AUDIO_ROOM && isMobileOrTablet() && (
            <View style={{alignSelf: 'center'}}>
              <LocalSwitchCamera />
            </View>
          )}
          {$config.SCREEN_SHARING && !isMobileOrTablet() && (
            <View style={{alignSelf: 'center'}}>
              <ScreenshareButton />
            </View>
          )}
          {isHost && $config.CLOUD_RECORDING && (
            <View style={{alignSelf: 'center'}}>
              <Recording />
            </View>
          )}
        </>
      )}
      <View style={{alignSelf: 'center'}}>
        <LocalEndcall />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  // @ts-ignore
  controlsHolder: {
    flex: Platform.OS === 'web' ? 1.3 : 1.6,
    minHeight: 80,
    maxHeight: '8%',
    backgroundColor: '#f1f4f9',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'relative',
    margin: 0,
    bottom: 0,
  },
});

export default CustomBottomBar;
