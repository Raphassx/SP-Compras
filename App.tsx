import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/pages/login';
import LoginHome from './src/pages/login/LoginHome';
import LoginLojas from './src/pages/login/loginLojas';
import Home from './src/pages/home/home';
import NotasDetalhes from './src/pages/notas/notasDetalhes';

import { AuthProvider } from './src/pages/contexto/AuthContext';

import type { RootStackParamList } from './src/routes/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="LoginHome" component={LoginHome} />
          <Stack.Screen name="LoginLojas" component={LoginLojas} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NotasDetalhes" component={NotasDetalhes} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
