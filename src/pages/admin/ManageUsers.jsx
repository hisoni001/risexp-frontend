import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Trash2, ArrowLeft, ShieldCheck, ShieldOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { AuthContext } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
  const { users, deleteUser } = useContext(AuthContext);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const openDeleteDialog = (user) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteUser(userToDelete.id);
    toast({ title: "Success", description: "User deleted successfully." });
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  return (
    <>
      <Helmet><title>Manage Users - RISE XP Admin</title></Helmet>
      <div className="min-h-screen bg-gray-100 p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard"><Button variant="outline" size="icon"><ArrowLeft /></Button></Link>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center"><Users className="mr-4" /> Manage Users</h1>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 grid grid-cols-5 font-bold bg-gray-50 border-b">
              <div>Name</div>
              <div className="col-span-2">Email</div>
              <div>Subscription</div>
              <div>Actions</div>
            </div>
            {users.map(user => (
              <div key={user.id} className="p-4 grid grid-cols-5 items-center border-b last:border-b-0 hover:bg-gray-50">
                <div className="font-medium">{user.name}</div>
                <div className="col-span-2 text-sm text-gray-600">{user.email}</div>
                <div>
                  {user.subscribed ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <ShieldCheck className="h-4 w-4 mr-1" /> Premium
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <ShieldOff className="h-4 w-4 mr-1" /> Standard
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(user)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This will permanently delete the user "{userToDelete?.name}". This action cannot be undone.</DialogDescription>
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

export default ManageUsers;