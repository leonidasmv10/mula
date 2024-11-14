class OpenTriviaController {
  constructor() {}

  createUrl(category_id) {
    return `https://opentdb.com/api.php?amount=10&category=${category_id}&type=multiple`;
  }

  async getTrivia(category_id) {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const url = this.createUrl(category_id);
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (e) {
      console.error("Error: ", e);
      return 0;
    }
  }

  async get() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(this.url, options);
      const result = await response.json();
      return result;
    } catch (e) {
      console.error("Error al obtener datos:", e);
      return [];
    }
  }
}

export default OpenTriviaController;
