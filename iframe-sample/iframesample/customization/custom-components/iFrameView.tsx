import React from 'react';

export default function iFrameView() {
  return (
    <iframe
      frameBorder="0"
      width="100%"
      height="100%"
      marginHeight={0}
      marginWidth={0}
      src="https://docs.google.com/forms/d/e/1FAIpQLSeQAhwa_KM3HSMVyyXdmmXTi1SsR4Z-A-03WPjkjP2mPXntIg/viewform?embedded=true">
      Loading…
    </iframe>
  );
}
