import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Share } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as WebBrowser from 'expo-web-browser';
import { useTheme } from '../Assets/ThemeContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function ReadNews() {
  const news = useRoute().params.news;
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    console.log(news);
  }, [news]);

  const shareNews = async () => {
    try {
      await Share.share({
        message: `${news.title}\n\n${news.description}\n\nRead more: ${news.url}`,
      });
    } catch (error) {
      console.error('Error sharing news:', error);
    }
  };

  // Format the published date
  const publishedDate = new Date(news.publishedAt).toLocaleDateString();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.headerContainer,{ color: theme.headerColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={theme.textColor} />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleTheme} style={styles.lightButton}>
            <MaterialCommunityIcons name="theme-light-dark" size={30} color={theme.textColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareNews} style={styles.shareButton}>
            <AntDesign name="sharealt" size={30} color={theme.textColor} />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={{ uri: news.urlToImage }}
        style={styles.newsImage}
      />
      <Text style={[styles.sourceName,{ color: theme.headerColor }]}>{news.source.name}</Text>
      <Text style={[styles.title, { color: theme.textColor }]}>{news.title}</Text>
      <Text style={[styles.description, { color: theme.descriptionColor }]}>{news.description}</Text>
      <Text style={[styles.publishedDate, { color: theme.textColor }]}>Published On : {publishedDate}</Text>
      <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(news.url)}>
        <Text style={[styles.readMore,{ color: theme.headerColor }]}>Read more</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
  sourceName: {
    marginTop: 10,
    
    fontSize: 13,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 30,
  },
  publishedDate: {
    marginTop: 10,
    fontSize: 14,
  },
  readMore: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
  },
  lightButton: {
    padding: 10,
  },
  shareButton: {
    padding: 10,
  },
});

export default ReadNews;
