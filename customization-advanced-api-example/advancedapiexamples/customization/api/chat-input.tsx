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
  ChatTextInputProps,
  useChatUIControl,
  useMessages,
  TextInput,
  $config,
} from 'customization-api';
import * as leoProfanity from 'leo-profanity';

const ChatInput = (props: ChatTextInputProps) => {
  const {
    selectedChatUserId: selectedUserId,
    message,
    setMessage,
  } = useChatUIControl();
  const {sendMessage} = useMessages();
  const chatMessageInputPlaceholder = 'Type your message..';
  const onChangeText = (text: string) => setMessage(text);
  const onSubmitEditing = () => {
    if (!selectedUserId) {
      sendMessage(leoProfanity.clean(message));
      setMessage('');
    } else {
      sendMessage(leoProfanity.clean(message), selectedUserId);
      setMessage('');
    }
  };

  return (
    <>
      <TextInput
        value={message}
        onChangeText={onChangeText}
        style={styles.textInputStyle}
        blurOnSubmit={false}
        onSubmitEditing={onSubmitEditing}
        placeholder={chatMessageInputPlaceholder}
        placeholderTextColor={$config.PRIMARY_FONT_COLOR}
        autoCorrect={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 10,
    backgroundColor: '#90EE90',
    borderColor: $config.PRIMARY_COLOR,
    borderWidth: 1,
    color: $config.PRIMARY_FONT_COLOR,
    textAlign: 'left',
    height: 40,
    paddingVertical: 10,
    flex: 1,
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
