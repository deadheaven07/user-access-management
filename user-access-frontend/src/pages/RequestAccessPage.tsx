import React, { useEffect, useState } from "react";
import { fetchSoftwareList, submitRequest } from "../services/api";

export default function RequestAccessPage() {
  const [softwareList, setSoftwareList] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState("");
  const [accessType, setAccessType] = useState("Read");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  setLoading(true);
  fetchSoftwareList()
    .then(setSoftwareList)
    .catch(() => setError("Failed to load software list"))
    .finally(() => setLoading(false));
}, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await submitRequest(
        Number(selectedSoftware),
        accessType,
        reason,
        token!
      );
      setMessage("Request submitted!");
    } catch (err) {
      setMessage("Failed to submit request");
    }
  };

  return (
    <div>
      <h2>Request Access Page</h2>
        {/* Showing loading and error */}
    {loading && <p>Loading software list...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}
    {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Software:
          <select
            value={selectedSoftware}
            onChange={(e) => setSelectedSoftware(e.target.value)}
          >
            <option value="">Select</option>
            {softwareList.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Access Type:
          <select
            value={accessType}
            onChange={(e) => setAccessType(e.target.value)}
          >
            <option value="Read">Read</option>
            <option value="Write">Write</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <br />
        <label>
          Reason:
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

