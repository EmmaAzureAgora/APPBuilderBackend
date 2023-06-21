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
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useMeetingInfo,
  ControlsComponentsArray,
  useRtc,
  useRender,
  customEvents,
} from 'customization-api';
import {BtnTemplate} from 'agora-rn-uikit';
import CustomIcons from './custom_icon';

const Controls = () => {
  const {
    data: {isHost},
  } = useMeetingInfo();
  const [
    LocalAudioMute,
    LocalVideoMute,
    LocalSwitchCamera,
    ScreenshareButton,
    Recording,
    LocalEndcall,
    LiveStreamControls,
  ] = ControlsComponentsArray;
  const {dispatch} = useRtc();
  const {activeUids} = useRender();

  const addIframe = (triggerEvent: boolean) => {
    if (!activeUids.filter((i) => i === 0).length) {
      dispatch({
        type: 'AddCustomContent',
        value: [0, {type: 'iframe'}],
      });
      if (triggerEvent) {
        customEvents.send('Addiframe', JSON.stringify({}), 2);
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
    <View style={style.bottomBar}>
      {isHost && (
        <View style={{alignSelf: 'center'}}>
          <BtnTemplate
            icon={CustomIcons.iframe}
            style={{width: 32, height: 32, marginLeft: 6, marginTop: 8}}
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
          {isHost && $config.CLOUD_RECORDING && (
            <View style={{alignSelf: 'baseline'}}>
              <Recording />
            </View>
          )}
          {!$config.AUDIO_ROOM && (
            <View style={{alignSelf: 'center'}}>
              <LocalSwitchCamera />
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
  bottomBar: {
    flex: 1,
    paddingHorizontal: '1%',
    backgroundColor: $config.SECONDARY_FONT_COLOR + '80',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'relative',
    margin: 0,
    minHeight: 40,
    bottom: 0,
  },
  localButton: {
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    borderRadius: 2,
    borderColor: $config.PRIMARY_COLOR,
    width: 40,
    height: 40,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 35,
    height: 35,
    tintColor: $config.PRIMARY_COLOR,
  },
});

export default Controls;
