class MulaController {
  constructor(path = "") {
    this.url = `${import.meta.env.VITE_MULA_API_URL}/${path}`;
  }

  async createData(data) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(this.url, options);
      const result = await response.json();
      return result.id;
    } catch (e) {
      console.error("Error: ", e);
      return 0;
    }
  }

  async get() {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(this.url, options);
      const result = await response.json();
      return result;
    } catch (e) {
      console.error("Error al obtener datos:", e);
      return [];
    }
  }
}

export default MulaController;
