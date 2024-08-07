import * as React from "react";
import { cn } from "@/lib/utils";
import { Card as OriginalCard, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./ui/card";

interface CardWithQRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  qrCodeUrl: string;
}

const CardWithQRCode = React.forwardRef<HTMLDivElement, CardWithQRCodeProps>(
  ({ className, qrCodeUrl, ...props }, ref) => {
    const qrCodeSrc = `https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${encodeURIComponent(qrCodeUrl)}`;

    return (
      <OriginalCard ref={ref} className={cn("relative", className)} {...props}>
        <img src={qrCodeSrc} alt="QR Code" className="absolute bottom-4 right-4 w-16 h-16" />
        {props.children}
      </OriginalCard>
    );
  }
);
CardWithQRCode.displayName = "CardWithQRCode";

export { CardWithQRCode, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
