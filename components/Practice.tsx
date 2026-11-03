'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Printer, RefreshCw } from 'lucide-react';
import '@fontsource/zhi-mang-xing';
import '@fontsource/liu-jian-mao-cao';
import '@fontsource/zcool-kuaile';
import '@fontsource/caveat/400.css';
import '@fontsource/patrick-hand/400.css';
import '@fontsource/nunito/400.css';

type Module = 'hanzi' | 'math' | 'english' | 'pinyin';
const config = {
 hanzi: { title: '练字字帖', subtitle: '一笔一画，写出好字', initial: '天地人和 学习快乐', label: '练习内容', hint: '输入想要练习的汉字，空格和换行会自动忽略。' },
 math: { title: '口算练习', subtitle: '每天练一练，计算更熟练', initial: '', label: '运算范围', hint: '选择运算范围，生成适合孩子的加减法练习。' },
 english: { title: '英文书写', subtitle: '从 ABC 开始，爱上英文', initial: 'Apple\nHello\nGood morning\nThank you', label: '练习内容', hint: '每行输入一个字母、单词或短句。' },
 pinyin: { title: '拼音练习', subtitle: '打好基础，快乐学拼音', initial: 'ā á ǎ à\nb p m f\nd t n l\ng k h', label: '练习内容', hint: '每行输入一组拼音，可以使用空格分隔。' },
};
// 在用户主动生成时才随机出题，避免服务端和浏览器的初始内容不一致。
function makeProblems(max: number) { return Array.from({ length: 40 }, () => { const a = Math.floor(Math.random() * (max + 1)); const b = Math.floor(Math.random() * (max - a + 1)); return Math.random() < .5 ? a + ' + ' + b + ' =' : (a + b) + ' − ' + b + ' ='; }); }
export default function Practice({ type }: { type: Module }) {
 const [font, setFont] = useState('serif');
 const item = config[type]; const [content, setContent] = useState(item.initial); const [range, setRange] = useState(20); const [problems, setProblems] = useState<string[]>([]);
 const lines = content.split('\n').map(line => line.trim()).filter(Boolean).slice(0, 12);
 return <><header className="header no-print"><div className="nav wrap"><Link href="/" className="brand"><span className="brand-mark">✳</span><span>小鹿练习室<small>GROW A LITTLE EVERY DAY</small></span></Link><Link href="/" className="back-link"><ArrowLeft size={16}/> 返回首页</Link></div></header><main className="practice-page wrap"><div className="practice-heading no-print"><Link href="/">首页</Link> / <span>{item.title}</span><div className="overline"><span>✳</span> PRACTICE MAKES PROGRESS</div><h1>{item.title}<em> · {item.subtitle}</em></h1><p>设置你的练习内容，准备好就可以打印啦。</p></div><div className="workspace"><aside className="settings no-print"><div className="settings-title"><span>✎</span><div><h2>练习设置</h2><p>按需定制你的练习纸</p></div></div><label htmlFor="content">{item.label}</label>{type === 'math' ? <select id="content" value={range} onChange={e => setRange(Number(e.target.value))}><option value={10}>10 以内</option><option value={20}>20 以内</option><option value={100}>100 以内</option></select> : <textarea id="content" value={content} maxLength={300} onChange={e => setContent(e.target.value)} rows={8} />}<p className="hint">{item.hint}</p>{type === 'hanzi' && <><label htmlFor="font">字帖字体</label><select id="font" value={font} onChange={e => setFont(e.target.value)}><option value="serif">默认字体</option><option value="Zhi Mang Xing">行书 · 志莽行书</option><option value="Liu Jian Mao Cao">草书 · 刘建毛草</option><option value="ZCOOL KuaiLe">儿童字体 · 站酷快乐体</option></select><p className="hint">选择字体后，预览和打印会同步更新。</p></>}{(type === 'english' || type === 'pinyin') && <><label htmlFor="font">书写字体</label><select id="font" value={font} onChange={e => setFont(e.target.value)}><option value="serif">默认字体</option><option value="Patrick Hand">手写体 · Patrick Hand</option><option value="Nunito">圆体 · Nunito</option>{type === 'english' && <option value="Caveat">连笔手写体 · Caveat</option>}</select><p className="hint">选择字体后，预览和打印会同步更新。</p></>}{type === 'math' && <button className="secondary" onClick={() => setProblems(makeProblems(range))}><RefreshCw size={16}/> 生成练习题</button>}<button className="primary print-button" onClick={async () => { await document.fonts.ready; window.print(); }}><Printer size={17}/> 打印练习纸</button><div className="settings-tip">✦ &nbsp; 小提示<br/><span>打印时建议选择 A4 纸张，关闭页眉和页脚，效果更好。</span></div></aside><section className="preview-area"><div className="preview-bar no-print"><div><strong>练习纸预览</strong><span>所见即所得，准备好就打印吧</span></div><span className="paper-size">A4 纸张</span></div><div className="print-sheet"><div className="sheet-head"><div><small>MY PRACTICE SHEET</small><h2>{item.title}</h2></div><span>姓名：____________　 日期：____________</span></div>{type === 'hanzi' ? <div className="hanzi-grid" style={{ fontFamily: `"${font}", serif` }}>{Array.from({length: 80}, (_, i) => <div className="hanzi-cell" key={i}><span>{Array.from(content.replace(/\s/g, '')).slice(0, 80)[i] || ''}</span></div>)}</div> : type === 'math' ? <div className="math-grid">{(problems.length ? problems : Array.from({length: 40}, (_, i) => (i % 10) + ' + ' + ((i + 3) % 10) + ' =')).map((problem, i) => <div key={i}>{problem}<span>______</span></div>)}</div> : <div className="writing-lines" style={{ fontFamily: `"${font}", serif` }}>{Array.from({length: 12}, (_, i) => <div className="writing-row" key={i}><span>{lines[i % Math.max(lines.length, 1)] || ''}</span></div>)}</div>}<div className="sheet-footer"><span>小鹿练习室 · 每天进步一点点</span><span>✳ KEEP GOING!</span></div></div></section></div></main></>;
}
