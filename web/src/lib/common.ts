import { EMAIL_REGEX } from "./regex";

export const formatDate = (inputDate: string) =>{
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }as Intl.DateTimeFormatOptions;
    const date = new Date(inputDate);
    return date.toLocaleDateString('en-US', options);
}

export const validateEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
}

export const getFormattedDate = (inputDate: string) =>{
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    const daySuffix = getDaySuffix(day);
  
    return `${month} ${day}${daySuffix}, ${year}`;
}

const getDaySuffix = (day: number) =>{
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
}

export const formatCompactNumber = (amount: number): string => {
  // Handle zero and sign
  if (amount === 0) return "0";
  const sign = amount < 0 ? "-" : "";
  const absAmount = Math.abs(amount);

  // Return full integer string for numbers < 10,000
  if (absAmount < 10_000) {
    return `${sign}${absAmount}`;
  }

  // Define thresholds and suffixes (largest to smallest)
  const thresholds: { value: number; suffix: string }[] = [
    { value: 1_000_000_000_000, suffix: "T" }, // Trillions
    { value: 1_000_000_000, suffix: "B" },    // Billions
    { value: 1_000_000, suffix: "M" },        // Millions
    { value: 1_000, suffix: "K" },            // Thousands
  ];

  for (const { value, suffix } of thresholds) {
    if (absAmount >= value) {
      const divided = absAmount / value;

      if (divided >= 10) {
        // For values >= 10, truncate to integer (no rounding)
        const truncated = Math.floor(divided);
        return `${sign}${truncated}${suffix}`;
      } else {
        // For values < 10, truncate to one decimal place (no rounding)
        const truncated = Math.floor(divided * 10) / 10;
        // Remove trailing .0 if present
        const formatted = truncated.toString().replace(/\.0$/, "");
        return `${sign}${formatted}${suffix}`;
      }
    }
  }

  // Fallback (should never be reached for absAmount >= 10,000)
  return `${sign}${absAmount}`;
};

export const getFirstWord = (inputString : string): string => {
  const words = inputString.split(" ");
  return words[0];
}

/**
 * Sums up the numerical values of a specific key across an array of objects.
 * 
 * @param array - The array of objects to process
 * @param key - The specific key containing numbers to sum
 */
export function sumObjectValues<T>(array: T[], key: keyof T): number {
  return array.reduce((accumulator, currentItem) => {
    const value = currentItem[key];
    
    // Ensure the value is a valid number before adding to prevent NaN errors
    if (typeof value === 'number' && !isNaN(value)) {
      return accumulator + value;
    }
    
    return accumulator;
  }, 0);
}


/**
 * Converts a raw number into a human-readable string with comma separators.
 * Example: 25000 -> "25,000"
 */
export function formatToHumanNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
