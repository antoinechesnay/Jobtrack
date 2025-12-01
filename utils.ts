import { Company } from "./types";

export const parseCompanyData = (rawData: string): Company[] => {
  const lines = rawData.trim().split('\n');
  const companies: Company[] = [];

  lines.forEach(line => {
    if (!line.trim()) return;

    // 1. Fix common OCR URL errors
    let cleanedLine = line
        .replace(/htp:\/\//g, 'http://') // Fix htp protocol
        .replace(/((?:www\.|https?:\/\/)[^\s]*?)([A-Z])/g, '$1 $2'); // Fix URL merged with starting Capital letter of description

    // 2. Find URL - We look for http, https, or www.
    const urlMatch = cleanedLine.match(/(https?:\/\/[^\s]+|www\.[^\s]+)/);

    if (urlMatch && urlMatch.index !== undefined) {
        const name = cleanedLine.substring(0, urlMatch.index).trim();
        let website = urlMatch[0];
        let rest = cleanedLine.substring(urlMatch.index + website.length).trim();

        // Normalize website
        if (website.startsWith('www.')) website = 'https://' + website;

        // 3. Find Country
        // The OCR has "United Kingdom", "United States", "UK", "Uk", "GB", "India"
        // We try to find the LAST occurrence of a country if multiple appear, 
        // or better, find the one that separates the description from the metrics.
        // Common anchor points are GB, United Kingdom, UK, United States.
        const countryRegex = /\b(United Kingdom|United States|India|China|Germany|France|UK|Uk|USA|GB)\b/g;
        
        let match;
        let countryMatch = null;
        
        // Find the match that is followed by numbers (Headcount) or 'accounting', 'financial' etc if numbers missing
        while ((match = countryRegex.exec(rest)) !== null) {
            const after = rest.substring(match.index + match[0].length).trim();
            // Check if followed by a number (headcount) or seems to be end of description
            if (/^\d/.test(after) || after.length < 60) { 
                countryMatch = match;
                break; 
            }
        }

        if (countryMatch && countryMatch.index !== undefined) {
            const description = rest.substring(0, countryMatch.index).trim();
            const afterCountry = rest.substring(countryMatch.index + countryMatch[0].length).trim();
            
            // 4. Parse Metadata (Headcount, Year, Industry)
            // Expected format: [Headcount] [Year] [Industry]
            // But sometimes: [Headcount] [Industry] (Year missing) or mixed
            
            const numberMatches = afterCountry.match(/^(\d+)\s+(\d+)\s+(.*)$/);
            const singleNumberMatch = afterCountry.match(/^(\d+)\s+(.*)$/);
            
            let headcount = 'N/A';
            let founded = 'N/A';
            let industry = afterCountry;

            if (numberMatches) {
                headcount = numberMatches[1];
                founded = numberMatches[2];
                industry = numberMatches[3];
            } else if (singleNumberMatch) {
                const num = parseInt(singleNumberMatch[1]);
                // Guess if it's a year (1900-2025) or headcount
                if (num > 1900 && num < 2025 && num !== 2000) { 
                    // Ambiguous, but structurally Headcount usually comes first.
                    // However, if only one number exists and it looks like a year, it might be year.
                    // But let's stick to the column order: Headcount is first.
                    // If it's just "United Kingdom 2019 management consulting", 2019 is likely year.
                    // But "United Kingdom 14 management consulting", 14 is headcount.
                    if (num > 1950) {
                        founded = singleNumberMatch[1];
                    } else {
                        headcount = singleNumberMatch[1];
                    }
                    industry = singleNumberMatch[2];
                } else {
                     headcount = singleNumberMatch[1];
                     industry = singleNumberMatch[2];
                }
            }

            // Clean up industry
            industry = industry.replace(/^\d+\s+/, '');

            // Ignore header row if it slipped in
            if (name.toLowerCase().includes('company') && website.toLowerCase().includes('website')) return;

            companies.push({
                name,
                website,
                description: description || "No description available",
                country: countryMatch[0],
                headcount,
                founded,
                industry: industry || "Consulting"
            });
        }
    }
  });

  return companies;
};