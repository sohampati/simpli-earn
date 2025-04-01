interface MessageProps {
    sender: string;
    text: string;
}

export default function Message({ sender, text }: MessageProps) {
    if (sender === 'user') {
        return (
            <div className="w-full flex justify-end mt-5">
                <div className="whitespace-pre-line max-w-[80%] px-3 py-2 bg-white/4 text-white rounded-t-2xl rounded-bl-2xl border-[0.85px] border-white/25">{text}</div>
            </div>
        );
    }
    return (
        <div className="whitespace-pre-line mt-5">
            <p>{text}</p>
        </div>
    );

}
