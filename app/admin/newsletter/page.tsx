"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import TiptapEditor from "@/components/admin/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, Eye, Newspaper, CheckCircle } from "lucide-react";

interface Newsletter {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: any;
  published: boolean;
  created_at: string;
}

export default function NewsletterPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");
  const supabase = createClient();

  const [form, setForm] = useState({
    slug: "",
    title: "",
    date: "",
    excerpt: "",
    content: { type: "doc", content: [{ type: "paragraph" }] },
    published: false,
  });

  useEffect(() => {
    loadNewsletters();
  }, []);

  const loadNewsletters = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("newsletters")
      .select("*")
      .order("date", { ascending: false });
    
    if (data) {
      setNewsletters(data);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    const payload = {
      slug: form.slug,
      title: form.title,
      date: form.date,
      excerpt: form.excerpt,
      content: form.content,
      published: form.published,
    };

    let result;
    if (selectedNewsletter) {
      result = await supabase.from("newsletters").update(payload).eq("id", selectedNewsletter.id);
    } else {
      result = await supabase.from("newsletters").insert(payload);
    }

    if (!result.error) {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
      setIsDialogOpen(false);
      setSelectedNewsletter(null);
      setForm({
        slug: "",
        title: "",
        date: "",
        excerpt: "",
        content: { type: "doc", content: [{ type: "paragraph" }] },
        published: false,
      });
      loadNewsletters();
    } else {
      setSaveStatus("idle");
      alert("Failed to save. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this newsletter?")) {
      await supabase.from("newsletters").delete().eq("id", id);
      loadNewsletters();
    }
  };

  const handleTogglePublish = async (newsletter: Newsletter) => {
    await supabase
      .from("newsletters")
      .update({ published: !newsletter.published })
      .eq("id", newsletter.id);
    loadNewsletters();
  };

  const openDialog = (newsletter?: Newsletter) => {
    if (newsletter) {
      setSelectedNewsletter(newsletter);
      setForm({
        slug: newsletter.slug,
        title: newsletter.title,
        date: newsletter.date,
        excerpt: newsletter.excerpt,
        content: newsletter.content,
        published: newsletter.published,
      });
    } else {
      setSelectedNewsletter(null);
      setForm({
        slug: "",
        title: "",
        date: new Date().toISOString().split("T")[0],
        excerpt: "",
        content: { type: "doc", content: [{ type: "paragraph" }] },
        published: false,
      });
    }
    setIsDialogOpen(true);
  };

  const openPreview = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter);
    setIsPreviewOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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
          <h1 className="text-2xl font-bold text-stone-900">Newsletter</h1>
          <p className="text-stone-600 mt-1">Create and manage newsletter issues.</p>
        </div>
        <Button onClick={() => openDialog()} className="bg-stone-800 hover:bg-stone-700">
          <Plus className="mr-2 h-4 w-4" />
          New Issue
        </Button>
      </div>

      <div className="grid gap-4">
        {newsletters.map((newsletter) => (
          <Card key={newsletter.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Newspaper className="h-4 w-4 text-stone-400" />
                    <span className="text-sm text-stone-500">{formatDate(newsletter.date)}</span>
                    {newsletter.published ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Draft
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-stone-900">{newsletter.title}</h3>
                  <p className="text-sm text-stone-500 mt-1 line-clamp-2">{newsletter.excerpt}</p>
                  <p className="text-xs text-stone-400 mt-1">/{newsletter.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openPreview(newsletter)}
                    title="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openDialog(newsletter)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(newsletter.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTogglePublish(newsletter)}
                >
                  {newsletter.published ? "Unpublish" : "Publish"}
                </Button>
                <a
                  href={`/newsletter/${newsletter.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                >
                  View on Site
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {newsletters.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          No newsletters yet. Click "New Issue" to create one.
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedNewsletter ? "Edit Newsletter" : "New Newsletter Issue"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Newsletter title"
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="january-2025"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="Brief summary..."
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <TiptapEditor
                content={JSON.stringify(form.content)}
                onChange={(content) => setForm({ ...form, content })}
                placeholder="Write your newsletter content..."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded border-stone-300"
              />
              <Label htmlFor="published" className="cursor-pointer">Publish immediately</Label>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="bg-stone-800 hover:bg-stone-700"
              >
                {saveStatus === "saving" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : saveStatus === "success" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Saved!
                  </>
                ) : (
                  "Save Newsletter"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview: {selectedNewsletter?.title}</DialogTitle>
          </DialogHeader>
          <div className="pt-4 prose prose-stone max-w-none">
            <p className="text-sm text-stone-500">
              {selectedNewsletter && formatDate(selectedNewsletter.date)}
            </p>
            <p className="text-lg text-stone-600 italic">{selectedNewsletter?.excerpt}</p>
            <hr className="my-6" />
            {/* Render content would go here - simplified for now */}
            <pre className="text-xs bg-stone-100 p-4 rounded overflow-auto">
              {JSON.stringify(selectedNewsletter?.content, null, 2)}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
