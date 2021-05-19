import axios, { AxiosPromise } from "axios";
import { User } from "./types";

export const getUsers = (): AxiosPromise<{ results: User[] }> =>
  axios.request({
    url: "https://randomuser.me/api?inc=name,email,id,picture",
    method: "GET",
    params: {
      results: 10
    }
  });

/**
 * The below is an example payload from the randomuser API
 * {
  "results": [
    {
      "name": {
        "title": "Mr",
        "first": "Dejan",
        "last": "Hofhuis"
      },
      "email": "dejan.hofhuis@example.com",
      "id": {
        "name": "BSN",
        "value": "42996412"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/23.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/23.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/23.jpg"
      }
    }
  ],
  "info": {
    "seed": "1658a561e5d1fb6b",
    "results": 1,
    "page": 1,
    "version": "1.3"
  }
}
 */
