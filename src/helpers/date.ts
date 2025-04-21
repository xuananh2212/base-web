import { removeAccents } from "@/helpers/string";
import moment from "moment";

export default function dateToTime(time: string): number {
  const trimmedTime = time.trim().toLowerCase();

  const timePattern = /^(\d+)\s*(seconds?|minutes?|hours?|days?|months?|years?)$/;
  const match = trimmedTime.match(timePattern);

  if (!match) {
    throw new Error("Invalid time format");
  }

  const quantity = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "second":
    case "seconds":
      return quantity;
    case "minute":
    case "minutes":
      return quantity * 60;
    case "hour":
    case "hours":
      return quantity * 60 * 60;
    case "day":
    case "days":
      return quantity * 60 * 60 * 24;
    case "month":
    case "months":
      return quantity * 60 * 60 * 24 * 30;
    case "year":
    case "years":
      return quantity * 60 * 60 * 24 * 365;
    default:
      throw new Error("Invalid time unit");
  }
}

export function timeToDate(time: string): number {
  const trimmedTime = removeAccents(time).trim().toLowerCase();

  const timePattern =
    /^(\d+)\s*(phut|min|minutes?|giay|s|seconds?|ms|milliseconds?|gio|h|hours?|ngay|d|days?|tuan|w|weeks?|nam|y|years?|thang|months?)$/;
  const match = trimmedTime.match(timePattern);

  if (!match) {
    throw new Error("Invalid time format");
  }

  const quantity = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "phut":
    case "min":
    case "minute":
    case "minutes":
      return quantity / 60 / 24;
    case "giay":
    case "s":
    case "second":
    case "seconds":
      return quantity / 60 / 60 / 24;
    case "ms":
    case "millisecond":
    case "milliseconds":
      return quantity / 1000 / 60 / 60 / 24;
    case "gio":
    case "h":
    case "hour":
    case "hours":
      return quantity / 24;
    case "ngay":
    case "d":
    case "day":
    case "days":
      return quantity;
    case "tuan":
    case "w":
    case "week":
    case "weeks":
      return quantity * 7;
    case "thang":
    case "month":
    case "months":
      return quantity * 30; // Approximating every month as 30 days
    case "nam":
    case "y":
    case "year":
    case "years":
      return quantity * 365; // Not accounting for leap years
    default:
      throw new Error("Invalid time unit");
  }
}

export function isValidDate(dateString: string) {
  return !isNaN(new Date(dateString).getTime());
}

/**
 * Parses a date string in various formats and returns it in 'YYYY-MM-DD' format.
 * @param {string} dateString The date string to parse.
 * @param {string} format The returned format date
 * @return {string} The formatted date string or an indication of an invalid date.
 */
export function formatDate(dateString: string, format: string = "YYYY-MM-DD"): string {
  if (isValidDate(dateString)) {
    return moment(dateString).format(format);
  }
  const formats = [
    "DDMMYYYY",
    "DD/MM/YYYY",
    "DD-MM-YYYY",
    "DD MM YYYY",
    "DD/MMYYYY",
    "DDMM/YYYY",
    "YYYY-MM-DD",
    "YYYY-MM-DD",
    "YYYYMM-DD",
    "YYYY-MMDD",
    "YYYY/MM/DD",
    "YYYYMM/DD",
    "YYYY/MMDD",
    moment.ISO_8601,
  ];

  const parsedDate = moment(dateString, formats, true);

  if (parsedDate.isValid()) {
    return parsedDate.format(format);
  } else {
    try {
      return new Date(dateString).toISOString();
    } catch {
      return new Date().toISOString();
    }
  }
}
export function formatDateTime(dateString: string): string {
  return dateString && formatDate(dateString, "DD-MM-YYYY hh:mm:ss");
}
export function isDateValidCompareToday(dateString?: string): boolean {
  if (!dateString) {
    return true;
  }
  const date = new Date(dateString);
  const today = new Date();
  return date <= today;
}
