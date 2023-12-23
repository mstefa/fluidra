import axios, { AxiosResponse } from "axios";

import { Nullable } from "../../shared/domain/Nullable";
import { Logger } from "../../shared/infrastructure/logger/Logger";
import { Book } from "../domain/Book";
import { BookExternalRepository } from "../domain/BookExternalRepository";

export class BookApiRepository implements BookExternalRepository {

  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  list(): Promise<Book[]> {

    throw new Error('Not implemented')

  }

  async search(id: string): Promise<Nullable<Book>> {
    Logger.info(`External ${id}`)

    const url = `${this.baseURL}/book/${id}`;
    Logger.info(this.baseURL)
    // const url = `http://localhost:4001/book/${id}`

    try {
      const response: AxiosResponse = await axios.get(url);

      if (response.status > 300) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      const data = response.data;

      if (data) {
        return new Book(data.id, data.title, data.author, data.year)
      }

      return response.data;

    } catch (error) {
      // Handle any errors that occurred during the request
      Logger.error(error);

      return null
    }
  }

}
