import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHighlightedText } from 'store/reducers/exam';

const TextHighlighter = ({ children, allowedHighlight = true }) => {
  const dispatch = useDispatch();
  const [highlightedText, setHighlightedText] = useState('');

  // Function to escape special characters in the selected text
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters for RegExp
  };

  const handleTextSelection = () => {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText && allowedHighlight) {
      dispatch(addHighlightedText(selectedText));
      setHighlightedText(escapeRegExp(selectedText)); // Escape the selected text for use in RegExp
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('touchend', handleTextSelection);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('touchend', handleTextSelection);
    };
  }, [dispatch, allowedHighlight]);

  // Function to wrap the highlighted text with styles
  const renderHighlightedText = (text) => {
    // Ensure the text is a string before processing
    if (typeof text !== 'string') return text;

    if (highlightedText && text.includes(highlightedText)) {
      return (
        <>
          {text.split(new RegExp(`(${highlightedText})`, 'gi')).map((part, index) =>
            part === highlightedText ? (
              <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold', textDecoration: 'underline' }}>
                {part}
              </span>
            ) : (
              part
            )
          )}
        </>
      );
    }
    return text;
  };

  return <div>{renderHighlightedText(children)}</div>;
};

export default TextHighlighter;
