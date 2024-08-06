# Orbut



RanCard Front-End Developer Project
#### URL [Live site ](https://my-rancard.vercel.app/)


## Features

- Users can create a campaign and manage it through the user-friendly dashboard.
- Campaigns can be edited, viewed and deleted.
- Search functionality implemented to allow you to search for your campaigns.
- Advanced filtering of campaigns created



## Tech

Dillinger uses a number of open source projects to work properly:

- [React ] - HTML enhanced for web apps!
- [Typescript] 




## Installation



Install the dependencies and devDependencies and start the server.

```sh
cd my-rancard
npm i
npm run dev
```
This will start the development server and open the app in your default web browser at http://localhost:5173.

Create .env.local file and add your base url

```sh
VITE_BASE_URL="https://your-base-url/api"
```
## Redux
### Authentication Slice



Authentication Slice
This slice handles the authentication state for your application, including actions for restoring tokens, signing in, and signing out users.
#### State Shape
The AuthState interface defines the shape of the authentication state:

- isSignout: A boolean indicating whether the user is signed out.
- userToken: A string or null representing the user's token.
- user: The user's data (type can be replaced with your actual user type).
## Contributing
If you would like to contribute to this project, follow these steps:
1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature or bug fix:

#### Initial State
The initial state of the authentication slice is defined as follows:
```js
const initialState: AuthState = {
  isSignout: false,
  userToken: null,
  user: null,
};

```

#### Reducers
The slice includes three reducers to handle different authentication actions:

- restoreToken: Restores the token and user data from storage.
-  Handles user sign-in by setting the token and user data, and saving the token to localStorage.
-  signOut: Handles user sign-out by clearing the token and user data

```js
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreToken: (state, action: PayloadAction<{ access_token: string; name: any }>) => {
      if (action.payload && action.payload.access_token) {
        state.userToken = action.payload.access_token;
        state.user = action.payload.name;
      }
    },
    signIn: (state, action: PayloadAction<{ access_token: string; name: any }>) => {
      state.isSignout = false;
      state.userToken = action.payload.access_token;
      state.user = action.payload.name;
      localStorage.setItem("token", action.payload.access_token);
    },
    signOut: (state) => {
      state.userToken = null;
      state.user = null;
      state.isSignout = true;
    },
  },
});

```

#### Actions
The actions corresponding to the reducers are exported for use in your components:

```js
export const { restoreToken, signIn, signOut } = authSlice.actions;

```
#### Selectors
Selectors are provided to access specific parts of the authentication state:
```js 
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: { user: any } }) => state.auth.user;
```

#### Reducer
Finally, the reducer is exported as the default export of the module:
```js
export default authSlice.reducer;
```

## Redux Store Setup with Persistence
This section covers the setup of a Redux store using Redux Toolkit, with state persistence using redux-persist.

#### Store Configuration
The store configuration involves combining reducers, setting up persistence, and configuring middleware.

- Combine Reducers
Combine your individual slice reducers into a single root reducer. In this example, we have an auth reducer:
```js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";

const reducers = combineReducers({
  auth: authReducer,
});
```

- Persistence Configuration
Define a persistence configuration to specify the storage method and the parts of the state to persist:
```js
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Add other slices you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducers);
```
- Store Creation
Create the Redux store with the persisted reducer and configure middleware to handle non-serializable actions:
```js
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
```
- Persistor Setup
Create a persistor to manage the store's persistence:
```js
import { persistStore } from "redux-persist";

const persistor = persistStore(store);
```

- Setup Listeners
Enable listeners for the store dispatch:
```js
import { setupListeners } from "@reduxjs/toolkit/query";

setupListeners(store.dispatch);
```
## Usage Example
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { store } from './redux';
import { router } from './router';
import { ContextProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <RouterProvider router={router}/>
        <Toaster />
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
);
```
Wrapping app in Provider from react redux.
If context is also beimg used for state-management ensure it is defined within the react-redux provider.

### Usage for Sign in
To use reducers you must first declare useDispatch:
```js
  const dispatch = useDispatch()
```
#### Code Snippet from Signin Page
```js
    onSubmit: async (values,{resetForm}) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/signin`,
          values
        );
        if (response.status === 200) {
          const { name, access_token } = response.data.data;
    
          dispatch(signIn({name,access_token}))
          toast.success(response.data?.message);
          nav("/dashboard/campaign");
         
        }
      } catch (error) {
              //@ts-ignore
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
        resetForm()
      }
    }
```

## Contributing
If you would like to contribute to this project, follow these steps:
1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature or bug fix:

```
git checkout -b feature/your-feature-name
```
3. Make your changes and commit them:
```
git commit -am 'Add your commit message here'
```
4. Push to your forked repository:
```
git push origin feature/your-feature-name
```
5. Create a new pull request from your forked repository to the original repository














MIT


