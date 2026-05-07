import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export function useSettings() {
 return useContext(SettingsContext);
}

export function SettingsProvider({ children }) {
 const [settings, setSettings] = useState({});
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const fetchSettings = async () => {
 try {
 // Public endpoint
 const res = await fetch('/api/settings');
 if (res.ok) {
 const data = await res.json();
 setSettings(data);
 }
 } catch (err) {
 console.error('Failed to load settings:', err);
 } finally {
 setLoading(false);
 }
 };

 fetchSettings();
 }, []);

 /**
 * Get a setting value by key with an optional fallback.
 * @param {string} key - The setting key (e.g., 'logo').
 * @param {any} fallback - The value to return if the key is missing or empty.
 * @returns {any} - The setting value or fallback.
 */
 const getSetting = (key, fallback = null) => {
 return settings[key] || fallback;
 };

 return (
 <SettingsContext.Provider value={{ settings, loading, getSetting }}>
 {children}
 </SettingsContext.Provider>
 );
}
