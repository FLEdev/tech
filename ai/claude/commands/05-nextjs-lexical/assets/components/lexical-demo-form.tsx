'use client';

import { useRef } from 'react';
import LexicalTextarea, { type LexicalTextareaRef } from '@/components/lexical-textarea';

export default function LexicalDemoForm() {
  const lexicalRef = useRef<LexicalTextareaRef>(null);

  const inputLexicalDemoFormAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = lexicalRef.current?.getContent();
    console.log('Form submitted with content:', content);
  };

  return (
    <form onSubmit={inputLexicalDemoFormAction} className="flex flex-col gap-2 mx-auto max-w-md mt-10 min-w-xl" id="note--form">
      <LexicalTextarea ref={lexicalRef} content={''} />
      <button type="submit" id="form--submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Note
      </button>
    </form>
  );
}
