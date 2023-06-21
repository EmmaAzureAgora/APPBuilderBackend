import { customize } from "customization-api";

import MyChatBubbleComponent from "./components/MyChatBubbleComponent";

const userCustomization = customize({
  components: {
    videoCall: {
      chat: {
        chatBubble: MyChatBubbleComponent,
      },
    },
  },
});

export default userCustomization;
