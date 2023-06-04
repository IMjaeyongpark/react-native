import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from "./components/Main"
import Login from './components/LogIn'


const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LOGIN" component={Login} />
        <Stack.Screen name="TODOLIST" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


