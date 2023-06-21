import {customize} from 'customization-api';
import iFrameView from './custom-components/iFrameView';
import CustomBottomBar from './custom-components/CustomBottomBar';
const userCustomization = customize({
  components: {
    videoCall: {
      bottomBar: CustomBottomBar,
      customContent: {
        iframe: iFrameView,
      },
    },
  },
});

export default userCustomization;
