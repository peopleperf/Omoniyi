"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { 
  Home, 
  User, 
  Briefcase, 
  Mail, 
  Github, 
  Linkedin, 
  Calendar,
  Moon,
  Sun,
  Sparkles,
  Download,
  Copy
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      {/* Floating Hint */}
      <motion.div
        className="fixed bottom-4 left-4 z-50 hidden lg:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
      >
        <div className="bg-background/80 backdrop-blur-sm border rounded-lg px-3 py-2 text-sm text-muted-foreground">
          Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">⌘K</kbd> to open command palette
        </div>
      </motion.div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/about'))}>
              <User className="mr-2 h-4 w-4" />
              <span>About</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/projects'))}>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/contact'))}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}>
              {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              <span>Toggle theme</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open('https://calendly.com/ipayeniyi/30min', '_blank'))}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Schedule a call</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigator.clipboard.writeText('omoniyi@tuta.io'))}>
              <Copy className="mr-2 h-4 w-4" />
              <span>Copy email</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open('/resume.pdf', '_blank'))}>
              <Download className="mr-2 h-4 w-4" />
              <span>Download resume</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Connect">
            <CommandItem onSelect={() => runCommand(() => window.open('https://github.com/peopleperf', '_blank'))}>
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open('https://www.linkedin.com/in/omoniyiipaye', '_blank'))}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
            </CommandItem>
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Easter Eggs">
            <CommandItem onSelect={() => runCommand(() => {
              document.body.style.transform = 'rotate(180deg)';
              setTimeout(() => {
                document.body.style.transform = 'rotate(0deg)';
              }, 1000);
            })}>
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Do a barrel roll</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
