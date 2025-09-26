import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Clock, User, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArticleContext } from '@/contexts/ArticleContext';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {
  const { articleId } = useParams();
  const { getArticleById } = useContext(ArticleContext);
  const article = getArticleById(articleId);

  if (!article) {
    return <NotFoundPage />;
  }

  const renderContent = (item) => {
    switch (item.type) {
      case 'paragraph':
        return <p key={item.id} className="mb-6 leading-relaxed">{item.content}</p>;
      case 'image':
        return <img key={item.id} class="w-full h-auto max-h-[500px] object-cover rounded-lg my-8" alt={item.alt} src="https://images.unsplash.com/photo-1626032751364-13868589f0b0" />;
      case 'video':
        return <iframe key={item.id} className="w-full aspect-video my-8 rounded-lg" src={`https://www.youtube.com/embed/${item.videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{article.title} - RISE XP</title>
        <meta name="description" content={article.content.find(c => c.type === 'paragraph')?.content.substring(0, 160) || article.title} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-card p-6 md:p-8 rounded-lg shadow-sm border"
      >
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center space-x-2 text-sm text-primary font-semibold">
            <Tag className="h-4 w-4" />
            <Link to={`/category/${article.category.toLowerCase()}`} className="hover:underline">
              {article.category.toUpperCase()}
            </Link>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{article.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6 border-b border-border pb-4">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{article.time}</span>
          </div>
        </div>
        
        <div className="prose">
          <img class="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8" alt={article.image} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
          {article.content.map(item => renderContent(item))}
        </div>
      </motion.div>
    </>
  );
};

export default ArticlePage;