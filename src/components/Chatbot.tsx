import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, SendIcon, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const DEFAULT_MESSAGES = [
  {
    id: '1',
    text: 'Hello! Welcome to AYUSH Herbal Garden. How can I help you today?',
    sender: 'bot' as const,
  },
];

// const QUICK_REPLIES = ['Need Help?', 'Learn About Herbal Garden', 'Speak with Support'];

const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const fetchGroqResponse = async (userMessage: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            { role: 'system', content: 'You are the AYUSH Herbal Garden Assistant, an AI chatbot that provides information on herbal plants, Ayurvedic remedies, medicinal uses, and gardening tips. Offer concise, friendly, and informative responses to user inquiries.' },
            ...messages.map((msg) => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text,
            })),
            { role: 'user', content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 400,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.replace(/\n/g, '<br />');
    } catch (error) {
      console.error('Error fetching response:', error);
      toast({ title: 'Error', description: 'Failed to get response. Please try again later.', variant: 'destructive' });
      return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: userMessage, sender: 'user' }]);
    setInput('');
    const aiResponse = await fetchGroqResponse(userMessage);
    setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), text: aiResponse, sender: 'bot' }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-end justify-end">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-full h-14 w-14 shadow-lg bg-green-700 text-white flex items-center justify-center"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="h-5 w-5" />
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-2xl rounded-xl w-[400px] max-h-[500px] flex flex-col"
          >
            <div className="bg-green-700 text-white p-4 rounded-t-xl flex justify-between items-center">
              <span className="text-base">AYUSH Herbal Garden Assistant <span className='text-lg ml-1'>🤖</span></span>
              <Button variant="ghost" className="text-white" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 overflow-y-auto flex-grow h-[350px]">
              {messages.map((message) => (
                <div key={message.id} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block rounded-lg px-3 py-2 max-w-[85%] text-sm ${message.sender === 'user' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-800'}`} dangerouslySetInnerHTML={{ __html: message.text }}></div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-center items-center py-2">
                  <Loader2 className="h-5 w-5 animate-spin text-green-500" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  disabled={isLoading}
                />
                <Button size="icon" onClick={handleSend} disabled={!input.trim() || isLoading}>
                  <SendIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;