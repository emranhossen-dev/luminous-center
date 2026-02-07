"use client";

import { useCallback, useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

function getLanguage(filename: string): string {
  if (filename.endsWith(".html")) return "html";
  if (filename.endsWith(".css")) return "css";
  if (filename.endsWith(".js")) return "javascript";
  return "plaintext";
}

function parseTitleFromHtml(html: string): string {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : "";
}

interface PlaygroundProps {
  courseSlug: string;
  homeworkId: string;
  userId: string;
  userName: string;
  userEmail: string;
  initialFiles: Record<string, string>;
}

export default function Playground({
  courseSlug,
  homeworkId,
  userId,
  userName,
  userEmail,
  initialFiles,
}: PlaygroundProps) {
  const [files, setFiles] = useState<Record<string, string>>(initialFiles);
  const [activeFile, setActiveFile] = useState<string | null>(Object.keys(initialFiles)[0] ?? null);
  const [previewMode, setPreviewMode] = useState<"run" | "live">("live");
  const [runSnapshot, setRunSnapshot] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string>("");
  const [editingFileName, setEditingFileName] = useState<string | null>(null);
  const [editingNameValue, setEditingNameValue] = useState("");
  const renameInputRef = useRef<HTMLInputElement>(null);
  const untitledCounterRef = useRef(0);

  const fileList = useMemo(() => Object.keys(files).sort(), [files]);
  const previewHtml = useMemo(() => {
    const htmlKey = Object.keys(files).find((k) => k.endsWith(".html"));
    const cssKey = Object.keys(files).find((k) => k.endsWith(".css"));
    const jsKey = Object.keys(files).find((k) => k.endsWith(".js"));
    const html = (htmlKey && files[htmlKey]) ?? "";
    const css = (cssKey && files[cssKey]) ?? "";
    const js = (jsKey && files[jsKey]) ?? "";
    const injectCss = css ? `<style>${css}</style>` : "";
    const injectJs = js ? `<script>${js}</script>` : "";
    const doc = html.replace("</head>", injectCss + "</head>").replace("</body>", injectJs + "</body>");
    if (!doc.includes("</body>")) return doc + injectCss + injectJs;
    return doc;
  }, [files]);
  const previewTitle = useMemo(() => parseTitleFromHtml(previewHtml), [previewHtml]);

  useEffect(() => {
    if (editingFileName && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [editingFileName]);

  const getPreviewHtml = useCallback(() => previewHtml, [previewHtml]);

  const updateFile = useCallback((name: string, content: string) => {
    setFiles((prev) => ({ ...prev, [name]: content }));
  }, []);

  const addFile = useCallback(() => {
    untitledCounterRef.current += 1;
    const name = `Untitled-${untitledCounterRef.current}`;
    setFiles((prev) => ({ ...prev, [name]: "" }));
    setActiveFile(name);
    setEditingFileName(name);
    setEditingNameValue(name);
  }, []);

  const deleteFile = useCallback((name: string) => {
    if (fileList.length <= 1) return;
    setFiles((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    if (activeFile === name) {
      const rest = fileList.filter((f) => f !== name);
      setActiveFile(rest[0] ?? null);
    }
    if (editingFileName === name) setEditingFileName(null);
  }, [fileList, activeFile, editingFileName]);

  const applyRename = useCallback(() => {
    if (!editingFileName) return;
    const newName = editingNameValue.trim();
    if (!newName || newName === editingFileName) {
      setEditingFileName(null);
      return;
    }
    const validExt = newName.endsWith(".html") || newName.endsWith(".css") || newName.endsWith(".js");
    if (!validExt) {
      setEditingNameValue(editingFileName);
      return;
    }
    if (fileList.includes(newName) && newName !== editingFileName) {
      setEditingNameValue(editingFileName);
      return;
    }
    setFiles((prev) => {
      const next = { ...prev };
      next[newName] = next[editingFileName] ?? "";
      delete next[editingFileName];
      return next;
    });
    if (activeFile === editingFileName) setActiveFile(newName);
    setEditingFileName(null);
  }, [editingFileName, editingNameValue, fileList, activeFile]);

  const handleRenameKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") applyRename();
      if (e.key === "Escape") setEditingFileName(null);
    },
    [applyRename]
  );

  const handleRun = useCallback(() => {
    setRunSnapshot(getPreviewHtml());
    setPreviewMode("run");
  }, [getPreviewHtml]);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setSubmitStatus("idle");
    setSubmitError("");
    try {
      const res = await fetch("/api/homework/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          homeworkId,
          userId,
          userName,
          userEmail,
          files,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitStatus("error");
        setSubmitError(data.error || "Submit failed");
        return;
      }
      setSubmitStatus("success");
    } catch (e) {
      setSubmitStatus("error");
      setSubmitError(e instanceof Error ? e.message : "Network error");
    } finally {
      setSubmitting(false);
    }
  }, [courseSlug, homeworkId, userId, userName, userEmail, files]);

  const runBlobUrl = useMemo(() => {
    if (typeof window === "undefined" || !runSnapshot) return "";
    const blob = new Blob([runSnapshot], { type: "text/html" });
    return URL.createObjectURL(blob);
  }, [runSnapshot]);

  const handleEditorMount = useCallback((_editor: unknown, monaco: unknown) => {
    if (typeof window === "undefined" || !monaco) return;
    import("emmet-monaco-es")
      .then(({ emmetHTML, emmetCSS, emmetJSX }) => {
        emmetHTML(monaco as Parameters<typeof emmetHTML>[0], ["html"]);
        emmetCSS(monaco as Parameters<typeof emmetCSS>[0], ["css"]);
        emmetJSX(monaco as Parameters<typeof emmetJSX>[0], ["javascript"]);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex-1 flex min-h-0">
      {/* Left: File explorer - VS Code style: + creates Untitled, inline rename */}
      <div className="w-52 flex-shrink-0 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-2 border-b border-gray-700 flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Explorer</span>
          <button
            type="button"
            onClick={addFile}
            className="p-1 rounded text-gray-400 hover:bg-gray-700 hover:text-white"
            title="New File"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <ul className="flex-1 overflow-y-auto py-1">
          {fileList.map((name) => (
            <li key={name} className="group flex items-center min-w-0">
              {editingFileName === name ? (
                <input
                  ref={renameInputRef}
                  type="text"
                  value={editingNameValue}
                  onChange={(e) => setEditingNameValue(e.target.value)}
                  onBlur={applyRename}
                  onKeyDown={handleRenameKeyDown}
                  className="flex-1 min-w-0 px-2 py-1.5 text-sm bg-gray-700 text-white rounded border border-indigo-500 outline-none"
                  placeholder="filename.html"
                />
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveFile(name)}
                    className={`flex-1 min-w-0 text-left px-3 py-2 text-sm truncate ${
                      activeFile === name ? "bg-indigo-600/30 text-indigo-300" : "text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {name}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingFileName(name);
                      setEditingNameValue(name);
                    }}
                    className="p-1.5 text-gray-500 hover:text-amber-400 opacity-0 group-hover:opacity-100"
                    title="Rename"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  {fileList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => deleteFile(name)}
                      className="p-1.5 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100"
                      title="Delete"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        {fileList.length === 0 && (
          <div className="px-3 py-4 text-xs text-gray-500 text-center">
            Click + to create a file.<br />Rename to .html, .css or .js
          </div>
        )}
      </div>

      {/* Middle: Editor */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex-1 min-h-0">
          {activeFile !== null ? (
            <MonacoEditor
              height="100%"
              language={getLanguage(activeFile)}
              value={files[activeFile] ?? ""}
              onChange={(value) => updateFile(activeFile, value ?? "")}
              theme="vs-dark"
              onMount={handleEditorMount}
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                wordWrap: "on",
                formatOnPaste: true,
                formatOnType: true,
                tabSize: 2,
                insertSpaces: true,
                automaticLayout: true,
                quickSuggestions: true,
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnCommitCharacter: true,
                tabCompletion: "on",
              }}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-900 text-gray-500 text-sm">
              <div className="text-center">
                <p>No file open.</p>
                <p className="mt-2 text-gray-600">Click + in the explorer to create a new file.</p>
                <p className="mt-1 text-gray-600">Rename it to .html, .css or .js to get syntax highlighting.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Preview (with title) + Submit */}
      <div className="w-[420px] flex-shrink-0 bg-gray-800 border-l border-gray-700 flex flex-col">
        <div className="p-2 border-b border-gray-700 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewMode("live")}
            className={`px-3 py-1.5 text-sm rounded ${previewMode === "live" ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-gray-700"}`}
          >
            Live Preview
          </button>
          <button
            type="button"
            onClick={handleRun}
            className={`px-3 py-1.5 text-sm rounded ${previewMode === "run" ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-gray-700"}`}
          >
            Run
          </button>
        </div>
        {previewTitle && (
          <div className="px-3 py-1.5 bg-gray-700/50 border-b border-gray-700 text-xs text-gray-400 truncate" title={previewTitle}>
            <span className="text-gray-500">Title:</span> {previewTitle}
          </div>
        )}
        <div className="flex-1 min-h-0 bg-white rounded-tl overflow-hidden flex flex-col">
          <iframe
            key={previewMode === "live" ? "live" : runBlobUrl}
            src={previewMode === "live" ? undefined : runBlobUrl}
            srcDoc={previewMode === "live" ? previewHtml : undefined}
            title={previewTitle || "Preview"}
            className="w-full flex-1 min-h-0 border-0 bg-white"
            sandbox="allow-scripts"
          />
        </div>
        <div className="p-3 border-t border-gray-700 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Homework"}
          </button>
          {submitStatus === "success" && (
            <p className="text-sm text-green-400 text-center">Submitted successfully.</p>
          )}
          {submitStatus === "error" && submitError && (
            <p className="text-sm text-red-400 text-center break-words" title={submitError}>
              {submitError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
