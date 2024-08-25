import axios from "axios";
import { siloamHospitalsApi } from "@/lib/url-config";
import { GET_POPUP_STATE, SET_POPUP_STATE, SET_SWAL_OPTION } from "./response-handling";
import Swal from 'sweetalert2';

const axiosIntance = axios.create({
  baseURL: siloamHospitalsApi,
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosIntance.interceptors.response.use((response) => response, (error) => {
  if (axios.isCancel(error)) {
    throw error;
  }

  if(!error.response) {
    if(!GET_POPUP_STATE()) {
      SET_POPUP_STATE(true)
      
      Swal.fire(SET_SWAL_OPTION({status: 'ERROR'}))
      .then((result) => {
        if(result.isConfirmed) {
          SET_POPUP_STATE(false)
        }
      });
    }
  } else {
    // whatever you want to do with the error
    if(!GET_POPUP_STATE()) {
      SET_POPUP_STATE(true);
      let error_status = error.response.status
      let error_message = error?.response?.data?.message ? error.response.data.message : ""
    
      Swal.fire(SET_SWAL_OPTION({status: error_status, message: error_message}))
      .then((result) => {
        if(result.isConfirmed) {
          SET_POPUP_STATE(false)
        }
      });
    }
  }
  throw error;
});

axiosIntance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
  };
  return config;
});

export default axiosIntance;
