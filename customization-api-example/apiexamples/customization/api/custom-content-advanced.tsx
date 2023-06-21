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
import {customize, useRtc} from 'customization-api';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>
          Here is your new video view component. Use app-state and
          sub-components to customize your video view
          {'\n'} //TODO put documentation links which helpful to user
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    maxHeight: 200,
    borderRadius: 30,
  },
  textStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
  },
});

const customization = customize({
  components: {
    videoCall: {
      customContent: {
        //customview is key
        customview: CustomView,
      },
      useUserContext: function useUserContext() {
        const {dispatch} = useRtc();
        useEffect(() => {
          dispatch({
            type: 'AddCustomContent',
            //value 0 = uid
            //value 1 = user data
            //type should match the customContent key otherwise it will fallback to default view
            value: [new Date().getTime(), {name: 'user', type: 'customview'}],
          });
        }, []);
      },
    },
  },
});

export default customization;
