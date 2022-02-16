import { nanoid } from 'nanoid';

export default function MultiLineText({ text, sectionClassName, textClassName }) {
    return (
        <div className={sectionClassName}>
            {text.split('\n').map((string) => (
                <p className={textClassName} key={`text-${nanoid()}`}>
                    {string}
                </p>
            ))}
        </div>
    );
}
