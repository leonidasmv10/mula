import { getToken } from "../../services/auth";
import MulaController from "./mulaController";

class UsersController extends MulaController {
  constructor() {
    super("users");
  }
  async getById(id) {
    try {
      const token_header = "Bearer " + getToken();
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: token_header,
        },
      };
      const response = await fetch(this.url + "/" + id, options);
      const result = await response.json();
      return result;
    } catch (e) {
      console.error("Error:", e);
      return [];
    }
  }
}

export default UsersController;
