import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { api } from '../services/api';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-1',
  role: 'model',
  text: 'Bonjour ! Je suis l’assistant Univers Habakuk Digital Pro. Posez-moi vos questions sur nos 17 applications, nos services sur mesure, les commandes ou nos coordonnées.'
};

const QUICK_QUESTIONS = [
  'Quelles applications proposez-vous ?',
  'Comment commander une application ?',
  'Comment suivre ma commande ?',
  'Quels sont vos contacts ?'
];

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(
    'SESS-' + Date.now().toString().slice(-6) + '-' + Math.random().toString(36).substring(2, 5).toUpperCase()
  );

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const sendMessage = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      text: trimmed
    };

    const historyPayload = messages
      .filter((m) => m.id !== INITIAL_MESSAGE.id)
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const result = await api.sendChatMessage(trimmed, historyPayload, sessionIdRef.current);

    const botMsg: ChatMessage = {
      id: 'bot-' + Date.now(),
      role: 'model',
      text:
        result.success && result.reply
          ? result.reply
          : result.error || 'Désolé, une erreur est survenue. Veuillez réessayer.'
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Window Panel (positioned above bottom-right icon so it only covers when intentionally opened) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Assistant client Univers Habakuk"
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[370px] max-h-[70vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-[#DCE9E0] overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#0B5D32] text-white flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#168447] border border-white/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-heading font-bold text-xs sm:text-sm truncate">
                  Assistant Univers Habakuk
                </p>
                <p className="text-[11px] text-[#C9F0D5] truncate">
                  Réponses basées sur nos services & catalogue
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer l’assistant"
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#F7FBF8]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#168447] text-white rounded-br-sm shadow-xs'
                      : 'bg-white text-[#173528] border border-[#DCE9E0] rounded-bl-sm shadow-2xs'
                  }`}
                >
                  {msg.text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/__(.*?)__/g, '$1')}
                </div>
              </div>
            ))}

            {/* Quick Suggestions on first turn */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-1 flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendMessage(q)}
                    className="text-left px-2.5 py-1.5 text-[11px] font-medium text-[#0B5D32] bg-[#E8F5EC] hover:bg-[#C9F0D5] border border-[#C9F0D5] rounded-lg transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2 rounded-2xl rounded-bl-sm bg-white border border-[#DCE9E0] text-xs text-[#64756B] flex items-center gap-2 shadow-2xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#168447]" />
                  <span>Recherche de la réponse...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-2.5 bg-white border-t border-[#DCE9E0] flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#DCE9E0] bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447] text-[#173528] placeholder:text-[#64756B]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Envoyer le message"
              className="p-2.5 rounded-xl bg-[#168447] hover:bg-[#0B5D32] disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Compact Floating Icon Button (bottom-right, unobtrusive so it never blocks text readability) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Fermer le chatbot' : 'Ouvrir le chatbot assistant'}
        title="Assistant Univers Habakuk"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 rounded-full bg-[#168447] hover:bg-[#0B5D32] text-white shadow-lg hover:shadow-xl ring-4 ring-white/85 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>
    </>
  );
};
