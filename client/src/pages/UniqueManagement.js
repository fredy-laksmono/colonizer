import { useState } from "react";
import { CreateUnique } from "../services/UniqueServices";

const UniqueManagement = () => {
  const [uniqueForm, updateUniqueForm] = useState({
    name: "",
    description: ""
  });

  const handleChange = (e) => {
    updateUniqueForm({ ...uniqueForm, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    await CreateUnique(uniqueForm);
    updateUniqueForm({
      name: "",
      description: ""
    });
  };

  let toRender = (
    <div>
      <div>Unique Management</div>
      <div>
        <label>Name</label>
        <input
          onChange={handleChange}
          id="name"
          value={uniqueForm.name}
          type="text"
        />
      </div>
      <div>
        <label>Description</label>
        <input
          onChange={handleChange}
          id="description"
          value={uniqueForm.description}
          type="text"
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
  return toRender;
};
export default UniqueManagement;
