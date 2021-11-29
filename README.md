# Let's Build a peer-to-peer Todo App

Hello Friend! Today we'll be going through the steps to build a fully peer-to-peer Todo app using the decentralized database library called 'gun'.

The first step is to initialize the project by using the following command.

`expo init projectName`

Selecting blank project option since we want to build everything from the ground up. After its completed go to the project folder.

![image-20211127000605678](/screenshots/1.png)

We'll try to modularize our project and make it simple as possible. So we'll create two screens the first is the authentication screen and the other is going to be the home screen after authentication.

![Screen Shot 2021-11-24 at 3.28.12 AM](/screenshots/3.png)

So our two screens will be just mockups for now.

Auth.js

```javascript
import React from 'react'
import { Text } from 'react-native'

export default function Auth () {
  return <Text>Authentication Page</Text>
}
```

Home.js

```javascript
import React from 'react'
import { Text } from 'react-native'

export default function Home () {
  return <Text>Welcome user!</Text>
}
```

We'll also update our `App.js` to show only the authentication page for now. And start from building the Login and Registration Page.

App.js

```javascript
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'

import Auth from './src/screens/Auth'

export default function App () {
  return (
    <SafeAreaView style={styles.container}>
      <Auth />
      <StatusBar style='light' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
```

Let's start with the authentication screen and build a simple screen that we'll use for signing up and logging in.

As I've said before I'm going to make this a bit longer by creating components which is going to help us a lot for building the app and I feel like structuring the project is better than having a messed up project.

So we'll start by creating our own custom Text component, Input componet as well as Button component. These components are simple and yet customizable we're going to use them through out our app.

#### Typo component (`./src/components/Button.js`)

```javascript
import React from 'react'
import { StyleSheet, Text } from 'react-native'
export const Typo = props => {
  const sizes = { xs: 14, sm: 18, md: 20, lg: 24, xl: 36, xxl: 48 }
  return (
    <Text
      {...props}
      style={{
        color: props.color || '#fff',
        fontSize: sizes[props.size] || 18,
        fontWeight: props.weight || 'normal'
      }}
    >
      {props.children}
    </Text>
  )
}
```

#### Button component (`./src/components/Button.js`)

```javascript
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Typo } from './Typo'
export const FilledButton = props => {
  return (
    <TouchableOpacity {...props} style={styles.filledButton}>
      <Typo size='md'>{props.children}</Typo>
    </TouchableOpacity>
  )
}
export const TextButton = props => {
  return (
    <TouchableOpacity {...props} style={styles.textButton}>
      <Typo size='md' weight='bold'>
        {props.children}
      </Typo>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  filledButton: {
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#77A8F1'
  },

  textButton: {
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
```

#### Input Component( `./src/components/Input.js`)

```javascript
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
export const Input = props => {
  return (
    <TextInput
      {...props}
      style={styles.inputText}
      placeholderTextColor='#505050'
    />
  )
}

const styles = StyleSheet.create({
  inputText: {
    margin: 20,
    width: '80%',
    height: 48,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 14,
    backgroundColor: '#1f1f1f'
  }
})
```

Finally let's abstract the text component to make it similar through out the application.

Here is `Typo.js` which will be located in the components folder.After creating our components lets finish writing our Authentication Screen.

This will contain a login and register tabs in order to implement this we'll have a state to control the view.

So simply our `Auth.js` will have a reactive state

`const [hasAccount, setAccount] = useState(false);`

and we'll return the components accordingly

`return hasAccount ? Login() : Register();`

So the full Auth.js will look something like this.

(We're going to use dark mode so update `App.js` backgroundColor: "#121212", and also change the `StatusBar` component style from 'auto' to 'light'before you update `Auth.js`)

```javascript
import React, { useState } from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  View,
  Platform
} from 'react-native'
import { FilledButton, TextButton } from '../components/Button'
import { Input } from '../components/Input'

export default function Auth () {
  const [hasAccount, setAccount] = useState(false)
  const [username, setUsername] = useState('')
  const [key, setKey] = useState('')
  const toggleState = () => {
    setAccount(!hasAccount)
  }

  const Login = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View>
          <Text style={styles.headerTitle}>Jot</Text>
        </View>
        <Input value={key} onChangeText={setKey} placeholder='Enter your key' />
        <FilledButton>Login</FilledButton>
        <TextButton onPress={toggleState}>Create One</TextButton>
      </KeyboardAvoidingView>
    )
  }
  const Register = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View>
          <Text style={styles.headerTitle}>Jot</Text>
        </View>
        <Input
          value={username}
          onChangeText={setUsername}
          placeholder='Username'
        />
        <FilledButton>Register</FilledButton>
        <TextButton onPress={toggleState}>I already have an account</TextButton>
      </KeyboardAvoidingView>
    )
  }
  return hasAccount ? Login() : Register()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold'
  }
})
```

Now we need to have the view reuse states from its parent. Children components can use a thing called "Context" in order to update it or access data from it .

Here is how we'll setup Context, Provider and Reducer which will help us manage state throughout the application. First we'll create two contexts one(`AuthContext`) this is used to store the user data such as user's name, private key and authentication states like error and loding and the other(`AuthDispatchContext`) to help us manage the state by manuplating the context.

We'll create a new file in a new folder which is called(`contexts`) and we'll call the file context.js.

`src/contexts/context.js`

```javascript
import React, { createContext, useContext, useReducer } from 'react'

export const AuthContext = createContext()
export const AuthDispatchContext = createContext()
```

Next we'll create custom hooks that will help us read values from these contexts since we want to a simple function to call instead of calling useContext in every component that needs to access it. In the same file write the following hook.

```javascript
export function useAuth () {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export function useAuthDispatch () {
  const context = useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider')
  }

  return context
}
```

A context also needs a provider in order to provide the context for any child component no matter how deep or nested they are. Finally in the same file we'll add the following Context Provider Component which will be a provider to any component using the context.

```javascript
export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState)

  return (
    <AuthContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}
```

Here we havent created a reducer yet. useReducer privides us with state management system to update the context from the consumer components.

`src/contexts/reducer.js`

First of all we'll start by creating the inital state which will contain an object:

- profile: Username
- key: Private Key
- loading: State of loading
- errorMessage: Error Message.

```javascript
export const initialState = {
  profile: '',
  key: '',
  loading: false,
  errorMessage: null
}
```

After that we'll create the `AuthReducer` by which we'll import both initialState and AuthReducer it in `src/contexts/context.js` since we've used it in the Provider

```javascript
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      return {
        ...initialState,
        username: action.payload.username,
        key: action.payload.key,
        loading: true
      }
    case 'AUTH_SUCCESS':
      return {
        ...initialState,
        loading: false
      }
    case 'AUTH_LOGOUT':
      return {
        ...initialState,
        username: '',
        key: ''
      }

    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
```

After creating reducer.js update context.js to import the following after the React import

```javascript
import { initialState, AuthReducer } from './reducer'
```

For the contexts folder we'll create `actions.js` these will be functions that will mutate the context by dispatching data from the components. For now we'll simply log the results.

`actions.js`

```javascript
export async function authUser (dispatch, payload) {
  console.log('dispatch', dispatch)
  console.log('payload', payload)
}
export async function createUser (dispatch, payload) {
  console.log('dispatch', dispatch)
  console.log('payload', payload)
}

export async function logoutUser (dispatch) {
  console.log('dispatch', dispatch)
}
```

Finally for cleaner imports we'll add one more file named `index.js`

`index.js`

```javascript
import { authUser, createUser, logoutUser } from './action'
import { AuthProvider, useAuthDispatch, useAuth } from './context'

export {
  AuthProvider,
  useAuth,
  useAuthDispatch,
  authUser,
  createUser,
  logoutUser
}
```

## Next let's use the context in our application.

In `App.js` we'll remove Auth Component and we'll create a new component to guard authentication and switch between `Auth` Screen and `Home` Screen. We'll add more functionality to this component for accessing `AsyncStorage` and persist the key for automatic login in the future.

Replace all of App.js with the one below.

```javascript
import 'react-native-get-random-values'
import PolyfillCrypto from 'react-native-webview-crypto'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Main from './src/screens/Main'
import { AuthProvider } from './src/contexts'
export default function App () {
  return (
    <SafeAreaView style={styles.container}>
      <PolyfillCrypto />
      <AuthProvider>
        <Main />
        <StatusBar style='light' />
      </AuthProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
```

In `src/screens/Main.js` We'll create a component to check if a key exists in the auth context which we can easily access by using `useAuth` function.

So `Main.js` will look like this.

```javascript
import React from 'react'
import Home from './Home'
import Auth from './Auth'
import { useAuth } from '../contexts'
export default function Main () {
  const user = useAuth()
  return !user.key ? <Auth /> : <Home />
}
```

Now, In the `Auth.js` we need to update the Login and Register Button to use the actions and dispatch a payload to the context.

We should import the following functions from the src/context/

```javascript
import { useAuthDispatch, authUser, createUser } from '../contexts'
```

First we'll get the dispatch function from useAuthDispatch. Before the toggleState and after the useState line add this dispatch line.

```javascript
// ...const [hasAccount, setAccount] = useState(false);
// ...const [username, setUsername] = useState("");
// ...const [key, setKey] = useState("");
const dispatch = useAuthDispatch()
// ...const toggleState = () => {
```

After that we'll add actions to the buttons. In this app we're going to have the user to login with a private key but you could modify it to login with a traditional username and password.

```javascript
// const Login = () => {
// [...]
<Filled onPress={() => authUser(dispatch, { key: key })}>
  Login
</Filled>


// const Register = () => {
// [...]
<Filled
  onPress={() =>
  createUser(dispatch, { username: username })
    }>
    Register
</Filled>
```

## Lets install gun and other libraries to make it work on React-Native.

Install the following in your package.json to install all the required dependencies for gun to work natively on react native/expo

```bash
$ yarn add gun buffer text-encoding react-native-webview react-native-webview-crypto react-native-get-random-values
```

Unfortunatly sea doesn't work out of the box on react native / expo so we can go to node_modules and change the SEA.

Insert the following lines on top of `App.js`

```javascript
import 'react-native-get-random-values'
import WebviewCrypto from 'react-native-webview-crypto'
```

Then insert <WebviewCrypto/> inside the view component. This is used to polyfill crypto module.

Hopefully this is not neccessary, but if you're having issues with `react-native-webview-crypto` giving the following error.

```javascript
node_modules/webview-crypto/src/MainWorker.ts: /Users/[...]/[...]/[...]/node_modules/webview-crypto/src/MainWorker.ts: `import serializeError = require('serialize-error')` is not supported by @babel/plugin-transform-typescript
Please consider using `import serializeError from 'serialize-error';` alongside Typescript's --allowSyntheticDefaultImports option.
> 1 | import serializeError = require("serialize-error");
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  2 |
  3 | import {parse, stringify, ArrayBufferViewWithPromise} from "./serializeBinary";

```

Then open `./node_modules/webview-crypto/src/MainWorker.ts` then replace `import serializeError = require("serialize-error");` with `import serializeError from "serialize-error";`

After that `./node_modules/webview-crypto/src/asyncSerialize.ts` to replace `import find = require("lodash/find");` with `import find from "lodash/find";`

Now we've got everything set up for gun.

Let's create a special hook for accessing gun and user object. Let's create a `./src/hooks/useGun.js` we'll import all the needed plugins and SEA for authentication.

Our `useGun.js` will look something like this.

```javascript
import 'gun/lib/mobile'
import Gun from 'gun/gun'
import SEA from 'gun/sea'

const useGun = () => {
  const gun = Gun({
    peers: ['http://localhost:8765/gun']
  })
  //App namespace
  const app = gun.get('jot')
  const user = gun.user()
  return { gun, app, user, SEA }
}

export default useGun
```

Let's go to our `actions.js` and update the functions to use gun for authentication.

First lets import useGun and access the functions needed here. These lines should be on top of actions.js

```javascript
import useGun from './useGun'
const { user, SEA } = useGun()
```

Our createUser function will create a key pair and call the `authUser` with the dispatch to authenticate the user which we'll create next. after that it will

```javascript
export async function createUser (dispatch, payload) {
  var key = await SEA.pair()
  authUser(dispatch, { key: key, username: payload.username })
  user
    .get('profile')
    .get('name')
    .put(payload.username)
}
```

Then our authUser function will authenticate

```javascript
export async function authUser (dispatch, payload) {
  user.auth(payload.key)
  if (user.is) {
    user
      .get('profile')
      .get('name')
      .on(username => {
        // Update the username and key in our auth context
        dispatch({
          type: 'AUTH',
          payload: {
            username: username,
            key: JSON.stringify(user.is)
          }
        })
      })
  }
}
```

Finally our logoutUser function will just dispatch a logout action and log out the user from gun by calling user.leave()

```javascript
export async function logoutUser (dispatch) {
  user.leave()
  // Resets the username and key in our auth context
  dispatch({ type: 'AUTH_LOGOUT' })
}
```

Let's update our `Home.js` to see the profile username and key to show the logged in user.
```javascript
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Typo } from "../components/Typo";
import { FilledButton } from "../components/Button";
import { useAuth, useAuthDispatch, logoutUser } from "../contexts";
export default function Home() {
	const profile = useAuth();
	const dispatch = useAuthDispatch();
	return (
		<View>
			<Typo size="xl" weight="bold">
				Welcome, {profile.username}
			</Typo>
			<Typo size="sm" weight="100" color="#505050">
				{profile.key}
			</Typo>
			<FilledButton onPress={() => logoutUser(dispatch)}>
				Logout
			</FilledButton>
		</View>
	);
}
```

Congratulations we're done with a basic authentication app using Gun and Expo
