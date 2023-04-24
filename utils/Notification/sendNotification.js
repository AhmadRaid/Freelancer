//import * as OneSignal from "@onesignal/node-onesignal";
const OneSignal = require('@onesignal/node-onesignal');


OneSignal
    .push(function(){
      OneSignal.init({
        appId : "468731da-2cc8-4236-887e-8c9dae193f5c"
      })
    }) 

const user_key_provider = {
  getToken() {
    return "MjAzYTQ5MzUtZTEzNC00NWI0LTgzNWUtOWYyY2VmMDcxYmYx";
  },
};

const app_key_provider = {
  getToken() {
    return "OGFmOTc4NTEtNTEzNy00NDBjLWJlOGEtYjcyY2NjZTUwYjgx";
  },
};

// configuration object
let configuration = OneSignal.createConfiguration({
  authMethods: {
    user_key: {
      tokenProvider: user_key_provider,
    },
    app_key: {
      tokenProvider: app_key_provider,
    },
  },
});

let client = new OneSignal.DefaultApi(configuration);

const notification = new OneSignal.Notification();
notification.app_id = "468731da-2cc8-4236-887e-8c9dae193f5c";

notification.contents = {
  en: "Gig'em Ags"
}

// required for Huawei
notification.headings = {
  en: "Gig'em Ags",
}

notification.included_segments = ['04/16/2023 Segment'];
client.createNotification(notification);
