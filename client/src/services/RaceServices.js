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

export const GetRace = async (raceId) => {
  try {
    const res = await Client.get(`/api/races/single/${raceId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteRace = async (raceId) => {
  try {
    const res = await Client.delete(`/api/races/${raceId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateRace = async (raceId, data) => {
  try {
    const res = await Client.put(`/api/races/${raceId}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
