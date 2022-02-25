const api = {
  getTreesPlantedData: async () => {
    return await fetch(`https://x.api.ecologi.com/trees`)
      .then((response) => response.json())
      .then((data) => {
        const mappedData = data.data.map((trees) => ({
          numOfTree: trees[0],
          date: trees[1],
        }));
        console.log(mappedData);
        return mappedData;
      });
  },
};

export default api;
