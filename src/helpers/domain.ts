import _ from "lodash";
import { removeAccents } from "./string";

/**
 * Converts a company name to a domain-like format.
 * @param {string} companyName - The company name to convert.
 * @return {string} - The domain-like format of the company name.
 */
function toDomain(companyName: string): string {
  let domainName = companyName;

  // Remove diacritics
  domainName = removeAccents(domainName).toLowerCase();

  // Words/phrases to be removed from the company name
  const ignoreWords = [
    "Công ty TNHH",
    "Công ty Cổ phần",
    "Công ty CP",
    "Công ty TNHH MTV",
    "Công ty Liên doanh",
    "Công ty Liên kết",
    "Công ty Tư nhân",
    "Công ty",
    "Doanh nghiệp TNHH",
    "Doanh nghiệp Cổ phần",
    "Doanh nghiệp Hữu hạn",
    "DN TNHH",
    "DN Cổ phần",
    "DN Hữu hạn",
    "DNTN TNHH",
    "DNTN Cổ phần",
    "DNTN Hữu hạn",
    "Hợp tác xã",
    "HTX",
    // Add other cases if needed
  ];

  // Remove diacritics from ignoreWords
  const ignoreWordsNoDiacritics = ignoreWords.map(removeAccents).map(_.toLower);

  ignoreWordsNoDiacritics.forEach((word) => {
    const regex = new RegExp(word, "gi");
    domainName = domainName.replace(regex, "").trim();
  });

  // Convert to lowercase and replace spaces with hyphens
  domainName = domainName.replace(/\s+/g, "-");

  // Remove non-alphabetic characters except hyphens
  domainName = domainName.replace(/[^a-z-]/g, "");

  // Remove double hyphens if any
  domainName = domainName.replace(/--+/g, "-");

  // Remove leading and trailing hyphens if any
  domainName = domainName.replace(/^-+|-+$/g, "");

  // Ensure the domain name matches the pattern /^[a-z]+(-[a-z]+)*$/
  if (!/^[a-z]+(-[a-z]+)*$/.test(domainName)) {
    return "";
  }

  return domainName.slice(0, 20).replace(/^-+|-+$/g, "");
}

export { toDomain };
