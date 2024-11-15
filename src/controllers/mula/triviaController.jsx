import { getToken } from "../../services/auth";
import MulaController from "./mulaController";

class TriviaController extends MulaController {
  constructor() {
    super("trivia");
  }

  async create_game_result(data) {
    try {
      const token_header = "Bearer " + getToken();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token_header,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(this.url + "/games", options);
      const result = await response.json();
      return result.id;
    } catch (e) {
      console.error("Error: ", e);
      return 0;
    }
  }

  async get_questions(category_id) {
    try {
      const token_header = "Bearer " + getToken();
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: token_header,
        },
      };
      const response = await fetch(
        this.url + "/questions/" + category_id,
        options
      );
      const result = await response.json();
      return result;
    } catch (e) {
      console.error("Error:", e);
      return [];
    }
  }

  async get_ranking(category_id) {
    try {
      const token_header = "Bearer " + getToken();
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: token_header,
        },
      };
      const response = await fetch(
        this.url + "/category/" + category_id + "/ranking",
        options
      );
      const result = await response.json();
      return result;
    } catch (e) {
      console.error("Error:", e);
      return [];
    }
  }

  async get_global_ranking() {
    try {
      const token_header = "Bearer " + getToken();
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: token_header,
        },
      };
      const response = await fetch(this.url + "/global-ranking", options);
      const result = await response.json();
      return result;
    } catch (e) {
      console.error("Error:", e);
      return [];
    }
  }

  async get_user_category_stats(user_id) {
    try {
      const token_header = "Bearer " + getToken();
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: token_header,
        },
      };
      const response = await fetch(
        this.url + "/user/" + user_id + "/category-stats",
        options
      );
      const result = await response.json();
      return result;
    } catch (e) {
      console.error("Error:", e);
      return [];
    }
  }

  async get_user_stats(user_id) {
    try {
      const token_header = "Bearer " + getToken();
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: token_header,
        },
      };
      const response = await fetch(this.url + "/userStats/" + user_id, options);
      const result = await response.json();
      return result;
    } catch (e) {
      console.error("Error:", e);
      return [];
    }
  }
}

export default TriviaController;
