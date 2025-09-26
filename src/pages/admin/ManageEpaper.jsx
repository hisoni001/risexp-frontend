import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash2, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { EpaperContext } from '@/contexts/EpaperContext';
import { Link } from 'react-router-dom';

const ManageEpaper = () => {
  const { epapers, addEpaper, updateEpaper, deleteEpaper } = useContext(EpaperContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEpaper, setCurrentEpaper] = useState(null);
  const [epaperToDelete, setEpaperToDelete] = useState(null);

  const openNewDialog = () => {
    setCurrentEpaper({ date: '', image: '', fileUrl: 'https://horizons-cdn.hostinger.com/6fc8a877-4e24-451e-9b63-cc8d5682d748/sample-epaper.pdf' });
    setIsDialogOpen(true);
  };

  const openEditDialog = (epaper) => {
    setCurrentEpaper(epaper);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (epaper) => {
    setEpaperToDelete(epaper);
    setIsDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentEpaper.date || !currentEpaper.image || !currentEpaper.fileUrl) {
      toast({ title: "Validation Error", description: "All fields are required.", variant: "destructive" });
      return;
    }
    if (currentEpaper.id) {
      updateEpaper(currentEpaper);
      toast({ title: "Success", description: "E-Paper updated successfully." });
    } else {
      addEpaper(currentEpaper);
      toast({ title: "Success", description: "E-Paper added successfully." });
    }
    setIsDialogOpen(false);
    setCurrentEpaper(null);
  };

  const handleDeleteConfirm = () => {
    deleteEpaper(epaperToDelete.id);
    toast({ title: "Success", description: "E-Paper deleted successfully." });
    setIsDeleteDialogOpen(false);
    setEpaperToDelete(null);
  };

  return (
    <>
      <Helmet>
        <title>Manage E-Paper - RISE XP Admin</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="icon"><ArrowLeft /></Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <FileText className="mr-4" /> Manage E-Paper
              </h1>
            </div>
            <Button onClick={openNewDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New E-Paper
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 grid grid-cols-3 font-bold bg-gray-50 border-b">
              <div>Date</div>
              <div>File URL</div>
              <div>Actions</div>
            </div>
            {epapers.map(epaper => (
              <div key={epaper.id} className="p-4 grid grid-cols-3 items-center border-b last:border-b-0 hover:bg-gray-50">
                <div className="font-medium">{epaper.date}</div>
                <div className="text-sm text-gray-500 truncate">{epaper.fileUrl}</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => openEditDialog(epaper)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(epaper)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentEpaper?.id ? 'Edit E-Paper' : 'Add New E-Paper'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input id="date" type="text" placeholder="e.g., September 26, 2025" value={currentEpaper?.date} onChange={(e) => setCurrentEpaper({ ...currentEpaper, date: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Image Desc.</Label>
              <Input id="image" placeholder="Front page of newspaper" value={currentEpaper?.image} onChange={(e) => setCurrentEpaper({ ...currentEpaper, image: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fileUrl" className="text-right">File URL</Label>
              <Input id="fileUrl" value={currentEpaper?.fileUrl} onChange={(e) => setCurrentEpaper({ ...currentEpaper, fileUrl: e.target.value })} className="col-span-3" />
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
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This will permanently delete the E-Paper for {epaperToDelete?.date}.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageEpaper;