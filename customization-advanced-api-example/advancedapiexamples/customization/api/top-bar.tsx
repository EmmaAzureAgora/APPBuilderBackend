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
import {customize} from 'customization-api';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  useMeetingInfo,
  useRecording,
  NavBarComponentsArray,
  $config,
} from 'customization-api';
import Notice from '../notice';

const TopBar = () => {
  const {
    data: {meetingTitle},
  } = useMeetingInfo();
  const [
    CopyJoinInfo,
    ParticipantsCountView,
    ParticipantsIconButton,
    ChatIconButton,
    LayoutIconButton,
    SettingsIconButton,
  ] = NavBarComponentsArray;

  return (
    <View style={style.rootContainer}>
      <Notice message="This top bar component was rebuilt using the sub-components library." />
      <View style={style.container}>
        <View style={style.titleContainer}>
          <View>
            <Text>
              {meetingTitle} {' - Sample App'}
            </Text>
          </View>
          <View style={[style.navItem]}>
            <CopyJoinInfo />
          </View>
        </View>
        <View style={style.iconContainer}>
          <View style={[style.navItem]}>
            <ParticipantsIconButton />
          </View>
          {$config.CHAT ? (
            <>
              <View style={[style.navItem]}>
                <ChatIconButton />
              </View>
            </>
          ) : (
            <></>
          )}
          <View
            style={[style.navItem]}
            /**
             * .measure returns undefined on Android unless collapsable=false or onLayout are specified
             * so added collapsable property
             * https://github.com/facebook/react-native/issues/29712
             * */
            collapsable={false}>
            <LayoutIconButton />
          </View>
          <View style={[style.navItem]}>
            <SettingsIconButton />
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    maxWidth: 300,
  },
  navItem: {
    width: 30,
    height: 30,
    alignItems: 'center',
    position: 'relative',
  },
});

const customization = customize({
  components: {
    videoCall: {
      topBar: TopBar,
    },
  },
});

export default customization;
