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
import {customize, ControlsComponentsArray} from 'customization-api';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Notice from '../notice';

const BottomBar = () => {
  const [AudioBtn, VideoBtn, _, ScreenshareButton, Recording, Endcall] =
    ControlsComponentsArray;
  return (
    <View>
      <Notice message="This bottom bar component was rebuilt using the sub-components" />
      <View style={styles.container}>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <VideoBtn />
        </View>
        <View
          style={{
            marginVertical: 10,
            alignSelf: 'center',
          }}>
          <AudioBtn />
        </View>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <ScreenshareButton />
        </View>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <Recording />
        </View>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <Endcall />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1.3,
    minHeight: 80,
    maxHeight: '8%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'relative',
    margin: 0,
    bottom: 0,
    paddingHorizontal: '25%',
  },
});

const customization = customize({
  components: {
    videoCall: {
      bottomBar: BottomBar,
    },
  },
});

export default customization;
