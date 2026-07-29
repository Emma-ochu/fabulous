/**
 * Normalizes and validates Nigerian phone numbers.
 * Supports inputs like:
 * - "08012345678" -> "08012345678" / "+2348012345678"
 * - "8012345678"  -> "08012345678" / "+2348012345678"
 * - "+2348012345678" -> "08012345678" / "+2348012345678"
 */
export const normalizeNigerianPhone = (phone: string) => {
  if (!phone) return { isValid: false, local: "", international: "", raw: "" };

  // Strip all non-digit characters
  let digits = phone.replace(/\D/g, "");

  // Convert 234... prefix to 0... for local normalization
  if (digits.startsWith("234") && digits.length === 13) {
    digits = "0" + digits.slice(3);
  }

  // Handle missing leading zero (e.g., 8012345678 -> 08012345678)
  if (digits.length === 10 && /^[789][01]/.test(digits)) {
    digits = "0" + digits;
  }

  // Valid Nigerian mobile prefix check: starts with 070, 071, 080, 081, 090, 091
  const isValid = /^0[789][01]\d{8}$/.test(digits);

  const local = isValid ? digits : phone;
  const international = isValid ? `+234${digits.slice(1)}` : phone;

  return {
    isValid,
    local, // e.g. "08012345678"
    international, // e.g. "+2348012345678"
    raw: digits,
  };
};

/**
 * Formats a raw phone string into a clean local display (0801 234 5678)
 */
export const formatPhoneDisplay = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
};