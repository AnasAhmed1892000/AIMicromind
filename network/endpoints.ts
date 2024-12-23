export const endPoints = {
  accounts: {
    login: "/api/v1/users/login",
    signup: "/api/v1/users/signup",
    // verify_otp: "/accounts/verify-otp",
    // forget_password: "/accounts/forgot-password",
    logout: "/api/v1/users/logout",
  },
  content: {
    createChat: "/api/v1/chats",
    getChats: "/api/v1/chats/my-chats/",
    deleteChat: "/api/v1/chats/",
    getChatMessages:
      "/api/v1/chats/676877403aae60efe4f85d05/messages/?limit=10&page=1",
  },
};
