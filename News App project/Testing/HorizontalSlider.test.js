import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HorizontalSlider from '../components/HorizontalSlider'; 
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Assets/ThemeContext';

//Mock the hooks
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('../Assets/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('HorizontalSlider Component', () => {
  const mockNavigation = { navigate: jest.fn() };
  const mockTheme = {
    theme: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
    },
  };
  const mockNews = [{
    title: 'Test News',
    urlToImage: 'https://test.com/image.jpg',
    source: { name: 'Test source' },
  }];
 // Setup the mocks
  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    useTheme.mockReturnValue(mockTheme);
  });

  it('should navigate to read-news screen on item press', () => {
    const { getByText } = render(<HorizontalSlider newsList={mockNews} />);

    // Simulate pressing the item
    fireEvent.press(getByText('Test News'));

    // Verify that navigation was triggered
    expect(mockNavigation.navigate).toHaveBeenCalledWith('read-news', { news: mockNews[0] });
  });
});
