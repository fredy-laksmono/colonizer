import Client from "./api";

export const CreateUnique = async (data) => {
  try {
    const res = await Client.post("/api/uniques", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const GetUniques = async () => {
  try {
    const res = await Client.get("/api/uniques");
    return res.data;
  } catch (error) {
    throw error;
  }
};
