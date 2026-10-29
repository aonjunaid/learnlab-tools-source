/**
 * Pure date calculation functions.
 * Handles calendar age (years, months, days), leap-year adjustments, and total elapsed days.
 */

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(year: number, month: number): number {
  // month is 0-indexed (0 = Jan, 11 = Dec)
  return new Date(year, month + 1, 0).getDate();
}

export interface CalendarAgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalWeeks: number;
  nextBirthdayDays: number;
  nextBirthdayDate: string;
  isBornLeapDay: boolean;
  explanation: string;
}

export function calculateCalendarAge(birthDate: Date, asOfDate: Date = new Date()): CalendarAgeResult | null {
  if (isNaN(birthDate.getTime()) || isNaN(asOfDate.getTime())) {
    return null;
  }
  if (birthDate > asOfDate) {
    return null;
  }

  const bYear = birthDate.getFullYear();
  const bMonth = birthDate.getMonth();
  const bDay = birthDate.getDate();

  const cYear = asOfDate.getFullYear();
  const cMonth = asOfDate.getMonth();
  const cDay = asOfDate.getDate();

  let years = cYear - bYear;
  let months = cMonth - bMonth;
  let days = cDay - bDay;

  if (days < 0) {
    // Borrow days from preceding month of cYear, cMonth
    const prevMonthDays = getDaysInMonth(cYear, cMonth === 0 ? 11 : cMonth - 1);
    days += prevMonthDays;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // Total elapsed days (astronomical calendar day difference)
  const utcBirth = Date.UTC(bYear, bMonth, bDay);
  const utcAsOf = Date.UTC(cYear, cMonth, cDay);
  const totalDays = Math.floor((utcAsOf - utcBirth) / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalWeeks = Math.floor(totalDays / 7);

  // Next birthday calculation
  let nextBdayYear = cYear;
  let nextBdayMonth = bMonth;
  let nextBdayDay = bDay;

  // Leap day birth handler (Feb 29)
  const isBornLeapDay = bMonth === 1 && bDay === 29;
  if (isBornLeapDay && !isLeapYear(nextBdayYear)) {
    // Non-leap year convention: celebrate on March 1 or Feb 28 (common practice Feb 28)
    nextBdayDay = 28;
  }

  let nextBday = new Date(nextBdayYear, nextBdayMonth, nextBdayDay);
  if (nextBday < new Date(cYear, cMonth, cDay)) {
    nextBdayYear += 1;
    if (isBornLeapDay && !isLeapYear(nextBdayYear)) {
      nextBdayDay = 28;
    } else if (isBornLeapDay && isLeapYear(nextBdayYear)) {
      nextBdayDay = 29;
    }
    nextBday = new Date(nextBdayYear, nextBdayMonth, nextBdayDay);
  }

  const nextBdayUtc = Date.UTC(nextBday.getFullYear(), nextBday.getMonth(), nextBday.getDate());
  const nextBirthdayDays = Math.max(0, Math.ceil((nextBdayUtc - utcAsOf) / (1000 * 60 * 60 * 24)));

  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalWeeks,
    nextBirthdayDays,
    nextBirthdayDate: nextBday.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    isBornLeapDay,
    explanation: `${years} completed ${years === 1 ? 'year' : 'years'}, ${months} ${months === 1 ? 'month' : 'months'}, and ${days} ${days === 1 ? 'day' : 'days'}. Total elapsed: ${totalDays.toLocaleString()} days.`
  };
}

export function calculateDateDifference(dateA: Date, dateB: Date) {
  const [start, end] = dateA <= dateB ? [dateA, dateB] : [dateB, dateA];
  return calculateCalendarAge(start, end);
}
