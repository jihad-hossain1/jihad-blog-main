// import { cn } from "@/lib/utils";
import React from "react";
import Markdown from "react-markdown";
import rehypeLight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.min.css";
import { LuTerminal } from "react-icons/lu";
// import CopyButton from "./CopyButton";
// import { icons } from "./icons";
import { SiJavascript, SiPython, SiReact } from "react-icons/si";

export const icons = {
  js: SiJavascript,
  react: SiReact,
  py: SiPython,
};
import CopyButton from "./CopyButton";
// import { icons } from "lucide-react";

const MarkdownPreview = ({ details, className }) => {
  return (
    <Markdown
      rehypePlugins={[rehypeLight]}
      className={`space-y-6 ${className}`}
      components={{
        h1: ({ node, ...props }) => {
          return <h1 {...props} className="text-3xl font-bold" />;
        },
        h2: ({ node, ...props }) => {
          return <h2 {...props} className="text-2xl font-bold" />;
        },
        h3: ({ node, ...props }) => {
          return <h3 {...props} className="text-xl font-bold" />;
        },
        h4: ({ node, ...props }) => {
          return <h4 {...props} className="text-sm font-bold" />;
        },
        code: ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          const id = (Math.floor(Math.random() * 100) + 1).toString();
          if (match?.length) {
            // let Icon = ;
            let Icon = LuTerminal;
            const isMatch = icons.hasOwnProperty(match[1]);
            if (isMatch) {
              Icon = icons[match[1]];
            }

            return (
              <div className="bg-zinc-900 text-gray-300 rounded-md border">
                <div className="border-b border-zinc-600 p-3 flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-2">
                    <Icon />

                    <p className="text-sm text-gray-400">
                      {
                        // @ts-ignore
                        node?.data?.meta
                      }
                    </p>
                  </div>
                  {/* <CopyButton id={id} /> */}
                </div>

                <div className="overflow-x-auto w-full">
                  <div className="p-4" id={id}>
                    {children}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <code {...props} className="bg-zinc-300 py-[2px] rounded-md px-2">
                {children}
              </code>
            );
          }
        },
      }}
    >
      {details}
    </Markdown>
  );
};

export default MarkdownPreview;
