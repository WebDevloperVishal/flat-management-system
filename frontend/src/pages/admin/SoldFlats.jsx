import React, { useEffect, useState } from "react";
import { getSoldFlats } from "../../api/admin";

const SoldFlats = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadingSoldFlats = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getSoldFlats();
      setResponse(data.flat);
    } catch (err) {
      setErr("Error fetching  Sold flats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadingSoldFlats();
  }, []);
;

  if (loading) return <p>Loading sold flats...</p>;
  if (err) return <p className="text-red-600">{err}</p>;
  if (!response.length) return <p>No Sold Flats.</p>;

  return (
    <>
      <h2 className="text-xl font-bold mb-3">Sold Flats</h2>
      <div className="space-y-4">
        {response.map((f) => {
          const buyer = f.soldTo;
          return (
            <div key={f.id} className="border p-3 rounded">
              {/* images */}
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{f.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full border bg-amber-100 text-amber-700 border-amber-200">{f.status}</span>
                </div>

                <p>{f.address}</p>
                <p>Price : (rupees) {f.price}</p>

                <div className="text-sm text-gray-700 space-y-1 mt-1">
                  <p>
                    <span className="font-medium">Sold on :</span>{" "}
                    {new Date(f.sold_date).toLocaleString()}
                  </p>
                </div>

              <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm">
                {/* Owner */}
                <div>
                  <p className="font-semibold mb-1">Owner :</p>
                  <p>
                    {f.owner.name} ({f.owner.email})
                  </p>
                  <p>Phone : {f.owner.phoneNo}</p>
                  <p>Address : {f.owner.address}</p>
                </div>
                {/* Buyer */}
                <div>
                  <p className="font-semibold mb-1">Buyer :</p>
                  <p>
                    {buyer.name} ({buyer.email})
                  </p>
                  <p>Phone : {buyer.phoneNo}</p>
                  <p>Address : {buyer.address}</p>
                </div>
              </div>

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

            </div>
          );
        })}
      </div>
    </>
  );
};

export default SoldFlats;
