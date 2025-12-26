"use client";

import React, { useState, useRef, useEffect } from "react";
import { MdLanguage, MdExpandMore } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    // Here you would typically handle the language change
    console.log("Language changed to:", language.code);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 h-8 px-3 rounded-full border border-border hover:bg-accent transition-colors text-sm font-medium text-foreground"
        title="Select language"
      >
        <span>{selectedLanguage.code.toUpperCase()}</span>
        <MdExpandMore 
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 w-48 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-[60]"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent transition-colors text-left",
                  selectedLanguage.code === language.code && "bg-accent"
                )}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{language.name}</span>
                  <span className="text-xs text-muted-foreground">{language.code.toUpperCase()}</span>
                </div>
                {selectedLanguage.code === language.code && (
                  <div className="ml-auto w-2 h-2 bg-[#F15A29] rounded-full" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}