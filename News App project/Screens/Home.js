import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import CategoryTextSlider from '../components/CategorySlider';
import TopHeadlineSlider from '../components/HorizontalSlider';
import HeadlineList from '../components/VerticleSlider';
import { getNewsByCategoryAPI } from '../Services/API';
import AntDesign from '@expo/vector-icons/AntDesign';
import backupData from '../Assets/backupData.json'; 
import { useTheme } from '../Assets/ThemeContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Home = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('General'); 
  
  const { theme, toggleTheme } = useTheme();

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = getNewsByCategoryAPI(category); // Get the API URL
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setNewsList(data.articles);
    } catch (error) {
      console.log(`API failed, loading backup data... Error: ${error.message}`);
      // Load backup data if available
      if (backupData && backupData.category && backupData.category[category]) {
        console.log(`Loaded backup data:`, backupData.category[category]);
        setNewsList(backupData.category[category]);
      } else {
        setError(`Failed to fetch news: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer,{ backgroundColor: theme.backgroundColor }]}>
        <ActivityIndicator size="large" color="#ff001f" />
        <Text>Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.scrollView, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Light/Dark Mode Button */} 
        <TouchableOpacity onPress={toggleTheme} style={styles.lightButton}>
          <MaterialCommunityIcons name="theme-light-dark" size={30} color={theme.textColor} />
        </TouchableOpacity>
        
        {/* Category Name Header */}
        <Text style={[styles.header, { color: theme.headerColor }]}>Home</Text>

        {/* Reload Button */}
        <TouchableOpacity onPress={fetchNews} style={styles.reloadButton}>
          <AntDesign name="reload1" size={24} color={theme.textColor} />
        </TouchableOpacity>
      </View>
      
      {/* Category List */}
      <CategoryTextSlider onSelectCategory={setCategory} />
      {/* Top headline slider */}
      <TopHeadlineSlider newsList={newsList} />
      {/* Vertical slider */}
      <HeadlineList newsList={newsList} theme={theme} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  reloadButton: {
    padding: 10,
  },
  lightButton: {
    padding: 10,
  },
});

export default Home;
