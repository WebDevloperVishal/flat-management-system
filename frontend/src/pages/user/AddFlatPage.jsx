import React, { useState } from "react";
import { createFlat } from "../../api/user.js";
import { useNavigate } from "react-router-dom";

const MAX_FILES = 5;
const MAX_MB = 5;
const AddFlatPage = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    address: "",
    price: "",
    description: "",
    amenities: "",
  });

  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onFiles = (e) =>{
    setErr(null);
    const chosen = Array.from(e.target.files || []);
    const next = [];
    for(const f of chosen){
        if(files.length + next.length >= MAX_FILES) break;
        if(f.size > MAX_MB * 1024 *1024){
            setErr(`"${f.name}" is larger than ${MAX_MB} MB`);
            continue;
        }
        next.push(f);
    }
    setFiles((prev)=>[...prev,...next]);
    e.target.value = "";
  }

  const removeFile = (i) => 
    setFiles((arr)=>arr.filter((_,idx)=>idx!==i));

  const onSubmit = async (e) =>{
    e.preventDefault();
    setErr(null);

    if(!files.length){
        setErr("Please upload at least one image");
        return;
    }

    try {
        setSaving(true);

        const fd = new FormData();
        fd.append("title",form.title.trim());
        fd.append("address",form.address.trim());
        fd.append("price",form.price.trim());
        fd.append("description",form.description.trim());

        const amenities = form.amenities
        .split(",")
        .map((s)=> s.trim())
        .filter(Boolean);

        fd.append("amenities",JSON.stringify(amenities));

        files.forEach((file)=>fd.append("images",file));

        await createFlat(fd);
        alert("Flat Submitted ! Awaited approval");
        navigate("/user-dash/myflats");

    } catch (error) {
        setErr(error.message || "Failed to create flat")
    }
    finally{
        setSaving(false);
    }
  }
  return (
    <>
      <div className="max-w-xl">
        <h2 className="text-xl font-bold mb-3">Add Flat</h2>

        {err && <p className="text-red-600 mb-2">{err}</p>}

        <form className="space-y-3" onSubmit={onSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="address"
             value={form.address}
            onChange={onChange}
            placeholder="Address"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="price"
             value={form.price}
            onChange={onChange}
            placeholder="Price"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="description"
             value={form.description}
            onChange={onChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="amenities"
             value={form.amenities}
            onChange={onChange}
            placeholder="Amenities"
            className="w-full border p-2 rounded"
            required
          />

          <div>
            <label className="block mb-1 font-medium">Images</label>
            <input type="file" accept="image/*" onChange={onFiles} />
            <p className="text-xs text-gray-500 mt-1">Up to {MAX_FILES} files, {MAX_MB} MB each</p>

            {files.length>0 &&(
                <ul className="mt-2 text-sm">
                    {files.map((f,i)=>(
                        <li key={`${f.name}-${i}`} className="flex items-center gap-2">
                            <span>{f.name}</span>
                            <button type="button" className="text-xs border px-2 rounded" onClick={()=>removeFile(i)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
          </div>

          <button disabled={saving} className="border px-3 py-1 rounded cursor-pointer">
            {saving ? "Saving..." :"Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddFlatPage;
