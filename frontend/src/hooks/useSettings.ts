import { useEffect, useState } from 'react'

export interface AppSettings {
  temperature: number
  topK: number
}

const defaultSettings: AppSettings = {
  temperature: 0.2,
  topK: 5,
}

const storageKey = 'rag-studio-settings'

function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(storageKey)
    if (!stored) return defaultSettings
    const parsed = JSON.parse(stored) as Partial<AppSettings>
    return {
      temperature: typeof parsed.temperature === 'number' ? parsed.temperature : defaultSettings.temperature,
      topK: typeof parsed.topK === 'number' ? parsed.topK : defaultSettings.topK,
    }
  } catch {
    return defaultSettings
  }
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(settings))
  }, [settings])

  return { settings, setSettings }
}
