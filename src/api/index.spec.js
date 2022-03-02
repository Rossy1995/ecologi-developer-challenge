import api from ".";

describe("api", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("should return result from api call", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ data: [["mockNumOfTree", "mockDate"]] })
    );

    const response = await api.getTreesPlantedData();

    expect(response).toEqual([
      { date: "mockDate", numOfTree: "mockNumOfTree" },
    ]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
