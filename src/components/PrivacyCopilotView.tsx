import React, { useState } from 'react';
import { PrivacyScanResult } from '../types';
import { Bot, Send, User, Sparkles, ShieldCheck } from 'lucide-react';

interface CopilotProps {
  currentScan: Partial<PrivacyScanResult> | null;
  setCurrentScan: React.Dispatch<React.SetStateAction<Partial<PrivacyScanResult> | null>>;
}

export const PrivacyCopilotView: React.FC<CopilotProps> = ({ currentScan, setCurrentScan }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: 'Hello! I am Privacy Copilot. Tell me what you want to protect or customize in your image (e.g. "Protect all background people", "Blur license plates", "Keep my face clear").',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const cmd = textToSend || input;
    if (!cmd.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: cmd }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/v1/assistant/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd, currentScan }),
      });
      const data = await res.json();

      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply || 'Command executed.' }]);

      if (data.updatedRiskScore !== undefined && currentScan) {
        setCurrentScan((prev) => ({ ...prev, riskScore: data.updatedRiskScore }));
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Sorry, I encountered an issue executing that command.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'Protect all background people',
    'Keep my face clear',
    'Blur all license plates',
    'Make this image safe for LinkedIn',
    'Why is my privacy score high?',
  ];

  return (
    <div className="space-y-6 py-2 max-w-4xl mx-auto">
      <div className="bg-white border-2 border-slate-200 rounded-[32px] p-6 space-y-4 shadow-sm">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Privacy Copilot Agent</h2>
            <p className="text-xs text-slate-500 font-medium">Natural Language Intent Parser &amp; Autonomous Privacy Tool Planner</p>
          </div>
        </div>

        {/* Chat History */}
        <div className="space-y-3 max-h-[380px] overflow-y-auto p-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl text-xs font-medium max-w-md ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                    : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>

              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="text-xs text-indigo-600 font-bold flex items-center space-x-2">
              <Sparkles className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Copilot parsing intent &amp; planning tool operations...</span>
            </div>
          )}
        </div>

        {/* Quick Sample Prompts */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] font-bold bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 px-3 py-1.5 rounded-full transition-all cursor-pointer"
            >
              "{p}"
            </button>
          ))}
        </div>

        {/* Command Input Box */}
        <div className="flex items-center space-x-2 pt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your privacy instruction (e.g. 'Blur license plates')..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-full px-5 py-3 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSend()}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-indigo-200 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
