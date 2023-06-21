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
import {View, StyleSheet} from 'react-native';

const ChatInput = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
    justifyContent: 'center',
    height: 40,
    alignSelf: 'center',
  },
});

const customization = customize({
  components: {
    videoCall: {
      chat: {
        chatInput: ChatInput,
      },
    },
  },
});

export default customization;
