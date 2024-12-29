import { date } from "yup";

import { endPoints } from "../endpoints";
import axiosInstance from "..";
import { getToken } from "@/utils/helpers";

export const API_CreateChat = async (data: FormData) => {
  return await axiosInstance({
    url: endPoints.content.createChat,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};
export const API_GetChats = async () => {
  return await axiosInstance({
    url: endPoints.content.getChats,
    method: "GET",
  });
};
export const API_DeleteChat = async (id: string) => {
  return await axiosInstance({
    url: `/api/v1/chats/${id}`,
    method: "DELETE",
  });
};
export const API_GetChatMessages = async (id: string, page: number = 1) => {
  return await axiosInstance({
    url: `/api/v1/chats/${id}/messages/?limit=20&page=${page}`,
    method: "GET",
  });
};
export const API_SendMessage = async (id: string, data: FormData) => {
  return await axiosInstance({
    url: `/api/v1/chats/${id}/messages/`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};
export const API_GetMarketplace = async () => {
  return await axiosInstance({
    url: endPoints.content.getMarketplace,
    method: "GET",
  });
};
export const API_GetChatDetails = async (id: string) => {
  return await axiosInstance({
    url: `/api/v1/chats/${id}`,
    method: "GET",
  });
};
export const API_GetUserProfile = async () => {
  return await axiosInstance({
    url: endPoints.content.getProfile,
    method: "GET",
  });
};
export const API_UpdateProfile = async (data: FormData) => {
  return await axiosInstance({
    url: endPoints.content.updateProfile,
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};
