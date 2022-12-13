import Client from "./api";

export const CreateUnique = async (data) => {
  try {
    const res = await Client.post("/api/unqiues", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
