import React, { useEffect, useState } from "react";
import MyFlatList from "../../components/MyFlatList";
import { getMyFlats } from "../../api/user";

const MyFlatsPage = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const loadAllUserFlats = async () => {
    setErr(null);
    setLoading(true);
    try {
      const { data } = await getMyFlats();
      setFlats(data.flats);
      console.log(data)
    } catch (err) {
      setErr("Failed to fetch your flats", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadAllUserFlats();
  }, []);

  if (loading) return <p>Loading your flats...</p>;
  if (err) return <p className="text-red-600">{err}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">My Flats</h2>
      <MyFlatList flats={flats} />
    </div>
  );
};

export default MyFlatsPage;
