import { getExtendedDomainRegex, getExtendedLookupOptions } from "./bnExtension";
import { lookupWhois as originalLookupWhois } from "./lookup";
import { parseWhoisData } from "./tld_parser";

export async function lookupWhois(domain: string) {
  const options = getExtendedLookupOptions(domain);
  const rawWhoisData = await originalLookupWhois(domain);

  const regex = getExtendedDomainRegex(domain);
  return parseWhoisData(rawWhoisData, regex);
}
