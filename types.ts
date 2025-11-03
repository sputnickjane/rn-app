export interface ArticleType {
  title: string;
  description: string;
  image: string;
  content: string;
  publishedAt: string;
  url: string;
}

export type RootStackParamList = {
  Home: {
    fontsLoaded: boolean;
    articlesLoading: boolean;
    articles: ArticleType[];
  };
  Article: {
    articleData: ArticleType;
  };
};
