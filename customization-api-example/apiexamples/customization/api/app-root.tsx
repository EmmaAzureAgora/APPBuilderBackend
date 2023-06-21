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
import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export interface AppRootInterface {
  customKey1?: string;
  customKey2?: string;
}

const AppRootContext = React.createContext<AppRootInterface>({
  customKey1: 'default value 1',
  customKey2: 'default value 2',
});

interface AppRootProviderProps {
  children: React.ReactNode;
}

const AppRootProvider = (props: AppRootProviderProps) => {
  const [customState, setCustomState] = useState<AppRootInterface>({});
  useEffect(() => {
    setCustomState({
      customKey1: 'custom value 1',
      customKey2: 'custom value 2',
    });
  }, []);
  return (
    <AppRootContext.Provider value={{...customState}}>
      {props.children}
    </AppRootContext.Provider>
  );
};

const VideoCallPage = () => {
  const {customKey1, customKey2} = useContext(AppRootContext);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>
          Custom key 1 - {customKey1} {'\n'}
          Custom key 2 - {customKey2} {'\n'}
        </Text>
        <Text style={styles.textStyle}>
          Here is your app root sample usage.
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
    appRoot: AppRootProvider,
    videoCall: VideoCallPage,
  },
});

export default customization;
