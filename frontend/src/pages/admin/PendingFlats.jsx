import React, { useEffect, useState } from "react";
import { approveFlat, getPendingFlats, rejectFlat } from "../../api/admin";

const PendingFlats = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [flatId, setFlatId] = useState(null);

  const loadingPendingFlats = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getPendingFlats();
      setResponse(data.flats);
    } catch (err) {
      setErr("Error fetching flats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadingPendingFlats();
  }, []);

  const onApprove = async (id) => {
    if (!window.confirm("Sure, Approve this flat?")) return;
    try {
      setFlatId(id);
      await approveFlat(id);
      await loadingPendingFlats();
    } catch (err) {
      alert("Failed to approved flats", err);
    } finally {
      setFlatId(null);
    }
  };

  const onReject = async (id) => {
    if (!window.confirm("Sure, Reject this flat?")) return;
    try {
      setFlatId(id);
      await rejectFlat(id);
      await loadingPendingFlats();
    } catch (err) {
      alert("Failed to reject flats", err);
    } finally {
      setFlatId(null);
    }
  };

  if (loading) return <p>Loading pending flats...</p>;
  if (err) return <p className="text-red-600">{err}</p>;
  if (!response.length) return <p>No Pending Flats.</p>;

  return (
    <>
      <h2 className="text-xl font-bold mb-3">Pending Flats</h2>
      <div className="space-y-4">
        {response.map((f) => {
          return (
            <div key={f.id} className="border p-3 rounded">
              {/* images */}

              {Array.isArray(f.images) && f.images.length ? (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {f.images.map((src, i) => (
                    <img
                      key={`${f.id}-${i}`}
                      src={src}
                      loading="lazy"
                      className="w-32 h-24 object-cover rounded border flex-shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-3 w-40 h-24 bg-gray-100 rounded grid place-items-center text-xs">
                  No image
                </div>
              )}

              <div className="flex-1 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{f.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full border bg-amber-100 text-amber-700 border-amber-200">{f.status}</span>
                </div>

                <p>{f.address}</p>
                <p>Price : (rupees) {f.price}</p>

                <div className="text-sm text-gray-700 mt-1 space-y-1">
                  <p>
                    <span className="font-medium">Owner :</span>{" "}
                    {f.owner.name} ({f.owner.email})
                  </p>
                  <p>
                    <span className="font-medium">Phone :</span>{" "}
                    {f.owner.phoneNo} 
                  </p>
                  <p>
                    <span className="font-medium">Address :</span>{" "}
                    {f.owner.address} 
                  </p>
                </div>
              </div>

              <div className="shrink-0 space-x-2">
                <button onClick={()=>onApprove(f.id)} className="px-3 py-1 border rounded cursor-pointer" disabled={flatId === f.id}>
                  {flatId === f.id ? "Working..." : "Approve"}
                </button>
                <button onClick={()=>onReject(f.id)} className="px-3 py-1 border rounded cursor-pointer" disabled={flatId === f.id}>
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PendingFlats;
