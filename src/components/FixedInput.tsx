// src/components/FixedInput.tsx
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { isEnter, toSearchURI } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addHistory } from "@/lib/history";
import ResultComp from './ResultComp';
import { Search } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { VERSION } from "@/lib/env";

const FixedInput = ({ inputDomain, setInputDomain, loading, setLoading }) => {
  const goStage = (target: string) => {
    setLoading(true);
    window.location.href = toSearchURI(inputDomain);
  };

  const handleFocus = () => {
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  };

  const handleBlur = () => {
    document.body.style.position = '';
    document.body.style.width = '';
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md p-4 z-50">
      <div className="relative flex flex-row items-center w-full mt-2">
        <Input
          className="w-full text-center transition-all duration-300 hover:shadow"
          placeholder="domain name (e.g. google.com, 8.8.8.8)"
          value={inputDomain}
          onChange={(e) => setInputDomain(e.target.value)}
          onKeyDown={(e) => {
            if (isEnter(e)) {
              goStage(inputDomain);
            }
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Button
          size="icon"
          variant="outline"
          className="absolute right-0 rounded-l-none"
          onClick={() => goStage(inputDomain)}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default FixedInput;
