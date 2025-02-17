export type WhoisResult = {
  status: boolean;
  time: number;
  result?: WhoisAnalyzeResult;
  error?: string;
};

export type WhoisAnalyzeResult = {
  domain: string;
  registrar: string;
  registrarURL: string;
  ianaId: string;
  whoisServer: string;
  updatedDate: string;
  creationDate: string;
  expirationDate: string;
  deletionDate?: string; // 添加域名删除日期
  availableDate?: string; // 添加域名再次可用日期
  status: DomainStatusProps[];
  nameServers: string[];
  registrantOrganization: string;
  registrantProvince: string;
  registrantCountry: string;
  registrantPhone: string;
  registrantEmail: string;
  dnssec: string;
  rawWhoisContent: string;

  cidr: string;
  inetNum: string;
  inet6Num: string;
  netRange: string;
  netName: string;
  netType: string;
  originAS: string;
};

export type DomainStatusProps = {
  status: string;
  url: string;
};

export const initialWhoisAnalyzeResult: WhoisAnalyzeResult = {
  domain: "",
  registrar: "Unknown",
  registrarURL: "Unknown",
  ianaId: "N/A",
  whoisServer: "Unknown",
  updatedDate: "Unknown",
  creationDate: "Unknown",
  expirationDate: "Unknown",
  deletionDate: "Unknown", // 初始化域名删除日期
  availableDate: "Unknown", // 初始化域名再次可用日期
  status: [],
  nameServers: [],
  registrantOrganization: "Unknown",
  registrantProvince: "Unknown",
  registrantCountry: "Unknown",
  registrantPhone: "Unknown",
  registrantEmail: "Unknown",
  dnssec: "",
  rawWhoisContent: "",

  cidr: "Unknown",
  inetNum: "Unknown",
  inet6Num: "Unknown",
  netRange: "Unknown",
  netName: "Unknown",
  netType: "Unknown",
  originAS: "Unknown",
};
