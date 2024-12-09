import { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Assets/ThemeContext';

function HorizontalSlider({ newsList }) {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const scrollIndex = useRef(0);
  const { theme } = useTheme();

  // Display only the first 5 articles
  const displayedNewsList = newsList.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollIndex.current < displayedNewsList.length - 1) {
        scrollIndex.current += 1;
      } else {
        scrollIndex.current = 0;
      }

      flatListRef.current?.scrollToIndex({
        index: scrollIndex.current,
        animated: true,
      });
    }, 3000); // Scrolls every 3 seconds

    return () => clearInterval(interval); 
  }, [displayedNewsList.length]);

  return (
    <View style={styles.container}>
    
      <FlatList
        ref={flatListRef}
        data={displayedNewsList}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => navigation.navigate('read-news',{news:item})} 
          >
            {item.urlToImage ? (
              <Image 
                source={{ uri: item.urlToImage }} 
                style={styles.image} 
              />
            ) : (
              <View >
              
              {/*Display a placeholder image if urlToImage is null */}
                <Image source={require('../Assets/Images/news-image.png')} style={styles.image} />
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={[styles.title,{ color: theme.textColor }]}>{item.title}</Text>
              <Text style={[styles.sourceName,{ color: theme.headerColor }]}>{item?.source.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0, 
  },
  contentContainer: {
    paddingHorizontal: 10, 
  },
  item: {
    width: 300,
    marginRight: 10,
    borderRadius: 5,
  },
  image: {
    height: 300,
    width: '100%',
    borderRadius: 5,
  },
  
  textContainer: {
    padding: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sourceName: {
    fontSize: 14,
    color: 'red',
  },
});

export default HorizontalSlider;
