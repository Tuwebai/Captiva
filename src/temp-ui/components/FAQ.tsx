import { useState } from 'react';

import { tempUiBridge } from '../bridge';

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <button className="w-full flex items-center justify-between gap-4 text-left px-6 py-5" onClick={() => setOpen((value) => !value)}>
        <span className="text-white font-semibold">{question}</span>
        <span className={`text-violet-300 transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open ? <p className="px-6 pb-5 text-zinc-400 leading-relaxed">{answer}</p> : null}
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-5 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-violet-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{tempUiBridge.faq.title}</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-4">{tempUiBridge.faq.description}</p>
        </div>

        <div className="space-y-3 mb-12">
          {tempUiBridge.faq.items.map((item, index) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
