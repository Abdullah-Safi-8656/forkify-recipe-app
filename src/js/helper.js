import { TIMER_SEC } from "./config.js";

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const GetJson = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMER_SEC)]);
    const data = await response.json();

    if (!response.ok)
      throw new Error(`something went wrong please try again later`);

    return data;
  } catch (err) {
    throw err;
  }
};
