import { IChatFormData } from "@/types/data_types/Tcontent";
import { endPoints } from "../endpoints";
import axiosInstance from "..";
import { getToken } from "@/utils/helpers";

export const API_CreateChat = async (data: FormData) => {
  return await axiosInstance({
    url: endPoints.content.createChat,
    method: "POST",
    data,
    headers: {
      contentType: "multipart/form-data",
    },
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
    url: endPoints.content.getChats + id,
    method: "DELETE",
  });
};
export const API_GetChatMessages = async (id: string) => {
  return await axiosInstance({
    url: `/api/v1/chats/${id}/messages/?limit=10&page=1`,
    method: "GET",
  });
};
export const API_SendMessage = async (id: string, data: FormData) => {
  return await axiosInstance({
    url: `/api/v1/chats/${id}/messages/`,
    method: "POST",
    data,
  });
};
