import React from 'react';
import { QuranCalculator } from '../../components/quran/QuranCalculator';
import '../../components/quran/StatsOverview.module.css'; // Ensure CSS modules work

export const metadata = {
    title: 'Quran Memorization Calculator | Habibullah Rakib',
    description: 'Track your Quran memorization and reading progress.',
};

export default function QuranCalculatorPage() {
    return <QuranCalculator />;
}
