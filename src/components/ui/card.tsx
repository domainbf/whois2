// src/components/ui/card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

// Card Components
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm relative", // 添加 relative
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// QRCodeCard Component
const QRCodeCard = ({ className }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''; // 获取当前页面的 URL

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>二维码</CardTitle>
        <CardDescription>扫描下面的二维码以访问此页面</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(currentUrl)}&size=200x200`}
          alt="二维码"
        /> {/* 使用当前 URL 生成二维码 */}
      </CardContent>
      <CardFooter>
        <p>这是二维码的底部内容</p>
        <div className="absolute bottom-4 right-4"> {/* 添加绝对定位 */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(currentUrl)}&size=100x100`}
            alt="小二维码"
          /> {/* 小二维码 */}
        </div>
      </CardFooter>
    </Card>
  );
};

// 导出组件
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  QRCodeCard, // 导出 QRCodeCard
};
