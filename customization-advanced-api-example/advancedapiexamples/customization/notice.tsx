import React, {useState} from 'react';
import {UiKitBtnTemplate} from 'customization-api';
import {StyleSheet, View, Text} from 'react-native';

const Notice = (props: {message: string}) => {
  const [showNotice, setShowNotice] = useState(true);

  if (!showNotice) {
    return <></>;
  }

  return (
    <View style={styles.noticeContainer}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          paddingVertical: 20,
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{props.message}</Text>
        </View>
        <View style={styles.closeBtnContainer}>
          <UiKitBtnTemplate
            style={styles.closeBtnStyle}
            color={'#FD0845'}
            name={'close'}
            onPress={() => setShowNotice(false)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  closeBtnContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  closeBtnStyle: {
    width: 25,
    height: 25,
    marginTop: 5,
    marginLeft: 20,
  },
});

export default Notice;
