import React from 'react';
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
    text: string
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({text}) => {
    return <div className="markdown-body">
        <ReactMarkdown rehypePlugins={[rehypeHighlight, remarkGfm]}>{text}</ReactMarkdown>
    </div>
}

export default MarkdownViewer;