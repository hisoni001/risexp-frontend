import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash2, Newspaper, ArrowLeft, Image, Video, Type, GripVertical, X, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { ArticleContext } from '@/contexts/ArticleContext';
import { Link } from 'react-router-dom';

const ManageArticles = () => {
  const { articles, addArticle, updateArticle, deleteArticle, categories } = useContext(ArticleContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [sendNotification, setSendNotification] = useState(false);

  const openNewArticleDialog = () => {
    setCurrentArticle({ title: '', category: '', author: '', image: '', content: [{ id: `content-${Date.now()}`, type: 'paragraph', content: '' }] });
    setSendNotification(false);
    setIsDialogOpen(true);
  };

  const openEditArticleDialog = (article) => {
    setCurrentArticle(JSON.parse(JSON.stringify(article)));
    setSendNotification(false);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (article) => {
    setArticleToDelete(article);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveArticle = () => {
    if (!currentArticle.title || !currentArticle.category) {
      toast({ title: "Validation Error", description: "Title and Category are required.", variant: "destructive" });
      return;
    }
    if (currentArticle.id) {
      updateArticle(currentArticle);
      toast({ title: "Success", description: "Article updated successfully." });
    } else {
      addArticle(currentArticle);
      toast({ title: "Success", description: "Article added successfully." });
    }

    if (sendNotification) {
      toast({
        title: "Push Notification Sent! (Simulation)",
        description: `Your subscribers have been notified about "${currentArticle.title}".`,
      });
    }

    setIsDialogOpen(false);
    setCurrentArticle(null);
  };

  const handleDeleteConfirm = () => {
    deleteArticle(articleToDelete.id);
    toast({ title: "Success", description: "Article deleted successfully." });
    setIsDeleteDialogOpen(false);
    setArticleToDelete(null);
  };

  const handleContentChange = (index, value) => {
    const newContent = [...currentArticle.content];
    newContent[index].content = value;
    setCurrentArticle({ ...currentArticle, content: newContent });
  };

  const addContentBlock = (type) => {
    const newBlock = { id: `content-${Date.now()}`, type, content: type === 'video' ? '' : (type === 'image' ? '' : '') };
    if (type === 'video') newBlock.videoId = '';
    if (type === 'image') newBlock.alt = '';
    setCurrentArticle({ ...currentArticle, content: [...currentArticle.content, newBlock] });
  };

  const removeContentBlock = (index) => {
    const newContent = currentArticle.content.filter((_, i) => i !== index);
    setCurrentArticle({ ...currentArticle, content: newContent });
  };

  return (
    <>
      <Helmet><title>Manage Articles - RISE XP Admin</title></Helmet>
      <div className="min-h-screen bg-gray-100 p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard"><Button variant="outline" size="icon"><ArrowLeft /></Button></Link>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center"><Newspaper className="mr-4" /> Manage Articles</h1>
            </div>
            <Button onClick={openNewArticleDialog}><PlusCircle className="mr-2 h-4 w-4" /> Add New Article</Button>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 grid grid-cols-5 font-bold bg-gray-50 border-b">
              <div className="col-span-2">Title</div><div>Category</div><div>Author</div><div>Actions</div>
            </div>
            {articles.map(article => (
              <div key={article.id} className="p-4 grid grid-cols-5 items-center border-b last:border-b-0 hover:bg-gray-50">
                <div className="col-span-2 font-medium">{article.title}</div>
                <div>{article.category}</div>
                <div>{article.author || 'N/A'}</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => openEditArticleDialog(article)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(article)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader><DialogTitle>{currentArticle?.id ? 'Edit Article' : 'Add New Article'}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={currentArticle?.title} onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Select onValueChange={(value) => setCurrentArticle({ ...currentArticle, category: value })} value={currentArticle?.category}>
                <SelectTrigger className="col-span-3"><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>{categories.map(cat => <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">Author</Label>
              <Input id="author" value={currentArticle?.author} onChange={(e) => setCurrentArticle({ ...currentArticle, author: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Main Image Desc.</Label>
              <Input id="image" placeholder="e.g., 'Indian Parliament building'" value={currentArticle?.image} onChange={(e) => setCurrentArticle({ ...currentArticle, image: e.target.value })} className="col-span-3" />
            </div>
            <h3 className="font-semibold text-lg mt-4 border-b pb-2">Article Content</h3>
            {currentArticle?.content.map((block, index) => (
              <div key={block.id} className="grid grid-cols-1 gap-2 border rounded-md p-4 relative">
                <div className="flex justify-between items-center mb-2">
                  <Label className="font-semibold flex items-center"><GripVertical className="h-5 w-5 mr-2 text-gray-400 cursor-grab" /> Block {index + 1}: {block.type}</Label>
                  {currentArticle.content.length > 1 && <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeContentBlock(index)}><X className="h-4 w-4" /></Button>}
                </div>
                {block.type === 'paragraph' && <Textarea placeholder="Write your paragraph here..." value={block.content} onChange={(e) => handleContentChange(index, e.target.value)} rows={5} />}
                {block.type === 'image' && <Input placeholder="Image description for AI..." value={block.alt} onChange={(e) => { const c = [...currentArticle.content]; c[index].alt = e.target.value; setCurrentArticle({...currentArticle, content: c}) }} />}
                {block.type === 'video' && <Input placeholder="YouTube Video ID (e.g., dQw4w9WgXcQ)" value={block.videoId} onChange={(e) => { const c = [...currentArticle.content]; c[index].videoId = e.target.value; setCurrentArticle({...currentArticle, content: c}) }} />}
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <Button variant="outline" onClick={() => addContentBlock('paragraph')}><Type className="mr-2 h-4 w-4" /> Add Paragraph</Button>
              <Button variant="outline" onClick={() => addContentBlock('image')}><Image className="mr-2 h-4 w-4" /> Add Image</Button>
              <Button variant="outline" onClick={() => addContentBlock('video')}><Video className="mr-2 h-4 w-4" /> Add Video</Button>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="sendNotification" checked={sendNotification} onCheckedChange={setSendNotification} />
              <Label htmlFor="sendNotification" className="flex items-center gap-2 text-sm font-normal">
                <Bell className="h-4 w-4" /> Send push notification to subscribers
              </Label>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={handleSaveArticle}>Save changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Are you sure?</DialogTitle><DialogDescription>This will permanently delete the article "{articleToDelete?.title}".</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageArticles;