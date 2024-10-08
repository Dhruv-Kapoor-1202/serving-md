import { useState } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";

const MarkdownRenderer = () => {
  const [markdown, setMarkdown] = useState("");

  const downloadFile = () => {
    const link = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    link.href = URL.createObjectURL(file);
    link.download = "Untitled.md";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-screen-lg gap-2 m-auto sm:flex-row">
      <div className="relative w-full h-full max-w-md sm:max-w-full  sm:w-[50%] min-h-[350px] sm:h-[650px]">
        <Textarea
          className="w-full min-h-[350px]    p-6 overflow-visible font-mono resize-none bg-inherit  sm:h-[650px] no-scrollbar"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Enter Some Markdown"
        />
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={downloadFile}
          disabled={markdown.length === 0}
          className="absolute bg-transparent top-2 right-2 backdrop-blur-sm"
        >
          <DownloadIcon className="size-[1.2rem]" />
        </Button>
      </div>
      <Markdown
        rehypePlugins={[rehypeHighlight]}
        className="p-6 overflow-auto w-full max-w-md sm:max-w-full prose-sm prose border sm:w-[50%] dark:prose-invert  min-h-[350px] sm:h-[650px] rounded-md no-scrollbar"
      >
        {markdown}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;
