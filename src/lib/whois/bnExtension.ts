import { DomainRegex, getDomainRegex } from "./lib";
import { getLookupOptions as originalGetLookupOptions } from "./lookup";

// 定义 .bn 的正则规则
const bnRegex: DomainRegex = {
  domainName: "Domain Name:\\s*([^\\s]+)",
  registrar: "Registrar:\\s*(.+)",
  creationDate: "Creation Date:\\s*(.+)",
  expirationDate: "Expiration Date:\\s*(.+)",
  status: "Status:\\s*(.+)",
  nameServers: "Name Server:\\s*(.+)",
  notFound: "No match for",
};

// 扩展 getDomainRegex 函数以支持 .bn
export function getExtendedDomainRegex(domain: string): DomainRegex {
  if (domain.endsWith(".bn")) {
    return bnRegex; // 使用 bn 的正则规则
  }
  return getDomainRegex(domain); // 调用原始函数
}

// 扩展 getLookupOptions 以支持 .bn 的 Whois 服务器
export function getExtendedLookupOptions(domain: string) {
  const tld = domain.split('.').pop()?.toLowerCase();

  // 定义 .bn 的 Whois 服务器
  const serverMap: Record<string, string> = {
    "bn": "whois.bnnic.bn",
  };

  const options = originalGetLookupOptions(domain);
  return {
    ...options,
    server: serverMap[tld] || options.server, // 如果是 .bn 使用扩展服务器
  };
}
