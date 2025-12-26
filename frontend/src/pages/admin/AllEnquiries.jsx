import React, { useEffect, useState } from "react";
import { getAllEnquiries } from "../../api/admin";

const AllEnquiries = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadingAllEnquiries= async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getAllEnquiries();
      setResponse(data.enquiries);
    } catch (err) {
      setErr("Error fetching  all enquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadingAllEnquiries();
  }, []);
;

  if (loading) return <p>Loading enquiries...</p>;
  if (err) return <p className="text-red-600">{err}</p>;
  if (!response.length) return <p>No enquiries found.</p>;

  return (
    <>
      <h2 className="text-xl font-bold mb-3">All Enquiries</h2>
      <div className="space-y-4">
        {response.map((f) => {
          const buyer = f.buyer;
          const owner = f.seller;
          const status = f.flat.status;
          return (
            <div key={f.id} className="border p-3 rounded">
              {/* images */}
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{f.flat.title}</h3>
                  <span className={"text-xs px-2 py-1 rounded-full border" + (status === "sold" ? "text-xs px-2 py-1 rounded-full border border-green-600 text-green-700" : status === "approved" ? "text-xs px-2 py-1 rounded-full border border-blue-600 text-blue-700" : "bg-amber-100 text-amber-700 border-amber-200")}>{status}</span>
                </div>

                <p>{f.flat.address}</p>
                <p className="text-sm mt-1">Message :{f.message}</p>


              <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm">
                {/* Owner */}
                <div>
                  <p className="font-semibold mb-1">Owner :</p>
                  <p>
                    {owner.name} ({owner.email})
                  </p>
                  <p>Phone : {owner.phoneNo}</p>
                  <p>Address : {owner.address}</p>
                </div>
                {/* Buyer */}
                <div>
                  <p className="font-semibold mb-1">Enquiry From :</p>
                  <p>
                    {buyer.name} ({buyer.email})
                  </p>
                  <p>Phone : {buyer.phoneNo}</p>
                  <p>Address : {buyer.address}</p>
                </div>
              </div>

              {Array.isArray(f.flat.images) && f.flat.images.length ? (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {f.flat.images.map((src, i) => (
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

export default AllEnquiries;
