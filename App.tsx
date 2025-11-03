import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Article from './components/Article';
import type { RootStackParamList, ArticleType } from './types';

const NEWS_API_KEY = '0b8bf0a383684f7492525a515d9eece6';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NEWS_API_KEY}`
      );

      const json = await response.json();
      const articleData = json.articles.map(
        ({
          title,
          description,
          content,
          publishedAt,
          urlToImage,
          url,
        }: ResponseData) => {
          return {
            title,
            description,
            content,
            image: urlToImage,
            publishedAt,
            url,
          };
        }
      );
      setArticles(articleData);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setArticlesLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const [fontsLoaded] = useFonts({
    MomoTrustDisplay: require('./assets/fonts/MomoTrustDisplay-Regular.ttf'),
    MomoSignature: require('./assets/fonts/MomoSignature-Regular.ttf'),
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
  });

  console.log('fontsLoadedApp', fontsLoaded);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Text style={styles.appName}>newsy</Text>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}
          >
            <Stack.Screen name='Home'>
              {(props) => (
                <Home
                  {...props}
                  fontsLoaded={fontsLoaded}
                  articles={articles}
                  articlesLoading={articlesLoading}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name='Article' component={Article} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

interface ResponseData {
  title: string;
  description: string;
  content: string;
  urlToImage: string;
  publishedAt: string;
  url: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b94678',
    flex: 1,
  },
  appName: {
    fontSize: 36,
    marginBottom: 24,
    color: '#edd1dd',
    fontFamily: 'MomoSignature',
    textAlign: 'center',
  },
});
