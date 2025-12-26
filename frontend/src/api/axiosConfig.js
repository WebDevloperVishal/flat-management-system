export const getConfig = () => {
  const token = localStorage.getItem("token"); 
  return {
    headers: {
      "auth-token": token,
    },
  };
};
