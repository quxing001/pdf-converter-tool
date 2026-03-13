import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PDF 转换工具 - 在线免费转换',
  description: '快速转换 PDF 文档，支持 PDF 转 Word、Excel、PPT 等多种格式',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
