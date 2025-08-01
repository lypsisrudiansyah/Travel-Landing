"use client"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "de" | "it"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    console.log(`Language changed to: ${language}`)
    localStorage.setItem('preferred-language', language)
    // Show toast when language changes (except on initial mount)
    if (language !== "en") {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }, [language])

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
      {children}
      {/* {showToast && (
        <Toast>
          <div className="grid gap-1">
            <ToastTitle>Language Changed</ToastTitle>
            <ToastDescription>
              Successfully switched to {language.toUpperCase()}
            </ToastDescription>
          </div>
        </Toast>
      )} */}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
} 