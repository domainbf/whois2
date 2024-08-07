// src/components/CardWithQRCode.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface CardWithQRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  qrCodeUrl: string;
}

const CardWithQRCode = React.forwardRef<HTMLDivElement, CardWithQRCodeProps>(
  ({ qrCodeUrl, className, ...props }, ref) => {
    const qrCodeImgUrl = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(
      qrCodeUrl
    )}&choe=UTF-8`;

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <img src={qrCodeImgUrl} alt="QR Code" />
      </div>
    );
  }
);

CardWithQRCode.displayName = "CardWithQRCode";

export { CardWithQRCode };
