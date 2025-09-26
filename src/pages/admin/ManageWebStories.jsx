import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash2, Film, ArrowLeft, GripVertical, X, Image, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { WebStoryContext } from '@/contexts/WebStoryContext';
import { Link } from 'react-router-dom';

const ManageWebStories = () => {
  const { stories, addStory, updateStory, deleteStory } = useContext(WebStoryContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [storyToDelete, setStoryToDelete] = useState(null);

  const openNewDialog = () => {
    setCurrentStory({ title: '', coverImage: '', pages: [{ type: 'image', image: '', text: '' }] });
    setIsDialogOpen(true);
  };

  const openEditDialog = (story) => {
    setCurrentStory(JSON.parse(JSON.stringify(story)));
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (story) => {
    setStoryToDelete(story);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentStory.title || !currentStory.coverImage) {
      toast({ title: "Validation Error", description: "Title and Cover Image are required.", variant: "destructive" });
      return;
    }
    if (currentStory.id) {
      updateStory(currentStory);
      toast({ title: "Success", description: "Web Story updated successfully." });
    } else {
      addStory(currentStory);
      toast({ title: "Success", description: "Web Story added successfully." });
    }
    setIsDialogOpen(false);
    setCurrentStory(null);
  };

  const handleDeleteConfirm = () => {
    deleteStory(storyToDelete.id);
    toast({ title: "Success", description: "Web Story deleted successfully." });
    setIsDeleteDialogOpen(false);
    setStoryToDelete(null);
  };

  const handlePageChange = (index, field, value) => {
    const newPages = [...currentStory.pages];
    newPages[index][field] = value;
    setCurrentStory({ ...currentStory, pages: newPages });
  };

  const addPage = (type) => {
    const newPage = { type, text: '' };
    if (type === 'image') newPage.image = '';
    if (type === 'video') newPage.videoId = '';
    setCurrentStory({ ...currentStory, pages: [...currentStory.pages, newPage] });
  };

  const removePage = (index) => {
    const newPages = currentStory.pages.filter((_, i) => i !== index);
    setCurrentStory({ ...currentStory, pages: newPages });
  };

  return (
    <>
      <Helmet><title>Manage Web Stories - RISE XP Admin</title></Helmet>
      <div className="min-h-screen bg-gray-100 p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard"><Button variant="outline" size="icon"><ArrowLeft /></Button></Link>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center"><Film className="mr-4" /> Manage Web Stories</h1>
            </div>
            <Button onClick={openNewDialog}><PlusCircle className="mr-2 h-4 w-4" /> Add New Story</Button>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 grid grid-cols-4 font-bold bg-gray-50 border-b">
              <div className="col-span-2">Title</div><div>Pages</div><div>Actions</div>
            </div>
            {stories.map(story => (
              <div key={story.id} className="p-4 grid grid-cols-4 items-center border-b last:border-b-0 hover:bg-gray-50">
                <div className="col-span-2 font-medium">{story.title}</div>
                <div>{story.pages.length}</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => openEditDialog(story)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(story)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader><DialogTitle>{currentStory?.id ? 'Edit Web Story' : 'Add New Web Story'}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={currentStory?.title} onChange={(e) => setCurrentStory({ ...currentStory, title: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coverImage" className="text-right">Cover Image Desc.</Label>
              <Input id="coverImage" placeholder="e.g., A fleet of electric cars" value={currentStory?.coverImage} onChange={(e) => setCurrentStory({ ...currentStory, coverImage: e.target.value })} className="col-span-3" />
            </div>
            <h3 className="font-semibold text-lg mt-4 border-b pb-2">Pages</h3>
            {currentStory?.pages.map((page, index) => (
              <div key={index} className="grid grid-cols-1 gap-4 border rounded-md p-4 relative">
                <div className="flex justify-between items-center">
                  <Label className="font-semibold">Page {index + 1} ({page.type})</Label>
                  {currentStory.pages.length > 1 && <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removePage(index)}><X className="h-4 w-4" /></Button>}
                </div>
                {page.type === 'image' && <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor={`page-image-${index}`} className="text-right">Image Desc.</Label><Input id={`page-image-${index}`} value={page.image} onChange={(e) => handlePageChange(index, 'image', e.target.value)} className="col-span-3" /></div>}
                {page.type === 'video' && <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor={`page-video-${index}`} className="text-right">YouTube ID</Label><Input id={`page-video-${index}`} value={page.videoId} onChange={(e) => handlePageChange(index, 'videoId', e.target.value)} className="col-span-3" /></div>}
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor={`page-text-${index}`} className="text-right pt-2">Text</Label>
                  <Textarea id={`page-text-${index}`} value={page.text} onChange={(e) => handlePageChange(index, 'text', e.target.value)} className="col-span-3" rows={2} />
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <Button variant="outline" onClick={() => addPage('image')}><Image className="mr-2 h-4 w-4" /> Add Image Page</Button>
              <Button variant="outline" onClick={() => addPage('video')}><Video className="mr-2 h-4 w-4" /> Add Video Page</Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Are you sure?</DialogTitle></DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageWebStories;