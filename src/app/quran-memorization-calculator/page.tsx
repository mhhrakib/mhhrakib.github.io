import React from 'react';
import { QuranCalculator } from '../../components/quran/QuranCalculator';
import '../../components/quran/StatsOverview.module.css'; // Ensure CSS modules work

export const metadata = {
    title: 'Quran Memorization Calculator | Tracker & Analytics',
    description: 'Track your Quran memorization (Hifz) and reading progress with precise word and character analytics. Visualize your journey with detailed charts.',
    keywords: ['Quran', 'Memorization', 'Hifz', 'Tracker', 'Calculator', 'Islam', 'Muslim', 'Progress', 'Analytics'],
    openGraph: {
        title: 'Quran Memorization Calculator',
        description: 'Track your Quran memorization and reading progress efficiently.',
        type: 'website',
    },
};

export default function QuranCalculatorPage() {
    return <QuranCalculator />;
}
