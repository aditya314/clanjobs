const mixpanel = require('mixpanel-browser');
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
  ignore_dnt: true,
  debug: true,
});

export default mixpanel;
