import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: '小鹿练习室 - 让每天的练习更有趣', template: '%s | 小鹿练习室' },
  description: '免费在线生成练字字帖、口算练习、英文书写和拼音练习，轻松定制并打印适合孩子的学习资料。',
  keywords: ['练字字帖', '口算练习', '英文书写', '拼音练习', '在线生成', '打印'],
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
