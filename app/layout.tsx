import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '英语冒险岛', description: 'AI游戏化中小学生英语学习平台' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}