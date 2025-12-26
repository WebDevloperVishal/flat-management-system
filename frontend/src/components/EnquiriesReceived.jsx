import React from "react";

const statusTag = (status) =>{
    const base = "text-xs px-2 py-1 rounded-full border"
    if(status === "sold") return  `${base} border-green-600 text-green-700`
    if(status === "approved") return  `${base} border-blue-600 text-blue-700`
    return `${base} bg-gray-100 text-gray-700 border-gray-200`

}
const EnquiriesReceived = ({ items = [], onSold, flatId }) => {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return <p>No enquiries Found</p>;
  return (
    <>
      <div className="space-y-4 mt-3">
        {list.map((f) => {
            const status = f.flat.status.toLowerCase();

          return (
            <div key={f.id} className="border p-3 rounded">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{f.flat.title}</h3>
                <span className={statusTag(status)}>{status}</span>
              </div>

              {<p className="text-sm">{f.flat.address}</p>}
              {<p className="text-sm mt-1">Message: {f.message}</p>}
             
             {/* Buyer */}
             
                <div className="text-sm text-gray-700 mt-1 space-y-1">
                  <p>
                    <span className="font-medium">Enquiry From :</span>{" "}
                    {f.buyer.name} ({f.buyer.email})
                  </p>
                  <p>
                    <span className="font-medium">Phone :</span>{" "}
                    {f.buyer.phoneNo} 
                  </p>
                  <p>
                    <span className="font-medium">Address :</span>{" "}
                    {f.buyer.address} 
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-1">{new Date(f.created_at).toLocaleString()}</p>
            

              {/* images */}

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

              {
                typeof onSold === "function" && (
                  <div className="shrink-0 mt-3">
                    <button className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer disabled:opacity-50"
                    onClick={()=>onSold(f)}
                    disabled={flatId === f.id}
                    title="Sell to this buyer">
                      {flatId === f.id ? "Working..." : "Sold"}
                    </button>
                  </div>
                )
              }
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EnquiriesReceived;
