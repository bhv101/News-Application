import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCategory } from './CategoryContext';
import { useTheme } from '../Assets/ThemeContext';

function CategorySlider() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { selectedCategory, setSelectedCategory } = useCategory();

  const categoryList = [
    { id: 1, name: 'World' },
    { id: 2, name: 'Technology' },
    { id: 3, name: 'Business' },
    { id: 4, name: 'Sports' },
    { id: 5, name: 'Science' },
    { id: 6, name: 'Entertainment' },
  ];

  const handlePress = (category) => {
    setSelectedCategory(category.name);

    if (category.name === 'World') {
      navigation.navigate('home');  // Navigate to HomeScreen
    } else if (category.name === 'Technology') {
      navigation.navigate('tech-news');  // Navigate to TechnologyScreen
    } else if (category.name === 'Business') {
      navigation.navigate('business-news');  // Navigate to BusinessScreen
    } else if (category.name === 'Sports') {
      navigation.navigate('sports-news');  // Navigate to SportsScreen
    } else if (category.name === 'Science') {
      navigation.navigate('science-news');  // Navigate to ScienceScreen
    } else if (category.name === 'Entertainment') {
      navigation.navigate('entertain-news');  // Navigate to EntertainScreen
    }
  };

 return (
    <View style={styles.container}>
      <FlatList
        data={categoryList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => handlePress(item)} 
            style={styles.button}
          >
            <Text
              style={[
                styles.text,
                {
                  color: selectedCategory === item.name ? 'red' : theme.textColor, 
                },
              ]}
            >
              {item.name}
            </Text>
            {selectedCategory === item.name && <View style={styles.underline} />} 
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
  },
  button: {
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  underline: {
    height: 2,
    backgroundColor: 'red', 
    width: '100%', 
    marginTop: 2, 
  },
});

export default CategorySlider;
