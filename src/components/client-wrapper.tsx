"use client";

import React, { useState, useEffect } from 'react';
import CustomCursor from '@/components/custom-cursor';
import GradientMeshBackground from '@/components/gradient-mesh-background';
import CommandPalette from '@/components/command-palette';
import LoadingAnimation from '@/components/loading-animation';
import { ThemeToggle } from '@/components/theme-toggle';
import AIChat from '@/components/ai-chat';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingAnimation isLoading={isLoading} />
      <GradientMeshBackground />
      <CustomCursor />
      <CommandPalette />
      <AIChat />
      {/* Theme toggle in fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
