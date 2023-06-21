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
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  customize,
  layoutComponent,
  RenderComponent,
  useRtc,
} from 'customization-api';
//@ts-ignore
import topPinnedLayoutIcon from '../assets/icons8-layout-64.png';

const CustomLayout: layoutComponent = ({renderData}) => {
  const [dim, setDim] = useState([
    Dimensions.get('window').width,
    Dimensions.get('window').height,
    Dimensions.get('window').width > Dimensions.get('window').height,
  ]);
  let onLayout = () => {
    setTimeout(() => {
      let {height, width} = Dimensions.get('window');
      let isLandscape = width > height;
      setDim([width, height, isLandscape]);
    }, 20);
  };
  const {dispatch} = useRtc();
  const [maxUid, ...minUids] = renderData;

  return (
    <View style={style.container} onLayout={onLayout}>
      <ScrollView horizontal={true} decelerationRate={0} style={{flex: 1}}>
        {minUids.map((minUid, i) => (
          <Pressable
            style={{
              width: ((dim[1] / 3) * 16) / 9 / 2 + 12, //dim[1] /4.3
              height: '100%',
              zIndex: 40,
              paddingRight: 8,
              paddingVertical: 4,
            }}
            key={'minVideo' + i}
            onPress={() => {
              dispatch({type: 'SwapVideo', value: [minUid]});
            }}>
            <RenderComponent uid={minUid} />
          </Pressable>
        ))}
      </ScrollView>
      <View style={style.flex4}>
        <RenderComponent uid={maxUid} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    padding: 4,
  },
  width80: {width: '80%'},
  width100: {width: '100%'},
  flex2: {flex: 2},
  flex4: {flex: 4, backgroundColor: '#ffffff00'},
  flex1: {flex: 1},
});

const customization = customize({
  components: {
    videoCall: {
      customLayout: (defaultLayouts) => [
        ...defaultLayouts,
        {
          component: CustomLayout,
          label: 'Custom Layout',
          name: 'CustomLayout',
          icon: topPinnedLayoutIcon,
        },
      ],
    },
  },
});

export default customization;
