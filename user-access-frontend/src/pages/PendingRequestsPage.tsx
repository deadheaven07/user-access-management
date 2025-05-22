import React, { useEffect, useState } from "react";
import { fetchAllRequests, updateRequestStatus } from "../services/api";

type RequestItem = {
  id: number;
  user: { username: string };
  software: { name: string };
  accessType: string;
  reason: string;
  status: string;
};

export default function PendingRequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchAllRequests(token!)
      .then(data => setRequests(data.filter((r: RequestItem) => r.status === "Pending")))
      .catch(() => setError("Failed to fetch requests"))
      .finally(() => setLoading(false));
  }, []);

  const handleAction = async (id: number, status: "Approved" | "Rejected") => {
    const token = localStorage.getItem("token");
    await updateRequestStatus(id, status, token!);
    setRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status } : req)
    );
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      {loading && <p>Loading requests...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {requests.map((req: any) => (
        <div key={req.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><b>User:</b> {req.user.username}</p>
          <p><b>Software:</b> {req.software.name}</p>
          <p><b>Access Type:</b> {req.accessType}</p>
          <p><b>Reason:</b> {req.reason}</p>
          <p><b>Status:</b> {req.status}</p>
          {req.status === "Pending" && (
            <>
              <button onClick={() => handleAction(req.id, "Approved")}>Approve</button>
              <button onClick={() => handleAction(req.id, "Rejected")}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
