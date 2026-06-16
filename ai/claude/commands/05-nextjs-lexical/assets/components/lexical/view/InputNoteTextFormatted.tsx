import parse from 'html-react-parser';

type Props = {
  content: string;
};

export default function InputNoteTextFormatted({ content }: Props) {
  return (
    <div className="prose prose-sm max-w-none">
      {parse(content)}
    </div>
  );
}
