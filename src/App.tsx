import { useState, useCallback } from 'react';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import IndustrySelectorSection from './components/IndustrySelectorSection/IndustrySelectorSection';
import TaxCalendarSection from './components/TaxCalendarSection/TaxCalendarSection';
import ChecklistSection from './components/ChecklistSection/ChecklistSection';
import OfficialLinksSection from './components/OfficialLinksSection/OfficialLinksSection';
import Footer from './components/Footer/Footer';
import type { CheckedItems } from './types';
import styles from './App.module.css';

export default function App() {
  // ── Persistent State ─────────────────────────────────────────
  const [selectedIndustry, setSelectedIndustry] = useLocalStorage<string | null>(
    'mtg-industry',
    null
  );
  const [checkedItems, setCheckedItems] = useLocalStorage<CheckedItems>(
    'mtg-checklist',
    {}
  );

  // ── Local State ───────────────────────────────────────────────
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );

  // ── Theme ─────────────────────────────────────────────────────
  const { theme, toggleTheme } = useTheme();

  // ── Handlers ─────────────────────────────────────────────────
  const handleIndustrySelect = useCallback(
    (id: string) => {
      setSelectedIndustry(prev => (prev === id ? null : id));
    },
    [setSelectedIndustry]
  );

  const handleCheckItem = useCallback(
    (itemId: string, checked: boolean) => {
      setCheckedItems(prev => ({ ...prev, [itemId]: checked }));
    },
    [setCheckedItems]
  );

  const handleMonthChange = useCallback((month: number) => {
    setSelectedMonth(month);
  }, []);

  return (
    <div className={styles.app}>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content">
        <HeroSection />
        <IndustrySelectorSection
          selectedIndustry={selectedIndustry}
          onSelect={handleIndustrySelect}
        />
        <TaxCalendarSection
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
        />
        <ChecklistSection
          selectedIndustry={selectedIndustry}
          checkedItems={checkedItems}
          onCheckItem={handleCheckItem}
        />
        <OfficialLinksSection />
      </main>
      <Footer />
    </div>
  );
}
