---
name: nextjs-textarea-lexical
description: As a helpfull agent, based on SKILL description, implement Lexical Textarea in the mentioned template file.
user-invocable: true
---

IMPORTANT: Drop previous State, Context and Memory!!!

# Implement 
## import LexicalTextarea, { type LexicalTextareaRef } from './LexicalTextarea';
## const lexicalRef = useRef<LexicalTextareaRef>(null)
## ```
'use client'

const inputNoteFormAction = async (e: React.FormEvent<HTMLFormElement>) => {
 	    e.preventDefault();
 	    const lexicalContent = lexicalRef.current?.getContent();
 	    console.info(lexicalContent);
 }

 <form onSubmit={inputNoteFormAction} className="flex flex-col gap-2 mx-auto max-w-md mt-10 min-w-xl" id="note--form">
        <LexicalTextarea ref={lexicalRef} content={defaultValues?.content}/>
        <button type="submit" id="form--submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Submit </button>
      </form>
```

