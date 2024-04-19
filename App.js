import { Provider } from 'react-redux';
import Store from "./src/redux/store";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/Components/Login/Login";
import React from 'react';
import { navigate, navigationRef } from './src/Components/NavigationRoot';
import Icons from "react-native-vector-icons/FontAwesome";
import { Pressable } from 'react-native';
import Home from './src/Components/Home/Home';
import Accounts from './src/Components/Accounts/Accounts';
import Categories from './src/Components/Categories/Categories';
import IncomeAndExpense from './src/Components/IncomeAndExpense/IncomeAndExpense';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={Store}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} options={{
            headerBackVisible: false,
            headerLeft: null,
            headerRight: () => (
              <Pressable onPress={() => {
                navigate("Login")
              }}>
                <Icons name='sign-out' size={26} style={{ paddingRight: 10 }} />
              </Pressable>
            )
          }} />
          <Stack.Screen name="Accounts" component={Accounts} options={{
            headerRight: () => (
              <Pressable onPress={() => {
                navigate("Login")
              }}>
                <Icons name='sign-out' size={26} style={{ paddingRight: 10 }} />
              </Pressable>
            )
          }} />
          <Stack.Screen name="Categories" component={Categories} options={{
            headerRight: () => (
              <Pressable onPress={() => {
                navigate("Login")
              }}>
                <Icons name='sign-out' size={26} style={{ paddingRight: 10 }} />
              </Pressable>
            )
          }} />
          <Stack.Screen name="Income And Expense" component={IncomeAndExpense} options={{
            headerRight: () => (
              <Pressable onPress={() => {
                navigate("Login")
              }}>
                <Icons name='sign-out' size={26} style={{ paddingRight: 10 }} />
              </Pressable>
            )
          }} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>

  );
}
