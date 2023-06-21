import React from 'react';
import {WebView} from 'react-native-webview';
export default function iFrameView() {
  return (
    <WebView
      source={{
        uri: 'https://docs.google.com/forms/d/e/1FAIpQLSeQAhwa_KM3HSMVyyXdmmXTi1SsR4Z-A-03WPjkjP2mPXntIg/viewform?embedded=true',
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
}
