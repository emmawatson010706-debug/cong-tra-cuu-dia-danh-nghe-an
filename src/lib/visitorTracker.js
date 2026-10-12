import { useState, useEffect } from 'react';
import { supabase } from './supabase.js';

const STORAGE_KEY = 'nata_visitor_stats';
// Baseline count: over 1.2 million visits
const BASE_TOTAL_VISITS = 1268450;

function getTodayBaseline() {
  const d = new Date();
  const vnHour = (d.getUTCHours() + 7) % 24;
  // Dynamic scale throughout the day from 800 (midnight) to ~3600 (afternoon/evening)
  return Math.floor(950 + (vnHour / 24) * 2800 + Math.random() * 80);
}

function getTodayString() {
  const d = new Date();
  // Vietnam time UTC+7
  const vnDate = new Date(d.getTime() + (7 * 60 + d.getTimezoneOffset()) * 60000);
  return vnDate.toISOString().slice(0, 10);
}

function getStoredStats() {
  const todayStr = getTodayString();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure total is at least over 1.2M as requested
      if (!parsed.totalVisits || parsed.totalVisits < BASE_TOTAL_VISITS) {
        parsed.totalVisits = BASE_TOTAL_VISITS + Math.floor(Math.random() * 350);
      }
      if (parsed.lastDate !== todayStr) {
        parsed.lastDate = todayStr;
        parsed.todayVisits = getTodayBaseline();
      }
      return parsed;
    }
  } catch (e) {}

  const initial = {
    totalVisits: BASE_TOTAL_VISITS + Math.floor(Math.random() * 320),
    todayVisits: getTodayBaseline(),
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
