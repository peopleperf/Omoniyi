"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User,
  Sparkles,
  RotateCcw,
  Minimize2,
  Maximize2,
  Loader2
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface KnowledgeBase {
  id: string;
  category: string;
  question: string;
  answer: string;
  keywords: string[];
  active: boolean;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm Omoniyi Ipaye's dedicated AI assistant. I'm here exclusively to answer questions about Omoniyi's professional experience in People Operations, his HR technology expertise, and how he can help transform your organization's HR processes. What would you like to know about his services or background?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch knowledge base on component mount
  useEffect(() => {
    fetchKnowledgeBase();
  }, []);

  const fetchKnowledgeBase = async () => {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .eq('active', true);

    if (data) {
      setKnowledgeBase(data);
    }
  };

  const generateAIResponse = async (userInput: string): Promise<string> => {
    try {
      // Try to use Kimi AI API first
      const response = await fetch('/api/chat/kimi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput,
          knowledgeBase: knowledgeBase,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.response;
      }
    } catch (error) {
      console.error('Error calling Kimi AI:', error);
    }

    // Fallback to local responses if API fails
    const input = userInput.toLowerCase();
    
    // First, check the knowledge base from database
    for (const kb of knowledgeBase) {
      const matchesKeyword = kb.keywords.some(keyword => 
        input.includes(keyword.toLowerCase())
      );
      
      if (matchesKeyword) {
        return kb.answer;
      }
    }
    
    // Fallback to simple keyword-based responses if no match in knowledge base
    if (input.includes('experience') || input.includes('background')) {
      return "Omoniyi has over 10 years of experience in People Operations, specializing in scaling HR operations globally. He's managed teams across 20+ countries and built compliance frameworks that ensure smooth operations while maintaining local regulatory requirements.";
    }
    
    if (input.includes('skill') || input.includes('technical')) {
      return "Omoniyi brings a unique blend of HR expertise and technical skills. He's proficient in React, Next.js, TypeScript, and Python for building custom HR tools. He also specializes in automation platforms like Zapier and n8n, creating workflows that reduce manual work by up to 80%.";
    }
    
    if (input.includes('help') || input.includes('consult') || input.includes('service')) {
      return "Omoniyi can help transform your People Operations through: \n\n1. HR Automation Strategy - Identifying and implementing automation opportunities\n2. Global Compliance Frameworks - Building scalable systems for multi-country operations\n3. Custom HR Tools - Developing tailored solutions for your specific needs\n4. Process Optimization - Streamlining workflows and improving efficiency\n\nWould you like to schedule a consultation to discuss your specific needs?";
    }
    
    if (input.includes('contact') || input.includes('reach') || input.includes('connect')) {
      return "Great! You can connect with Omoniyi through:\n\n📧 Email: omoniyi@tuta.io\n💼 LinkedIn: linkedin.com/in/omoniyiipaye\n📅 Schedule a call: calendly.com/ipayeniyi/30min\n\nHe typically responds within 24 hours. What specific topic would you like to discuss?";
    }
    
    if (input.includes('project') || input.includes('work')) {
      return "Omoniyi has worked on several impactful projects:\n\n1. **Employment Verification System** - Automated verification across 30+ countries\n2. **HR Case Routing Bot** - AI-powered system reducing response time by 80%\n3. **Global Onboarding Automation** - Zero-touch onboarding for distributed teams\n4. **Compliance Dashboard** - Real-time monitoring of global HR metrics\n\nEach project demonstrates his ability to blend HR expertise with technical innovation. Which type of project interests you most?";
    }
    
    // Default response
    return "That's an interesting question! While I can provide general information about Omoniyi's experience and capabilities, I'd recommend scheduling a call with him directly for detailed discussions. He's always happy to explore how his expertise in People Operations and HR technology can help solve your specific challenges. Would you like me to share his contact information?";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Generate AI response
    setTimeout(async () => {
      const response = await generateAIResponse(userMessage.content);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        type: 'ai',
        content: "Chat reset! I'm here exclusively to provide information about Omoniyi Ipaye's professional experience in People Operations and HR technology. What would you like to know about his services, skills, or background?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[90vw]"
          >
            <Card className="h-full flex flex-col overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Chat with Omoniyi's AI</h3>
                      <p className="text-xs opacity-90">Ask about experience & services</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary-foreground hover:bg-white/20 h-8 w-8 p-0"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary-foreground hover:bg-white/20 h-8 w-8 p-0"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-[80%] ${
                          message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === 'user' ? 'bg-primary' : 'bg-muted'
                          }`}>
                            {message.type === 'user' ? (
                              <User className="w-4 h-4 text-primary-foreground" />
                            ) : (
                              <Sparkles className="w-4 h-4" />
                            )}
                          </div>
                          <div className={`rounded-lg px-4 py-2 ${
                            message.type === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-center space-x-2 bg-muted rounded-lg px-4 py-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="border-t p-4">
                    <div className="flex items-end space-x-2">
                      <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about experience, skills, or services..."
                        className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                        rows={1}
                      />
                      <Button
                        size="sm"
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        className="h-10"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={resetChat}
                        className="h-10"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Press Enter to send, Shift+Enter for new line
                    </p>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
