import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const NEWS_API_KEY = '0b8bf0a383684f7492525a515d9eece6';

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${NEWS_API_KEY}`
      );

      const json = await response.json();
      const articleData = json.articles.map(
        ({ title, description }: Article) => {
          return { title, description };
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
    console.log('artcilesnew', articles);
    console.log('articlesLoading', articlesLoading);
  }, []);

  const [fontsLoaded] = useFonts({
    MomoTrustDisplay: require('./assets/fonts/MomoTrustDisplay-Regular.ttf'),
    MomoSignature: require('./assets/fonts/MomoSignature-Regular.ttf'),
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.appName}>fran has news</Text>
        {!fontsLoaded || articlesLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={articles}
            keyExtractor={({ title }) => title}
            contentContainerStyle={styles.articles}
            renderItem={({ item }) => {
              return (
                <View style={styles.articleLink}>
                  <Text style={styles.heading}>{item.title}</Text>
                  <Text
                    style={styles.summary}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                  >
                    {item.description}
                  </Text>
                  <Button title='Read more' />
                </View>
              );
            }}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

interface Article {
  title: string;
  description: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b94678',
    padding: 16,
    flex: 1,
  },
  appName: {
    fontSize: 36,
    marginBottom: 32,
    color: '#edd1dd',
    fontFamily: 'MomoSignature',
    textAlign: 'center',
  },
  articles: {
    gap: 16,
  },
  articleLink: {
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 4,
    borderColor: '#953861',
    width: '100%',
  },
  heading: {
    color: 'white',
    fontFamily: 'MomoTrustDisplay',
    fontSize: 24,
    marginBottom: 8,
  },
  summary: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
});
