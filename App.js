import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home';
import QueryScreen from './query';
import HeadlineScreen from './headlines';
import AnalysisScreen from './analysis';
import NlpScreen from './nlp';
import ArticleDisplay from './articleDisplay';
import TrendingScreen from './trending';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NewsFlashTheme = {
  dark: true,
  colors: {
    primary: '#2d6ff4',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(0, 0, 0)',
    text: '#2d6ff4',
    border: 'rgb(0, 0, 0)',
    notification: 'rgb(255, 69, 58)',
  },
};

function HomeTab() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Search') {
          iconName = focused ? 'ios-globe' : 'ios-globe-outline';
        } else if (route.name === 'Top Headlines') {
          iconName = focused ? 'ios-list' : 'ios-list-outline';
        } else if (route.name === 'Analyze') {
          iconName = focused ? 'ios-barcode' : 'ios-barcode-outline';
        }

        return <Ionicons name = {iconName} size = {size} color = {color} />;
      },
    })}
  tabBarOptions={{
      activeTintColor: '#2d6ff4',
      inactiveTintColor: 'gray',
    }}>
      <Tab.Screen name = "Top Headlines" component = {TopStack} />
      <Tab.Screen name = "Search" component = {HomeStack} />
      <Tab.Screen name = "Analyze" component = {NlpStack} />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name = "Search" component = {HomeScreen} options = {{ headerShown: false }} />
      <Stack.Screen name = "Query Results" component = {QueryScreen} />
      <Stack.Screen name = "Display Article" component = {ArticleDisplay} />
    </Stack.Navigator>
  );
}

function TopStack() {
  return (
    <Stack.Navigator initialRouteName="TopHeadlines">
        <Stack.Screen name = "Top Headlines" component = {HeadlineScreen} options = {{ headerShown: false }} />
        <Stack.Screen name = "Display Article" component = {ArticleDisplay} />
      </Stack.Navigator>
  );
}

function NlpStack() {
  return (
    <Stack.Navigator initialRouteName="Analyze" headerMode = "none">
      <Stack.Screen name = "Analyze" component={AnalysisScreen} />
      <Stack.Screen name = "Nlp Results" component={NlpScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={NewsFlashTheme}>
      <HomeTab />
    </NavigationContainer>
  );
}
