import { useState } from "react";

const UniqueManagement = () => {
  const [uniqueForm, updateUniqueForm] = useState({
    name: "",
    description: ""
  });

  const handleChange = (e) => {
    updateUniqueForm({ ...uniqueForm, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
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
        <input id="name" value={uniqueForm.name} type="text" />
      </div>
      <div>
        <label>Description</label>
        <input id="description" value={uniqueForm.description} type="text" />
      </div>
      <div>
        <button>Create</button>
      </div>
    </div>
  );
  return toRender;
};
export default UniqueManagement;
