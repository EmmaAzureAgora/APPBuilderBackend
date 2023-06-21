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
import {
  customize,
  VideoComponent,
  Controls,
  Navbar,
  useSidePanel,
  ParticipantsView,
  Chat,
  SettingsView,
  isWeb,
  SidePanelType,
} from 'customization-api';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Notice from '../notice';

const VideoCallPage = () => {
  const {sidePanel} = useSidePanel();

  return (
    <View style={{flex: 1}}>
      <Notice message="This video call page was rebuilt using the sub-components library." />
      <View style={styles.container}>
        <Navbar />
        <View style={[styles.videoView, {backgroundColor: '#ffffff00'}]}>
          <VideoComponent />
          {sidePanel === SidePanelType.Participants ? (
            <ParticipantsView />
          ) : (
            <></>
          )}
          {sidePanel === SidePanelType.Chat ? (
            $config.CHAT ? (
              <Chat />
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {sidePanel === SidePanelType.Settings ? <SettingsView /> : <></>}
        </View>
        {!isWeb() && sidePanel === SidePanelType.Chat ? <></> : <Controls />}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  videoView: {
    flex: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  noticeContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#90EE90',
    maxHeight: 50,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  textContainer: {
    justifyContent: 'center',
  },
});

const customization = customize({
  components: {
    videoCall: VideoCallPage,
  },
});

export default customization;
