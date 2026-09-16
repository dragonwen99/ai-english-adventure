'use client';
import { useMemo, useState } from 'react';

const levels = [
  { id: 1, icon: '🌲', title: '单词森林', desc: '看中文，拼出英文', reward: 40 },
  { id: 2, icon: '🎧', title: '听音峡谷', desc: '听发音，完成拼写', reward: 50 },
  { id: 3, icon: '⛏️', title: '拼写矿洞', desc: '挑战容易写错的词', reward: 60 },
  { id: 4, icon: '🏰', title: '句子城堡', desc: '在句子里使用单词', reward: 70 },
  { id: 5, icon: '👾', title: '错词魔窟', desc: '追捕你的错词怪物', reward: 80 },
  { id: 6, icon: '🐲', title: '最终 Boss', desc: '综合挑战，夺回星星', reward: 120 },
];

const words = [
  { en: 'school', zh: '学校' }, { en: 'teacher', zh: '老师' }, { en: 'friend', zh: '朋友' },
  { en: 'library', zh: '图书馆' }, { en: 'beautiful', zh: '美丽的' }
];

export default function Home() {
  const [xp, setXp] = useState(320);
  const [stars, setStars] = useState(8);
  const [unlocked, setUnlocked] = useState(1);
  const [active, setActive] = useState<number | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [combo, setCombo] = useState(0);
  const [bossHp, setBossHp] = useState(100);
  const current = words[wordIndex % words.length];
  const progress = useMemo(() => Math.round(((unlocked - 1) / levels.length) * 100), [unlocked]);

  function startLevel(id:number){ if(id <= unlocked) { setActive(id); setAnswer(''); setWordIndex(0); setCombo(0); if(id===6) setBossHp(100); } }
  function submit(){
    if(answer.trim().toLowerCase() === current.en){
      const nextCombo = combo + 1; setCombo(nextCombo); setXp(v=>v+5+(nextCombo>=3?5:0));
      if(active===6) setBossHp(v=>Math.max(0,v-25));
      if(wordIndex >= 4){ const id=active||1; setStars(v=>v+3); setXp(v=>v+levels[id-1].reward); setUnlocked(v=>Math.min(6,Math.max(v,id+1))); setActive(null); }
      else { setWordIndex(v=>v+1); setAnswer(''); }
    } else { setCombo(0); setAnswer(''); }
  }

  if(active){
    return <main className="shell"><section className="battle">
      <button className="back" onClick={()=>setActive(null)}>← 返回地图</button>
      <div className="battleTop"><span>第 {active} 关 · {levels[active-1].title}</span><b>🔥 Combo {combo}</b></div>
      {active===6 && <div className="boss"><div className="bossFace">🐲</div><b>校园守护者</b><div className="hp"><i style={{width:`${bossHp}%`}} /></div><small>HP {bossHp}/100</small></div>}
      <div className="question"><small>第 {wordIndex+1} / 5 题</small><h2>{current.zh}</h2><p>输入对应的英文单词</p><input autoFocus value={answer} onChange={e=>setAnswer(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()} placeholder="在这里拼写…"/><button onClick={submit}>⚔️ 发动攻击</button></div>
      <p className="tip">答对 +5 XP · 连续答对 3 题触发暴击奖励</p>
    </section></main>
  }

  return <main className="shell">
    <header><div><span className="logo">⚡</span><b>英语冒险岛</b><small>小学英语 · AI闯关学习</small></div><nav><span>🔥 7天</span><span>⭐ {stars}</span><span>⚡ {xp} XP</span><span className="avatar">小冒险家</span></nav></header>
    <section className="hero"><div><small>三年级上册 · Unit 3</small><h1>失落的校园</h1><p>完成六重挑战，找回被单词怪偷走的知识星星。</p><button onClick={()=>startLevel(unlocked)}>▶ 继续今日冒险</button></div><div className="mascot">🦊<span>Lv. 6</span></div></section>
    <section className="stats"><div><b>{progress}%</b><span>本单元进度</span></div><div><b>{unlocked-1}/6</b><span>已通关</span></div><div><b>5</b><span>今日待复习</span></div><div><b>86%</b><span>本周正确率</span></div></section>
    <section className="map"><div className="mapTitle"><div><small>WORLD 01</small><h2>校园冒险地图</h2></div><p>学习行为就是战斗行为：答题、复习、听写都会推动冒险进度。</p></div>
      <div className="path">{levels.map((l,i)=>{const locked=l.id>unlocked; const done=l.id<unlocked; return <button key={l.id} disabled={locked} onClick={()=>startLevel(l.id)} className={`level ${done?'done':''} ${l.id===unlocked?'current':''}`}><span className="node">{locked?'🔒':l.icon}</span><div><small>关卡 0{l.id}</small><b>{l.title}</b><p>{l.desc}</p><em>{done?'⭐⭐⭐ 已通关':locked?'完成上一关解锁':`奖励 +${l.reward} XP`}</em></div></button>})}</div>
    </section>
    <section className="parent"><div><span>🤖</span><div><b>AI 学习助手</b><p>发现你对长单词拼写还不稳定。今天通关后，会自动安排 5 个薄弱词复习。</p></div></div><button>查看学习报告 →</button></section>
  </main>
}