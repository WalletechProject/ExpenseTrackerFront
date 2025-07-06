import api from "./api";

export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
