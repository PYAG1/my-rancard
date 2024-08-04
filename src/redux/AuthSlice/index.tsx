import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the slice state
interface AuthState {
  isSignout: boolean;
  userToken: string | null;
  user: any; // Replace 'any' with your actual user type
}

// Define the initial state
const initialState: AuthState = {
  isSignout: false,
  userToken: null,
  user: null,
};

// Create an authentication slice using Redux Toolkit
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Restore token and user data from storage
    restoreToken: (state, action: PayloadAction<{ access_token: string; name: any }>) => {
      if (action.payload && action.payload.access_token) {
        state.userToken = action.payload.access_token;
        state.user = action.payload.name; // Store the user data
      }
    },
    // Handle sign-in
    signIn: (state, action: PayloadAction<{ access_token: string; name: any }>) => {
      state.isSignout = false;
      state.userToken = action.payload.access_token;
      state.user = action.payload.name; // Store the user data
      localStorage.setItem("token", action.payload.access_token);
    },
    // Handle sign-out
    signOut: (state) => {
      state.userToken = null;
      state.user = null;
      state.isSignout = true;
      localStorage.removeItem("token")
    },
  },
});

// Export actions
export const { restoreToken, signIn, signOut } = authSlice.actions;

// Export selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: { user: any } }) => state.auth.user;

// Export reducer
export default authSlice.reducer;
