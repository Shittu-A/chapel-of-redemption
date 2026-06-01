"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, Shield, User } from "lucide-react";

interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  role: "admin" | "super_admin";
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const supabase = createClient();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "admin" as "admin" | "super_admin",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("admins")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) {
      setUsers(data);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (selectedUser) {
      // Update existing user role
      await supabase
        .from("admins")
        .update({ role: form.role })
        .eq("id", selectedUser.id);
    } else {
      // Create new user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        alert("Failed to create user: " + authError.message);
        return;
      }

      if (authData.user) {
        await supabase.from("admins").insert({
          user_id: authData.user.id,
          email: form.email,
          role: form.role,
        });
      }
    }

    setIsDialogOpen(false);
    setSelectedUser(null);
    setForm({ email: "", password: "", role: "admin" });
    loadUsers();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this admin user?")) {
      await supabase.from("admins").delete().eq("id", id);
      loadUsers();
    }
  };

  const openDialog = (user?: AdminUser) => {
    if (user) {
      setSelectedUser(user);
      setForm({
        email: user.email,
        password: "",
        role: user.role,
      });
    } else {
      setSelectedUser(null);
      setForm({ email: "", password: "", role: "admin" });
    }
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">User Management</h1>
          <p className="text-stone-600 mt-1">Manage admin users and permissions.</p>
        </div>
        <Button onClick={() => openDialog()} className="bg-stone-800 hover:bg-stone-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-stone-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-stone-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-stone-500" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-900">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "super_admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role === "super_admin" ? "Super Admin" : "Admin"}
                      </span>
                      <span className="text-xs text-stone-500">
                        Added {formatDate(user.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openDialog(user)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {users.length === 0 && (
            <div className="text-center py-8 text-stone-500">
              No admin users found. Click "Add Admin" to create one.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedUser ? "Edit User" : "Add Admin User"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@example.com"
                disabled={!!selectedUser}
              />
            </div>
            {!selectedUser && (
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label>Role</Label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as "admin" | "super_admin" })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
              <p className="text-xs text-stone-500">
                Super Admins can manage other users and access all settings.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-stone-800 hover:bg-stone-700">
                {selectedUser ? "Update User" : "Create User"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
