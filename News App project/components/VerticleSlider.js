import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Assets/ThemeContext';

function VerticleSlider({ newsList }) {
  const navigation = useNavigation();
  const displayedNewsList = newsList.slice(5, 15); // Skips the first 5 articles and takes the next 10
  const { theme } = useTheme();

  console.log("Displayed news list:", displayedNewsList);

  return (
    <View style={styles.container}>
      <Text style={[styles.header , { color: theme.headerColor }]}>Top Stories</Text>
      <FlatList
        data={displayedNewsList}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('read-news', { news: item })}
          >
            {item.urlToImage ? (
              <Image
                source={{ uri: item.urlToImage }}
                style={styles.image}
              />
            ) : (
              //Display a placeholder image if urlToImage is null
              <Image
                source={require('../Assets/Images/news-image.png')}
                style={styles.image}
              />
            )}
            <View style={styles.textContainer}>
              <Text style={[styles.title,{ color: theme.textColor }]}>{item.title}</Text>
              <Text style={[styles.sourceName, { color: theme.headerColor }]}>{item?.source?.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={styles.footer} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sourceName: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  footer: {
    height: 30, 
  },

  header:{
    fontSize: 24,
    fontWeight:'bold',
    marginBottom: 20,
  }
});

export default VerticleSlider;
