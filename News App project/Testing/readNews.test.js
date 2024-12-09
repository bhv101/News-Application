import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../Assets/ThemeContext'; 
import ReadNews from '../Screens/ReadNews';
import * as WebBrowser from 'expo-web-browser';

// Mock the hooks and modules
jest.mock('@expo/vector-icons/AntDesign', () => {
    return {
      __esModule: true,
      default: (props) => <div {...props} />, // Mock component
    };
  });
  
  jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => {
    return {
      __esModule: true,
      default: (props) => <div {...props} />, // Mock component
    };
  });


jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('../Assets/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(),
}));

describe('ReadNews Component', () => {
  const mockNavigate = jest.fn();
  const mockTheme = {
    theme: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
      descriptionColor: '#666666',
    },
    toggleTheme: jest.fn(),
  };
  const mockNews = {
    title: 'Test News Title',
    description: 'Test News Description',
    url: 'https://test.com/news',
    urlToImage: 'https://test.com/image.jpg',
    source: { name: 'Test source' },
    publishedAt: '2024-09-01T00:00:00Z',
  };
 // Setup the mocks
  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigate);
    useRoute.mockReturnValue({ params: { news: mockNews } });
    useTheme.mockReturnValue(mockTheme);
  });

  it('should open external link when "Read more" is pressed', () => {
    const { getByText } = render(<ReadNews />);

    // Simulate pressing the "Read more" button
    fireEvent.press(getByText('Read more'));

    // Verify that WebBrowser.openBrowserAsync was called with the correct URL
    expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(mockNews.url);
  });
});
