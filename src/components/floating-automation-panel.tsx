"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  X, 
  ChevronRight, 
  Zap,
  Users,
  Globe,
  Code,
  Bot,
  Sparkles
} from 'lucide-react';

export default function FloatingAutomationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const automationFlows = [
    {
      title: "Employee Onboarding",
      description: "I automated onboarding to reduce paperwork from 3 days to 4 hours",
      icon: Users,
      tools: ["Zapier", "Workday", "Slack"],
      impact: "40+ hours saved monthly"
    },
    {
      title: "HR Case Management",
      description: "Built smart triage system that routes 400+ cases monthly",
      icon: MessageSquare,
      tools: ["n8n", "Google Apps Script", "AI"],
      impact: "90% faster response time"
    },
    {
      title: "Global Compliance",
      description: "Created real-time monitoring across 20+ countries",
      icon: Globe,
      tools: ["Looker", "Deel", "Custom APIs"],
      impact: "100% compliance rate"
    },
    {
      title: "Benefits Integration",
      description: "Unified benefits management with automated enrollment",
      icon: Zap,
      tools: ["Zapier", "Benefits APIs", "Email"],
      impact: "30% increase in utilization"
    }
  ];

  const nextStep = () => {
    if (currentStep < automationFlows.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetFlow = () => {
    setCurrentStep(0);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 2,
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="bg-primary hover:bg-primary/90 shadow-lg rounded-full p-4 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
            animate={{ x: [-100, 100] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <MessageSquare className="w-6 h-6 relative z-10" />
          <motion.span
            className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
          >
            Ask me what I automate!
          </motion.span>
        </Button>
      </motion.div>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel Content */}
            <motion.div
              className="fixed bottom-24 right-8 w-96 max-h-[80vh] z-50"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="shadow-2xl border-0">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">My Automation Stories</h3>
                        <p className="text-sm text-muted-foreground">
                          Real problems I've solved with code
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Automation {currentStep + 1} of {automationFlows.length}</span>
                      <span>{Math.round(((currentStep + 1) / automationFlows.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${((currentStep + 1) / automationFlows.length) * 100}%` 
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Current Automation */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {React.createElement(automationFlows[currentStep].icon, { 
                            className: "w-6 h-6 text-primary" 
                          })}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">
                            {automationFlows[currentStep].title}
                          </h4>
                          <p className="text-muted-foreground">
                            {automationFlows[currentStep].description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {automationFlows[currentStep].tools.map((tool) => (
                          <Badge key={tool} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Impact</span>
                        </div>
                        <p className="text-sm text-green-700 mt-1">
                          {automationFlows[currentStep].impact}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </Button>

                    <div className="flex space-x-2">
                      {automationFlows.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStep(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentStep ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>

                    {currentStep < automationFlows.length - 1 ? (
                      <Button size="sm" onClick={nextStep}>
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    ) : (
                      <Button size="sm" onClick={resetFlow}>
                        Done
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}