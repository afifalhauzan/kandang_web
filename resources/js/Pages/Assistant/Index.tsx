import MvpLayout from "@/Pages/_MvpLayout";
import { useMemo, useState } from "react";

type ChatMessage = {
    id: number;
    role: string;
    content: string;
};

type ChatSession = {
    id: number;
    title: string | null;
    messages: ChatMessage[];
};

type AssistantProps = {
    sessions: ChatSession[];
};

type LocalMessage = {
    role: "user" | "assistant";
    content: string;
};

export default function AssistantIndex({ sessions }: AssistantProps) {
    const [input, setInput] = useState("");
    const [localMessages, setLocalMessages] = useState<LocalMessage[]>([]);

    const latestSessionMessages = useMemo<LocalMessage[]>(() => {
        const firstSession = sessions[0];
        if (!firstSession) return [];

        return firstSession.messages.map((message) => ({
            role: message.role === "assistant" ? "assistant" : "user",
            content: message.content,
        }));
    }, [sessions]);

    const displayedMessages = localMessages.length > 0 ? localMessages : latestSessionMessages;

    return (
        <MvpLayout title="Assistant">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Assistant (Chat UI Sederhana)</h2>
                <p className="text-sm text-slate-600">Ini UI mock untuk sprint 1. Integrasi LLM bisa ditambahkan setelah CRUD stabil.</p>

                <div className="rounded border bg-white p-4">
                    <div className="mb-3 h-72 overflow-y-auto rounded border bg-slate-50 p-3">
                        {displayedMessages.map((message, index) => (
                            <div key={index} className={`mb-2 rounded px-3 py-2 text-sm ${message.role === "assistant" ? "bg-blue-100" : "bg-emerald-100"}`}>
                                <strong>{message.role}:</strong> {message.content}
                            </div>
                        ))}
                        {displayedMessages.length === 0 && <div className="text-sm text-slate-500">Belum ada pesan.</div>}
                    </div>

                    <form
                        className="flex gap-2"
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (!input.trim()) return;

                            setLocalMessages((previous) => [
                                ...previous,
                                { role: "user", content: input },
                                { role: "assistant", content: "[Mock reply] Saran awal: cek kesehatan, pakan, dan cuaca hari ini." },
                            ]);
                            setInput("");
                        }}
                    >
                        <input className="flex-1 rounded border p-2" placeholder="Tulis pertanyaan konsultasi ternak..." value={input} onChange={(event) => setInput(event.target.value)} />
                        <button className="rounded bg-emerald-600 px-4 py-2 text-white" type="submit">
                            Kirim
                        </button>
                    </form>
                </div>
            </div>
        </MvpLayout>
    );
}
