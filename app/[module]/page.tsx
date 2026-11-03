import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Practice from '../../components/Practice';

const modules = {
  hanzi: { title: '练字字帖', description: '在线生成汉字田字格练字字帖，自定义内容并打印。' },
  math: { title: '口算练习', description: '在线生成加减法口算练习题，选择范围并打印。' },
  english: { title: '英文书写', description: '在线生成英文单词书写练习，轻松打印英文练习纸。' },
  pinyin: { title: '拼音练习', description: '在线生成拼音书写练习，帮助孩子练习声母、韵母和声调。' },
} as const;
type Module = keyof typeof modules;
export function generateStaticParams() { return Object.keys(modules).map((module) => ({ module })); }
export async function generateMetadata({ params }: { params: Promise<{ module: string }> }): Promise<Metadata> { const { module } = await params; const item = modules[module as Module]; return item ? { title: item.title, description: item.description } : {}; }
export default async function Page({ params }: { params: Promise<{ module: string }> }) { const { module } = await params; if (!(module in modules)) notFound(); return <Practice type={module as Module} />; }
