import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Image, PlusCircle, Trash2, ArrowLeft, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ImageContext } from '@/contexts/ImageContext';
import { Link } from 'react-router-dom';

const ImageLibrary = () => {
  const { images, addImage, deleteImage } = useContext(ImageContext);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');

  const handleAddImage = () => {
    if (!newImageUrl || !newImageAlt) {
      toast({ title: "Error", description: "Image URL and Alt Text are required.", variant: "destructive" });
      return;
    }
    addImage({ url: newImageUrl, alt: newImageAlt });
    toast({ title: "Success", description: "Image added to library." });
    setIsAddDialogOpen(false);
    setNewImageUrl('');
    setNewImageAlt('');
  };

  const handleDelete = (imageId) => {
    deleteImage(imageId);
    toast({ title: "Success", description: "Image removed from library." });
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast({ title: "Copied!", description: "Image URL copied to clipboard." });
  };

  return (
    <>
      <Helmet><title>Image Library - RISE XP Admin</title></Helmet>
      <div className="min-h-screen bg-gray-100 p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard"><Button variant="outline" size="icon"><ArrowLeft /></Button></Link>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center"><Image className="mr-4 text-blue-500" /> Image Library</h1>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}><PlusCircle className="mr-2 h-4 w-4" /> Add New Image</Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map(image => (
              <motion.div
                key={image.id}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="group relative border rounded-lg overflow-hidden shadow-sm"
              >
                <img src={image.url} alt={image.alt} className="h-48 w-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <p className="text-white text-xs line-clamp-2">{image.alt}</p>
                  <div className="flex gap-2 justify-end">
                    <Button size="sm" variant="secondary" onClick={() => handleCopyUrl(image.url)}>Copy URL</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(image.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Image</DialogTitle><DialogDescription>Add an image from a URL. For a full-featured CMS, I can implement direct uploads to a service like Supabase Storage.</DialogDescription></DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <Label htmlFor="imageAlt">Alt Text (Description)</Label>
              <Input id="imageAlt" value={newImageAlt} onChange={(e) => setNewImageAlt(e.target.value)} placeholder="A description of the image" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddImage}><Upload className="mr-2 h-4 w-4" /> Add to Library</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageLibrary;