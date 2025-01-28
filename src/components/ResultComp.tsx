import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  CornerDownRight,
  Loader2,
  Search,
  Send,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { cn, isEnter, toSearchURI } from "@/lib/utils";
import ResultComp from './ResultComp';

interface FixedInputProps {
  inputDomain: string;
  setInputDomain: (value: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const FixedInput: React.FC<FixedInputProps> = ({ inputDomain, setInputDomain, loading, setLoading }) => {
  const goStage = (target: string) => {
    setLoading(true);
    window.location.href = toSearchURI(inputDomain);
  };

  // 创建一个符合 ResultComp 预期的 result 对象
  const result = {
    deletionDate: "2023-01-01T00:00:00Z", // 示例日期
    availableDate: "2023-12-31T00:00:00Z", // 示例日期
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta property="og:title" content="WHOIS.LS - 查询域名和IP信息" />
        <meta property="og:description" content="使用 WHOIS.LS 查询域名、IPv4、IPv6、ASN 和 CIDR 信息。" />
        <meta property="og:image" content="https://example.com/image.jpg" />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:type" content="website" />
      </Head>
      <main className={"w-full h-full grid place-items-center p-4 md:p-6"}>
        <div className={"flex flex-col items-center w-full h-fit max-w-[568px]"}>
          <h1 className={"text-lg md:text-2xl lg:text-3xl font-bold flex flex-row items-center select-none"}>
            <Search className={`w-4 h-4 md:w-6 md:h-6 mr-1 md:mr-1.5 shrink-0`} />
            WHOIS.LS
          </h1>
          <div className={"relative flex flex-row items-center w-full mt-2"}>
            <Input
              className={`w-full text-center transition-all duration-300 hover:shadow`}
              placeholder={`输入要查询的内容 ( whois.ls, 8.8.8.8)`}
              value={inputDomain}
              onChange={(e) => setInputDomain(e.target.value)}
              onKeyDown={(e) => {
                if (isEnter(e)) {
                  goStage(inputDomain);
                }
              }}
              style={{ touchAction: 'manipulation', userSelect: 'none' }} // 禁止页面缩放
            />
            <Link href={toSearchURI(inputDomain)} className={`absolute right-0`} onClick={() => inputDomain.length > 0 && goStage(inputDomain)}>
              <Button size={`icon`} variant={`outline`} className={`rounded-l-none transition`} disabled={inputDomain.length === 0}>
                {loading ? (
                  <Loader2 className={`w-4 h-4 animate-spin`} />
                ) : (
                  <Send className={`w-4 h-4`} />
                )}
              </Button>
            </Link>
          </div>
          <div className={cn(`flex items-center flex-row w-full text-xs mt-1.5 select-none text-secondary transition`, loading && "text-primary")}>
            <div className={`flex-grow`} />
            <CornerDownRight className={`w-3 h-3 mr-1`} />
            <p className={`px-1 py-0.5 border rounded-md`}>Enter</p>
          </div>
          {/* 使用对象作为 result 属性 */}
          <ResultComp result={result} target={inputDomain} />
        </div>
      </main>
    </>
  );
};

export default FixedInput;
