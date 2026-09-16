import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="app-footer" className="border-t border-slate-200 bg-white/95 backdrop-blur-sm mt-auto py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm text-slate-600 flex-wrap">
          <Sparkles className="w-4 h-4 text-teal-600 shrink-0" aria-hidden="true" />
          <span>
            © 2026 Prompt Visibility Tracker. Developed by{' '}
            <strong className="font-semibold text-teal-700 hover:text-teal-800 transition-colors">
              Ami - SEO Girl
            </strong>
            . All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
