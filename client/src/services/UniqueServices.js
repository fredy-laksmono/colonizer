import Client from "./api";

export const CreateUnique = async (data) => {
  try {
    const res = await Client.post("/api/uniques", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
