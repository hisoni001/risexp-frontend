import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash2, Youtube, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { YouTubeContext } from '@/contexts/YouTubeContext';
import { Link } from 'react-router-dom';

const ManageYouTube = () => {
  const { videos, addVideo, updateVideo, deleteVideo } = useContext(YouTubeContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const openNewDialog = () => {
    setCurrentVideo({ videoId: '', title: '', description: '' });
    setIsDialogOpen(true);
  };

  const openEditDialog = (video) => {
    setCurrentVideo(video);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (video) => {
    setVideoToDelete(video);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentVideo.videoId || !currentVideo.title) {
      toast({ title: "Validation Error", description: "Video ID and Title are required.", variant: "destructive" });
      return;
    }
    if (currentVideo.id) {
      updateVideo(currentVideo);
      toast({ title: "Success", description: "Video updated successfully." });
    } else {
      addVideo(currentVideo);
      toast({ title: "Success", description: "Video added successfully." });
    }
    setIsDialogOpen(false);
    setCurrentVideo(null);
  };

  const handleDeleteConfirm = () => {
    deleteVideo(videoToDelete.id);
    toast({ title: "Success", description: "Video deleted successfully." });
    setIsDeleteDialogOpen(false);
    setVideoToDelete(null);
  };

  return (
    <>
      <Helmet><title>Manage YouTube Videos - RISE XP Admin</title></Helmet>
      <div className="min-h-screen bg-gray-100 p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard"><Button variant="outline" size="icon"><ArrowLeft /></Button></Link>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center"><Youtube className="mr-4 text-red-600" /> Manage YouTube Videos</h1>
            </div>
            <Button onClick={openNewDialog}><PlusCircle className="mr-2 h-4 w-4" /> Add New Video</Button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 grid grid-cols-4 font-bold bg-gray-50 border-b">
              <div className="col-span-2">Title</div>
              <div>Video ID</div>
              <div>Actions</div>
            </div>
            {videos.map(video => (
              <div key={video.id} className="p-4 grid grid-cols-4 items-center border-b last:border-b-0 hover:bg-gray-50">
                <div className="col-span-2 font-medium">{video.title}</div>
                <div className="font-mono text-sm text-gray-500">{video.videoId}</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => openEditDialog(video)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(video)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{currentVideo?.id ? 'Edit Video' : 'Add New Video'}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="videoId" className="text-right">Video ID</Label>
              <Input id="videoId" placeholder="e.g., dQw4w9WgXcQ" value={currentVideo?.videoId} onChange={(e) => setCurrentVideo({ ...currentVideo, videoId: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={currentVideo?.title} onChange={(e) => setCurrentVideo({ ...currentVideo, title: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">Description</Label>
              <Textarea id="description" value={currentVideo?.description} onChange={(e) => setCurrentVideo({ ...currentVideo, description: e.target.value })} className="col-span-3" rows={3} />
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
          <DialogHeader><DialogTitle>Are you sure?</DialogTitle><DialogDescription>This will permanently delete the video "{videoToDelete?.title}".</DialogDescription></DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageYouTube;