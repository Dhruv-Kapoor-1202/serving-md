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
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <div className="flex justify-center w-full max-w-screen-lg gap-2 m-auto">
        <div className="relative w-[50%]">
          <Textarea
            className="w-full p-6 overflow-visible font-mono resize-none bg-inherit h-[650px] no-scrollbar"
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
          className="p-6 overflow-auto prose-sm prose border w-[50%] dark:prose-invert max-h-[650px] rounded-md no-scrollbar"
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  );
};

export default MarkdownRenderer;
