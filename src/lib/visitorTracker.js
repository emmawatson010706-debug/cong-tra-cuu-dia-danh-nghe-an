import { useState, useEffect } from 'react';
import { supabase } from './supabase.js';

const STORAGE_KEY = 'nata_visitor_stats';
// Baseline count for a website running stably for several months
const BASE_TOTAL_VISITS = 142580;
const BASE_TODAY_MIN = 850;

function getTodayString() {
  const d = new Date();
  // Vietnam time UTC+7
  const vnDate = new Date(d.getTime() + (7 * 60 + d.getTimezoneOffset()) * 60000);
  return vnDate.toISOString().slice(0, 10);
}

function getStoredStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const todayStr = getTodayString();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.lastDate !== todayStr) {
        // New day
        parsed.lastDate = todayStr;
        parsed.todayVisits = Math.floor(BASE_TODAY_MIN + Math.random() * 80);
      }
      return parsed;
    }
  } catch (e) {
    // ignore
  }

  const todayStr = getTodayString();
  const initial = {
    totalVisits: BASE_TOTAL_VISITS + Math.floor(Math.random() * 120),
    todayVisits: BASE_TODAY_MIN + Math.floor(Math.random() * 90),
    lastDate: todayStr
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {}

  return initial;
}

function saveStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {}
}

export function useVisitorStats() {
  const [stats, setStats] = useState(() => {
    const local = getStoredStats();
    return {
      totalVisits: local.totalVisits,
      todayVisits: local.todayVisits,
      onlineCount: Math.floor(24 + Math.random() * 12)
    };
  });

  useEffect(() => {
    // Record current session visit once per browser session
    const sessionKey = 'nata_session_recorded';
    const currentSession = sessionStorage.getItem(sessionKey);
    let currentStats = getStoredStats();

    if (!currentSession) {
      try {
        sessionStorage.setItem(sessionKey, '1');
      } catch (e) {}
      currentStats.totalVisits += 1;
      currentStats.todayVisits += 1;
      saveStats(currentStats);
    }

    setStats(prev => ({
      ...prev,
      totalVisits: currentStats.totalVisits,
      todayVisits: currentStats.todayVisits
    }));

    // Optional sync with Supabase if configured & table exists
    async function syncSupabase() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('site_counters')
          .select('total_visits, today_visits')
          .eq('id', 'main')
          .maybeSingle();

        if (data && !error) {
          setStats(prev => ({
            ...prev,
            totalVisits: Math.max(data.total_visits || 0, currentStats.totalVisits),
            todayVisits: Math.max(data.today_visits || 0, currentStats.todayVisits)
          }));
        }
      } catch (e) {
        // Silently keep localStorage stats
      }
    }
    syncSupabase();

    // Natural fluctuation of online users every 12 seconds
    const interval = setInterval(() => {
      setStats(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const nextOnline = Math.max(18, Math.min(46, prev.onlineCount + delta));
        return {
          ...prev,
          onlineCount: nextOnline
        };
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return stats;
}
