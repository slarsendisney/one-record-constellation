import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

const theme = {
  ...okaidia,
  'pre[class*="language-"]': {
    backgroundColor: "#052035",
    maxHeight: "23rem",
    margin: "0",
    overflow: "auto",
  },
};

type SupportedLanguage = "bash" | "tsx";
type LanguageOption = { code: string; label: string; value: SupportedLanguage };
type CodeBlockProps = {
  initialLanguageIndex?: number;
  isExecuting?: boolean;
  isRequestDisabled?: boolean;
  languages: LanguageOption[];
  noHeader?: boolean;
  onExecute?: () => void;
};

export function CodeBlock({
  initialLanguageIndex = 0,
  isExecuting = false,
  isRequestDisabled = false,
  languages,
  noHeader = false,
  onExecute,
}: CodeBlockProps) {
  const [languageIndex, setLanguageIndex] = useState(initialLanguageIndex);

  return (
    <div className="flex flex-col bg-[#052035] rounded-xl">
      {!noHeader && (
        <div className="flex items-center border-b-[1px] border-b-[rgba(255, 255, 255, 0.2)] pt-1">
          {languages.map(({ label, value }, i) => (
            <button
              className={`text-white p-2 mr-1 border-b-[1px] ${
                languages[languageIndex].value === value
                  ? "border-b-white"
                  : "border-b-[#052035]"
              }`}
              key={value}
              onClick={() => setLanguageIndex(i)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <div className="flex p-2 text-sm">
        <SyntaxHighlighter
          language={languages[languageIndex].value}
          showLineNumbers={true}
          style={theme}
        >
          {languages[languageIndex].code}
        </SyntaxHighlighter>
      </div>
      {onExecute && (
        <div className="flex flex-row-reverse p-2 border-t-[1px] border-t-[rgba(255, 255, 255, 0.2)]">
          <button
            className="bg-one-record-blue-100 px-4 rounded-md hover:opacity-60"
            // isLoading={isExecuting}
            disabled={isRequestDisabled}
            onClick={onExecute}
          >
            Run the request
          </button>
        </div>
      )}
    </div>
  );
}
