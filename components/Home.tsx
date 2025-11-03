import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import { ArticleType, RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Home = ({
  navigation,
  fontsLoaded,
  articlesLoading,
  articles,
}: HomeProps) => {
  console.log('fontsLoaded', fontsLoaded);
  return (
    <View>
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
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.contentWrapper}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('Article', { articleData: item })
                    }
                  >
                    <Text style={styles.heading}>{item.title}</Text>
                  </Pressable>
                  <Text
                    style={styles.summary}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Home;

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeProps {
  fontsLoaded: boolean;
  articlesLoading: boolean;
  articles: ArticleType[];
  navigation: HomeScreenNavigationProp;
}

const styles = StyleSheet.create({
  articles: {
    gap: 16,
  },
  articleLink: {
    marginBottom: 16,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderTopWidth: 4,
    borderColor: '#953861',
  },
  contentWrapper: {
    paddingRight: 16,
    paddingLeft: 16,
  },
  heading: {
    color: 'white',
    fontFamily: 'MomoTrustDisplay',
    fontSize: 24,
    marginBottom: 12,
  },
  summary: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
});
