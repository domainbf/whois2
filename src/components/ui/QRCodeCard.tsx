// src/components/QRCodeCard.tsx
import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"; // 导入卡片组件

const QRCode = ({ value }) => {
  // 使用 CDN 生成二维码
  return (
    <img
      src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(value)}&size=100x100`}
      alt="二维码"
    />
  );
};

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
        <QRCode value={currentUrl} /> {/* 使用当前 URL 生成二维码 */}
      </CardContent>
      <CardFooter>
        <p>这是二维码的底部内容</p>
        <div className="absolute bottom-4 right-4"> {/* 添加绝对定位 */}
          <QRCode value={currentUrl} /> {/* 小二维码 */}
        </div>
      </CardFooter>
    </Card>
  );
};

// 导出组件
export { QRCodeCard };
