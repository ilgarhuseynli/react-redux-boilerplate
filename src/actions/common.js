import {config} from "@config/config";
import {getCurrentTime} from "@lib";
import AxiosClient from "../library/AxiosClient";
import {API_ROUTES} from "@config/routes";

const getFromStorage = async (key, url, expire_time, params) => {
  let response = JSON.parse(window.localStorage.getItem(key) || false);
  if (response) {
    if (response.status === "success") {

      if (response.create_time < getCurrentTime() - expire_time * 60) {
        return await getFromAPI(key, url, params);
      }
      return response;
    } else {
      return await getFromAPI(key, url, params);
    }
  }
  return await getFromAPI(key, url, params);
};

const getFromAPI = async (key, url, params) => {
  let response = await AxiosClient.get(url, params).catch(err => err.response)
  if (response.status === "success") {

    response.create_time = getCurrentTime();
    window.localStorage.removeItem(key);
    window.localStorage.setItem(key, JSON.stringify(response));
  }
  return response;
};

export const settings = async (params) => {
  return await getFromStorage(
      `settings-${config.appID}`,
      API_ROUTES.settings,
      2,
      params
  );
};

export const translations = async (params) => {
  return await getFromStorage(
      `translations-${config.appID}`,
      API_ROUTES.translations,
      60,
      params
  );
};
