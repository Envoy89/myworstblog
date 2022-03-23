import React from 'react';
import MdEditor from "react-markdown-editor-lite";

interface MarkdownWriterProps {
    fullText: string,
    handleChangeFullText: (data: {
        text: string;
        html: string;
    }) => void,
    className: string
}

const MarkdownWriter: React.FC<MarkdownWriterProps> = ({ fullText, handleChangeFullText, className }) => {
    return <MdEditor
        renderHTML={text => text}
        value={fullText}
        view={{ menu: false, md: true, html: false }}
        onChange={handleChangeFullText}
        className={className}
    />
}

export default MarkdownWriter;