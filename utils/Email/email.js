const axios = require('axios');

const ONESIGNAL_APP_ID = "468731da-2cc8-4236-887e-8c9dae193f5c";
const API_KEY = "MDUyYjVmZTUtZWVhYy00Yzg3LWExN2YtNzZjMGRjMmU0MWYw";
const BASE_URL = "https://onesignal.com/api/v1";

const body = {
  app_id: ONESIGNAL_APP_ID,
  included_segments: ["Subscribed Users"],
  data: {
    foo: "bar",
  },
  contents: {
    en: "Sample Push Message",
  },
};

const optionsBuilder = (method, path, body) => {
  return {
    method,
    url: `${BASE_URL}/${path}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${API_KEY}`,
    },
    body: body ? JSON.stringify(body) : null,
  };
};

const createNotication = async (data) => {
  const options = optionsBuilder("post", "notifications", data);
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);
   // return error;
  }
};



const viewNotifcation = async (notificationId) => {
  const path = `notifications/${notificationId}?app_id=${ONESIGNAL_APP_ID}`;
  const options = optionsBuilder("get", path);
  try {
    const response = await axios(options);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};


const foo = async () => {
   // const ah = await createNotication(body);
  //  await viewNotifcation(id);
  }

  foo();

