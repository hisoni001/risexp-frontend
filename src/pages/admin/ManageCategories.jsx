import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash2, Tags, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { CategoryContext } from '@/contexts/CategoryContext';
import { Link } from 'react-router-dom';

const ManageCategories = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useContext(CategoryContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const openNewCategoryDialog = () => {
    setCurrentCategory({ name: '' });
    setIsDialogOpen(true);
  };

  const openEditCategoryDialog = (category) => {
    setCurrentCategory(category);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (!currentCategory.name) {
      toast({ title: "Validation Error", description: "Category name is required.", variant: "destructive" });
      return;
    }
    if (currentCategory.id) {
      updateCategory(currentCategory);
      toast({ title: "Success", description: "Category updated successfully." });
    } else {
      addCategory(currentCategory.name);
      toast({ title: "Success", description: "Category added successfully." });
    }
    setIsDialogOpen(false);
    setCurrentCategory(null);
  };

  const handleDeleteConfirm = () => {
    deleteCategory(categoryToDelete.id);
    toast({ title: "Success", description: "Category deleted successfully." });
    setIsDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <>
      <Helmet>
        <title>Manage Categories - RISE XP Admin</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="icon"><ArrowLeft /></Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <Tags className="mr-4" /> Manage Categories
              </h1>
            </div>
            <Button onClick={openNewCategoryDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 grid grid-cols-3 font-bold bg-gray-50 border-b">
              <div className="col-span-2">Category Name</div>
              <div>Actions</div>
            </div>
            {categories.map(category => (
              <div key={category.id} className="p-4 grid grid-cols-3 items-center border-b last:border-b-0 hover:bg-gray-50">
                <div className="col-span-2 font-medium">{category.name}</div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => openEditCategoryDialog(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(category)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentCategory?.id ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            <DialogDescription>Enter the name for the category. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={currentCategory?.name} onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleSaveCategory}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone. This will permanently delete the category "{categoryToDelete?.name}".</DialogDescription>
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

export default ManageCategories;