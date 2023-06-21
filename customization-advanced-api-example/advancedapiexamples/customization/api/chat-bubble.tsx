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
import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {
  ChatBubbleProps,
  ChatBubble,
  useMessages,
  useChatUIControl,
  useLocalUid,
  $config,
} from 'customization-api';
import * as leoProfanity from 'leo-profanity';

const CustomChatBubble = (props: ChatBubbleProps) => {
  const [editActive, setEditActive] = useState(false);
  const {editMessage, deleteMessage} = useMessages();
  const localUid = useLocalUid();
  const {privateActive, selectedChatUserId} = useChatUIControl();
  const [editMsgLocal, setEditMsgLocal] = useState('');
  if (editActive) {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          placeholder={'Edit message'}
          onChangeText={(txt) => setEditMsgLocal(txt)}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              //do edit
              editMessage(
                props.msgId,
                editMsgLocal,
                privateActive ? selectedChatUserId : undefined,
              );
              setEditActive(false);
            }}>
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginHorizontal: 10}}
            onPress={() => {
              setEditActive(false);
            }}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ChatBubble
        {...props}
        message={
          props.isDeleted
            ? 'This message was deleted'
            : leoProfanity.clean(props.message)
        }
      />
      {props.uid === localUid && (
        <View style={styles.btnContainer}>
          {!props?.isDeleted && (
            <>
              <TouchableOpacity
                onPress={() => {
                  setEditActive(true);
                }}>
                <Text>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() => {
                  deleteMessage(
                    props.msgId,
                    privateActive ? selectedChatUserId : undefined,
                  );
                }}>
                <Text style={{color: 'red'}}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#90EE90',
    borderWidth: 5,
  },
  textInputStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
    width: '90%',
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: $config.PRIMARY_COLOR,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

const customization = customize({
  components: {
    videoCall: {
      chat: {
        chatBubble: CustomChatBubble,
      },
    },
  },
});

export default customization;
