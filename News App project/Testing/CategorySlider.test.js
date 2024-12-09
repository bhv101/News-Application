import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import CategorySlider from '../components/CategorySlider';
import { useTheme } from '../Assets/ThemeContext';
import { useCategory } from '../components/CategoryContext'

// Mock the hooks
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../Assets/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

jest.mock('../components/CategoryContext', () => ({
  useCategory: jest.fn(),
}));

describe('CategorySlider', () => {
  const mockNavigate = jest.fn();
  const mockTheme = {
    theme: {
      backgroundColor: '#ffffff',
      textColor: '#000000',
    },
  };
  const mockCategory = {
    selectedCategory: 'World',
    setSelectedCategory: jest.fn(),
  };
  // Set Up the mocks
  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    useTheme.mockReturnValue(mockTheme);
    useCategory.mockReturnValue(mockCategory);
  });

  it('navigates to the correct screen when a category is pressed', () => {
    const { getByText } = render(<CategorySlider />);
    
    fireEvent.press(getByText('Technology'));
    // Verify that pressing a Technology category navigates to the correct page
    expect(mockNavigate).toHaveBeenCalledWith('tech-news');

    fireEvent.press(getByText('World'));
    // Verify that pressing a World category navigates to the correct page
    expect(mockNavigate).toHaveBeenCalledWith('home');

    fireEvent.press(getByText('Business'));
    // Verify that pressing a Business category navigates to the correct page
    expect(mockNavigate).toHaveBeenCalledWith('business-news');

    fireEvent.press(getByText('Science'));
    // Verify that pressing a Science category navigates to the correct page
    expect(mockNavigate).toHaveBeenCalledWith('science-news');

    fireEvent.press(getByText('Sports'));
    // Verify that pressing a Sports category navigates to the correct page
    expect(mockNavigate).toHaveBeenCalledWith('sports-news');

    fireEvent.press(getByText('Entertainment'));
    // Verify that pressing a Entertainment category navigates to the correct page
    expect(mockNavigate).toHaveBeenCalledWith('entertain-news');
  });
});
