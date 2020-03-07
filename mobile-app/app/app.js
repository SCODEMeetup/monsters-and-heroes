import Vue from "nativescript-vue";

import SnapIt from "./components/SnapIt";

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({
  template: `
        <Frame>
            <SnapIt />
        </Frame>`,

  components: {
    SnapIt
  }
}).$start();
