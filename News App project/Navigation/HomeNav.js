import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import ReadNews from '../Screens/ReadNews';
import TechScreen from '../Screens/TechScreen';  
import BusinessScreen from '../Screens/BusinessScreen';
import ScienceScreen from '../Screens/ScienceScreen';
import SportsScreen from '../Screens/SportsScreen';
import EntertainScreen from '../Screens/EntertainScreen';

const Stack = createStackNavigator();

function HomeNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="read-news" component={ReadNews} />
      <Stack.Screen name="tech-news" component={TechScreen} />
      <Stack.Screen name="business-news" component={BusinessScreen} />
      <Stack.Screen name="science-news" component={ScienceScreen}/>
      <Stack.Screen name="sports-news" component={SportsScreen}/>
      <Stack.Screen name="entertain-news" component={EntertainScreen}/>
      
    </Stack.Navigator>
  );
}

export default HomeNav;