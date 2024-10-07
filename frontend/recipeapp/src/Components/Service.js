export const fetchData = async (defaultQuery) => {
  const data = await fetch(
    `https://api.edamam.com/search?q=${defaultQuery}&app_id=${import.meta.env.VITE_EDAMAM_APP_ID}&app_key=${import.meta.env.VITE_EDAMAM_APP_KEY}`
  );
  const response = await data.json();
  return response;
};
