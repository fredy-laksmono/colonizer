import Client from "./api";

export const CreateRace = async (data) => {
  try {
    const res = await Client.post("/api/races", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GetUserRaces = async (userId) => {
  try {
    const res = await Client.get(`/api/races/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
