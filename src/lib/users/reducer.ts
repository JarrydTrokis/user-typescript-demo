import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";
import { parseUser } from "./parser";
import { getUsers } from "./endpoints";

const initialState: User[] = [
  {
    name: {
      title: "Mr",
      first: "Dejan",
      last: "Hofhuis"
    },
    email: "dejan.hofhuis@example.com",
    id: {
      name: "BSN",
      value: "42996412"
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/23.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/23.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/23.jpg"
    }
  }
];

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  // Declare the type your function argument here:
  async () => {
    try {
      const response = await getUsers();
      // Our Axios Promise is typed, but we can't guarantee
      // that we'll get the resposne we want.
      const data = response.data.results;
      // So we parse the data - to make sure that we have sane data
      // in the application.
      if (!parseUser(data)) {
        throw new Error("could not parse API response");
      }
      return data;
    } catch (e) {
      // We could do more here — like showing the user
      // a delightful error. But for the purposes of this demo,
      // we'll just return an empty array.
      return [];
    }
  }
);

const { actions, reducer } = createSlice({
  initialState,
  name: "users",
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled.toString()]: (state, action) => {
      return [...state, ...action.payload];
    }
  }
});

export { reducer as userReducer, actions as userActions };
