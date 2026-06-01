"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import TiptapEditor from "@/components/admin/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, CheckCircle } from "lucide-react";

interface PageContent {
  id: string;
  page_key: string;
  title: string;
  content: any;
  updated_at: string;
}

const pages = [
  { key: "home", label: "Home Page" },
  { key: "about", label: "About Page" },
  { key: "chad_missions", label: "Chad Missions" },
  { key: "schools", label: "Schools" },
];

export default function ContentPage() {
  const [selectedPage, setSelectedPage] = useState(pages[0].key);
  const [content, setContent] = useState<PageContent | null>(null);
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const supabase = createClient();

  useEffect(() => {
    loadContent();
  }, [selectedPage]);

  const loadContent = async () => {
    setIsLoading(true);
    setSaveStatus("idle");

    const { data } = await supabase
      .from("page_content")
      .select("*")
      .eq("page_key", selectedPage)
      .single();

    if (data) {
      setContent(data);
      setTitle(data.title);
      setEditorContent(data.content);
    } else {
      setContent(null);
      setTitle("");
      setEditorContent({ type: "doc", content: [{ type: "paragraph" }] });
    }

    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    const payload = {
      page_key: selectedPage,
      title,
      content: editorContent,
    };

    let result;
    if (content) {
      result = await supabase
        .from("page_content")
        .update(payload)
        .eq("id", content.id);
    } else {
      result = await supabase.from("page_content").insert(payload).select().single();
    }

    if (result.error) {
      setSaveStatus("error");
    } else {
      setSaveStatus("success");
      if (result.data) {
        setContent(result.data);
      }
      setTimeout(() => setSaveStatus("idle"), 3000);
    }

    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Content Management</h1>
        <p className="text-stone-600 mt-1">Edit page content using the rich text editor.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Page</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {pages.map((page) => (
              <button
                key={page.key}
                onClick={() => setSelectedPage(page.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPage === page.key
                    ? "bg-stone-800 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Edit {pages.find((p) => p.key === selectedPage)?.label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter page title"
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              {editorContent && (
                <TiptapEditor
                  content={JSON.stringify(editorContent)}
                  onChange={setEditorContent}
                  placeholder="Enter page content..."
                />
              )}
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-stone-800 hover:bg-stone-700"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>

              {saveStatus === "success" && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Saved successfully!</span>
                </div>
              )}

              {saveStatus === "error" && (
                <div className="flex items-center gap-2 text-red-600">
                  <span className="text-sm font-medium">Failed to save. Please try again.</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
