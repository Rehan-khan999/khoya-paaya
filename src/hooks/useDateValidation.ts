import { useMemo } from 'react';

export const useDateValidation = () => {
  const today = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const minDate = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 5);
    return d.toISOString().split('T')[0];
  }, []);

  const validateDate = (dateStr: string): string | null => {
    if (!dateStr) return 'Please select a valid date.';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Please select a valid date.';
    if (dateStr > today) return 'Future dates are not allowed. Please select a valid date.';
    if (dateStr < minDate) return `Date must be within the last 5 years.`;
    return null;
  };

  const validateFoundAfterLost = (lostDate: string, foundDate: string): string | null => {
    if (lostDate && foundDate && foundDate < lostDate) {
      return 'Found date cannot be earlier than lost date.';
    }
    return null;
  };

  return { today, minDate, validateDate, validateFoundAfterLost };
};
