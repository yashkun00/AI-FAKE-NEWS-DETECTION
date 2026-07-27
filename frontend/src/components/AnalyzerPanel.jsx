import React, { useRef, useState } from "react";
import { FileText, Link2, ImageIcon, UploadCloud, ScanSearch, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MAX_TEXT_LENGTH = 5000;

export default function AnalyzerPanel({ onSubmit, loading }) {
  const [tab, setTab] = useState("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  function handleFileChange(selected) {
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  function clearFile() {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFileChange(dropped);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (tab === "text" && text.trim()) onSubmit("text", text.trim());
    if (tab === "url" && url.trim()) onSubmit("url", url.trim());
    if (tab === "image" && file) onSubmit("image", file);
  }

  const isDisabled =
    loading ||
    (tab === "text" && !text.trim()) ||
    (tab === "url" && !url.trim()) ||
    (tab === "image" && !file);

  return (
    <Card className="border-base-line/80">
      <form onSubmit={handleSubmit} className="p-5">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="text">
              <FileText className="h-4 w-4" /> Text
            </TabsTrigger>
            <TabsTrigger value="url">
              <Link2 className="h-4 w-4" /> URL
            </TabsTrigger>
            <TabsTrigger value="image">
              <ImageIcon className="h-4 w-4" /> Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text">
            <Textarea
              rows={7}
              maxLength={MAX_TEXT_LENGTH}
              placeholder="Paste an article, headline, or claim to verify..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-1.5 text-right font-mono text-[11px] text-signal-muted">
              {text.length} / {MAX_TEXT_LENGTH}
            </div>
          </TabsContent>

          <TabsContent value="url">
            <Input
              type="url"
              placeholder="https://example.com/news-article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <p className="mt-2 font-mono text-[11px] text-signal-muted">
              The article will be fetched and analyzed directly from the source.
            </p>
          </TabsContent>

          <TabsContent value="image">
            {!preview ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-base-line bg-base/40 px-6 py-10 text-center transition-colors hover:border-signal-cyan/60"
              >
                <UploadCloud className="h-8 w-8 text-signal-muted" strokeWidth={1.5} />
                <div>
                  <p className="text-sm text-signal-text/90">
                    Drop an image, or click to browse
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-signal-muted">
                    Screenshots, memes, or photos containing text claims
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
                />
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-md border border-base-line">
                <img src={preview} alt="Selected upload preview" className="max-h-72 w-full object-contain bg-black/40" />
                <button
                  type="button"
                  onClick={clearFile}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-signal-text hover:bg-signal-red/80"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="truncate border-t border-base-line bg-base-raised px-3 py-1.5 font-mono text-[11px] text-signal-muted">
                  {file?.name}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Button type="submit" disabled={isDisabled} className="mt-5 w-full">
          <ScanSearch className="h-4 w-4" />
          {loading ? "Scanning..." : "Run scan"}
        </Button>
      </form>
    </Card>
  );
}
