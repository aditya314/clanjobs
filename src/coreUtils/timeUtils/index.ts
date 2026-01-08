// import { performance } from 'perf_hooks';
//
// export default function measureTime(fn) {
//   let startTime = performance.now();
//   fn();
//   console.log(performance.now() - startTime);
// }

export function getCurrentTimeEpoch(): number {
  return Math.round(Date.now() / 1000);
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const convertEpochToDateString = epoch => {
  if (epoch < 10000000000) epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
  let epochTimezoneAdjusted = epoch + new Date().getTimezoneOffset() * -1; //for timeZone
  //Sat Nov 06 2021 20:57:50 GMT+0530 (India Standard Time)
  return new Date(epochTimezoneAdjusted).toString();
};

export const extractDateFromDateString = (dateString: string) => {
  //Array ["Sat", "Nov", "06", "2021", "20:57:50", "GMT+0530", "(India", "Standard", "Time)"]
  let dateStringArray = dateString.split(' ');
  return dateStringArray[1] + ' ' + dateStringArray[2];
};
