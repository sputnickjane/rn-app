import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  Linking,
} from 'react-native';
import { RootStackParamList } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format } from 'date-fns';

const Article = ({ route }: ArticleProps) => {
  const { articleData } = route.params;
  const { title, description, image, content, publishedAt, url } = articleData;
  console.log('publishedAt', publishedAt);
  const formattedDate = format(new Date(publishedAt), 'do MMM yyyy');
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.timestamp}>Posted at: {formattedDate}</Text>
      <Text style={styles.summary}>{description}</Text>
      <Text style={styles.body}>{content}</Text>
      <Pressable
        onPress={() => {
          Linking.openURL(url);
        }}
      >
        <View style={styles.link}>
          <Text style={styles.linkText}>Read full article on BBC</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Article;

type ArticleScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Article'
>;

interface ArticleProps {
  route: ArticleScreenNavigationProp['route'];
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 16,
    paddingLeft: 16,
    gap: 16,
  },
  heading: {
    color: 'white',
    fontFamily: 'MomoTrustDisplay',
    fontSize: 28,
  },
  timestamp: {
    color: 'white',
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 4,
  },
  summary: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat',
  },
  body: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  link: {
    padding: 16,
    backgroundColor: '#edd1dd',
    borderRadius: 4,
  },
  linkText: {
    color: '#b94678',
    fontFamily: 'MomoTrustDisplay',
    textAlign: 'center',
  },
});
