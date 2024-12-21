import {
  ILoginData,
  IRegisterData,
  ISendOtpData,
  IUpdatePasswordData,
  IVerifyOtpData,
  IConfirmInfoData,
} from "@/types/data_types/TAuth";
import axiosInstance from "..";
import { endPoints } from "../endpoints";

export const API_Login = async (data: ILoginData) => {
  return await axiosInstance({
    url: endPoints.accounts.login,
    method: "POST",
    data,
  });
};

export const API_Register = async (data: IRegisterData) => {
  return await axiosInstance({
    url: endPoints.accounts.signup,
    method: "POST",
    data,
  });
};

// export const API_SendOtpRegister = async (data: ISendOtpData) => {
//   return await axiosInstance({
//     url: endPoints.accounts.send_otp,
//     method: "POST",
//     data: data,
//   });
// };
// export const API_VerifyOtp = async (data: IVerifyOtpData) => {
//   return await axiosInstance({
//     url: endPoints.accounts.verify_otp,
//     method: "POST",
//     data: data,
//   });
// };
// export const API_UpdatePassword = async (data: IUpdatePasswordData) => {
//   return await axiosInstance({
//     url: endPoints.accounts.forget_password,
//     method: "POST",
//     data: data,
//   });
// };

// export const API_CheckAccountStep = async (mobile_number: string) => {
//   return await axiosInstance({
//     url: endPoints.accounts.check_request_limit,
//     method: "POST",
//     data: {
//       mobile_number,
//     },
//   });
// };

// export const API_VerifyID = async (data: FormData) => {
//   return await axiosInstance({
//     url: endPoints.accounts.verify_identity,
//     method: "POST",
//     data,
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export const API_Logout = async (data: IConfirmInfoData) => {
//   return await axiosInstance({
//     url: endPoints.accounts.logout,
//     method: "POST",
//     data,
//   });
// };
// export const API_ConfirmInfo = async (data: IConfirmInfoData) => {
//   return await axiosInstance({
//     url: endPoints.accounts.confirm_info,
//     method: "POST",
//     data,
//   });
// };

// export const API_SendCompanyInfo = async (data: FormData) => {
//   return await axiosInstance({
//     url: endPoints.accounts.company_info,
//     method: "POST",
//     data,
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };
