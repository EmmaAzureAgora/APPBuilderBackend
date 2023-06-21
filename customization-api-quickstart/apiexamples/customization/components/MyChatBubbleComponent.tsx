import {ChatBubble, useRender, $config} from 'customization-api';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ChatBubbleComponent = (props) => {
  const {uid, isLocal} = props;

  // Get data from render app-state
  const {renderList} = useRender();

  // Fetch username using uid
  const displayName = renderList[uid].name;

  const {
    container,
    containerLocal,
    containerRemote,
    username,
    usernameLocal,
    usernameRemote,
  } = styles;

  return (
    <View style={[container, isLocal ? containerLocal : containerRemote]}>
      <View style={[username, isLocal ? usernameLocal : usernameRemote]}>
        <Text style={{fontWeight: 'bold', color: isLocal ? 'white' : 'black'}}>
          {displayName.slice(0, 1)}
        </Text>
      </View>
      <View style={{maxWidth: '80%'}}>
        <ChatBubble {...props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
  },
  containerLocal: {
    flexDirection: 'row-reverse',
  },
  containerRemote: {
    flexDirection: 'row',
  },
  username: {
    height: 32,
    width: 32,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5px',
  },
  usernameLocal: {
    marginLeft: -10,
    marginRight: 5,
    backgroundColor: $config.PRIMARY_COLOR,
  },
  usernameRemote: {
    marginLeft: 5,
    marginRight: -10,
    backgroundColor: $config.PRIMARY_FONT_COLOR + '20',
  },
});

export default ChatBubbleComponent;
