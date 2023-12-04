import axios from "axios";
import { IUserProps } from "../dtos/user.dto";

interface Pagination {
  page: number;
  totalPages: number;
}

export class BackendClient {
  private readonly baseUrl: string;

  constructor(baseUrl = "http://localhost:3001/v1") {
    this.baseUrl = baseUrl;
  }

  async getAllUsers(page: number): Promise<{ data: IUserProps[], pagination: Pagination }> {
    return (await axios.get(`${this.baseUrl}/people`, {
      params: {
        page
      }
    })).data.data;
  }
}
