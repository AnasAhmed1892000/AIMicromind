export interface IRegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginData {
  email: string;
  password: string;
}
export interface ISendOtpData {
  mobile_number: string;
  otp_type: string;
}
export interface IVerifyOtpData {
  mobile_number: string;
  otp: string;
  otp_type: string;
}
export interface IUpdatePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface IConfirmInfoData {
  work_address: string;
  current_governorate_id: number;
  current_city_id: number;
}
