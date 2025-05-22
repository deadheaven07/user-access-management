import React, { useState } from "react";
import { createSoftware } from "../services/api";

export default function CreateSoftwarePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accessLevels, setAccessLevels] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckboxChange = (level: string) => {
    setAccessLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    const token = localStorage.getItem("token");
    await createSoftware(name, description, accessLevels, token!);
    setMessage("Software created successfully!");
    setName("");
    setDescription("");
    setAccessLevels([]);
  } catch (err) {
    setError("Failed to create software");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <h2>Create Software</h2>
            {loading && <p>Creating software...</p>}
{error && <p style={{ color: "red" }}>{error}</p>}
{message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Software Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />
        <label>
          Access Levels:
          <label><input type="checkbox" value="Read" checked={accessLevels.includes("Read")} onChange={() => handleCheckboxChange("Read")} /> Read</label>
          <label><input type="checkbox" value="Write" checked={accessLevels.includes("Write")} onChange={() => handleCheckboxChange("Write")} /> Write</label>
          <label><input type="checkbox" value="Admin" checked={accessLevels.includes("Admin")} onChange={() => handleCheckboxChange("Admin")} /> Admin</label>
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

