import React from "react";

const statusTag = (status) =>{
    const base = "text-xs px-2 py-1 rounded-full border"
    if(status === "sold") return  `${base} border-green-600 text-green-700`
    if(status === "approved") return  `${base} border-blue-600 text-blue-700`
    return `${base} bg-gray-100 text-gray-700 border-gray-200`

}
const EnquiriesUser = ({ items }) => {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return <p>No enquiries Found</p>;
  return (
    <>
      <div className="space-y-4">
        {list.map((f) => {
            const status = f.flat.status.toLowerCase();

            const owner = f.seller;
          return (
            <div key={f.id} className="border p-3 rounded">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{f.flat.title}</h3>
                <span className={statusTag(status)}>{status}</span>
              </div>

              {<p className="text-sm">{f.flat.address}</p>}
              {<p className="text-sm mt-1">Message: {f.message}</p>}
             
             {/* Owner */}
             
                <div className="text-sm text-gray-700 mt-1 space-y-1">
                  <p>
                    <span className="font-medium">Owner :</span>{" "}
                    {owner.name} ({owner.email})
                  </p>
                  <p>
                    <span className="font-medium">Phone :</span>{" "}
                    {owner.phoneNo} 
                  </p>
                  <p>
                    <span className="font-medium">Address :</span>{" "}
                    {owner.address} 
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-1">{new Date(f.created_at).toLocaleString()}</p>
            

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
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EnquiriesUser;
