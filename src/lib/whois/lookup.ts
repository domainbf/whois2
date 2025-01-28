import { MAX_IP_WHOIS_FOLLOW, MAX_WHOIS_FOLLOW } from "@/lib/env";
import whois from "whois-raw";
import { WhoisResult, WhoisAnalyzeResult } from "@/lib/whois/types";
import { parseWhoisData } from "@/lib/whois/tld_parser";
import { countDuration, extractDomain, toErrorMessage } from "@/lib/utils";

export function getLookupOptions(domain: string) {
  const isDomain = !!extractDomain(domain);
  return {
    follow: isDomain ? MAX_WHOIS_FOLLOW : MAX_IP_WHOIS_FOLLOW,
  };
}

export function getLookupRawWhois(
  domain: string,
  options?: any,
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      whois.lookup(domain, options, (err: Error, data: string) => {
        if (err) {
          // reject err like tld error
          reject(err);
        } else {
          resolve(data);
        }
      });
    } catch (e) {
      // reject err like connection error
      reject(e);
    }
  });
}

export async function lookupWhois(domain: string): Promise<WhoisResult> {
  const startTime = Date.now();

  try {
    const data = await getLookupRawWhois(domain, getLookupOptions(domain));
    const endTime = Date.now();
    const parsed = parseWhoisData(data, domain);

    // 提取删除日期和再次可用日期
    const deletionDate = extractDeletionDate(data); // 假设你有这个函数
    const availableDate = extractAvailableDate(data); // 假设你有这个函数

    // 将提取的日期添加到解析结果中
    const result: WhoisAnalyzeResult = {
      ...parsed,
      deletionDate, // 添加域名删除日期
      availableDate, // 添加域名再次可用日期
    };

    return {
      status: true,
      time: countDuration(startTime, endTime),
      result,
    };
  } catch (e) {
    return {
      status: false,
      time: countDuration(startTime),
      error: toErrorMessage(e),
    };
  }
}

// 假设你有以下两个函数来提取日期
function extractDeletionDate(data: string): string | undefined {
  // 解析逻辑...
  return undefined; // 替换为实际解析结果
}

function extractAvailableDate(data: string): string | undefined {
  // 解析逻辑...
  return undefined; // 替换为实际解析结果
}
