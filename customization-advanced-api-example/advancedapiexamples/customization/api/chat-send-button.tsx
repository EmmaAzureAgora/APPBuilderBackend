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
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  customize,
  ChatSendButtonProps,
  icons,
  useChatUIControl,
  useMessages,
  $config,
} from 'customization-api';
import {TouchableOpacity, Image} from 'react-native';
import * as leoProfanity from 'leo-profanity';

const ChatSendButton = (props: ChatSendButtonProps) => {
  const {
    selectedChatUserId: selectedUserId,
    message,
    setMessage,
  } = useChatUIControl();
  const {sendMessage} = useMessages();
  const onPress = () => {
    if (!selectedUserId) {
      sendMessage(leoProfanity.clean(message));
      setMessage && setMessage('');
    } else {
      sendMessage(leoProfanity.clean(message), selectedUserId);
      setMessage && setMessage('');
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: icons.send,
        }}
        style={styles.imgStyle}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    marginRight: 0,
    height: 30,
    borderRadius: 30,
    alignSelf: 'center',
    marginHorizontal: 10,
    backgroundColor: '#90EE90',
    display: 'flex',
    justifyContent: 'center',
  },
  imgStyle: {
    tintColor: 'black',
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    transform: [
      {
        translateX: -2,
      },
    ],
  },
});

const customization = customize({
  components: {
    videoCall: {
      chat: {
        chatSendButton: ChatSendButton,
      },
    },
  },
});

export default customization;
