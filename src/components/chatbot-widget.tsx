'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, X, Send, Loader2, Bot, User, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const quickQuestions = [
  '¿Cuáles son los clubes disponibles?',
  '¿Cómo solicito una cotización?',
  '¿Qué seguridad ofrecen?',
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '¡Bienvenido a Gincanas Clubes Campestres! Soy su asistente virtual. ¿En qué puedo ayudarle hoy?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response || 'Lo siento, no pude procesar su solicitud. Por favor intente nuevamente.',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Disculpe, hubo un error de conexión. Por favor intente en unos momentos.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold rounded-full shadow-lg shadow-gold/30 flex items-center justify-center hover:bg-gold-dark transition-colors group"
            aria-label="Abrir chat"
          >
            <MessageCircle className="h-6 w-6 text-emerald-dark group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-deep rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ height: 'min(500px, 80vh)' }}
          >
            {/* Header */}
            <div className="bg-emerald-dark text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gold/20 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm">Asistente Gincanas</p>
                  <p className="text-xs text-white/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    En línea
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollBehavior: 'smooth' }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-emerald-deep' : 'bg-gold/20'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <Bot className="h-3.5 w-3.5 text-gold-dark" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-emerald-deep text-white rounded-br-sm'
                        : 'bg-corporate-gray text-corporate-text/80 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3.5 w-3.5 text-gold-dark" />
                  </div>
                  <div className="bg-corporate-gray rounded-xl px-4 py-3 rounded-bl-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-corporate-text/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-corporate-text/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-corporate-text/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-emerald-light/50 text-emerald-dark/70 rounded-full px-3 py-1.5 hover:bg-emerald-light transition-colors border border-emerald-deep/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2 flex-shrink-0">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escriba su consulta..."
                disabled={loading}
                className="flex-1 text-sm h-9"
              />
              <Button
                type="submit"
                disabled={!input.trim() || loading}
                size="icon"
                className="h-9 w-9 bg-emerald-deep hover:bg-emerald-dark flex-shrink-0"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
