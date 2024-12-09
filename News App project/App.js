import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CategoryProvider } from './components/CategoryContext'
import HomeNav from './Navigation/HomeNav';
import { ThemeProvider, useTheme } from './Assets/ThemeContext';

const ThemedApp = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
    <CategoryProvider>
      <NavigationContainer>
        <HomeNav />
      </NavigationContainer>
    </CategoryProvider>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    padding: 17,
  },
});
