import { useState } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { Textarea } from "./ui/textarea";

const MarkdownRenderer = () => {
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="flex justify-center max-w-screen-lg gap-2 m-auto">
      <Textarea
        className="w-[50%] p-6 overflow-visible font-mono resize-none bg-inherit h-[700px]"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Enter Some Markdown"
      />
      <Markdown
        rehypePlugins={[rehypeHighlight]}
        className="p-6 overflow-auto prose-sm prose border w-[50%] dark:prose-invert max-h-[700px] rounded-md"
      >
        {markdown}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;
