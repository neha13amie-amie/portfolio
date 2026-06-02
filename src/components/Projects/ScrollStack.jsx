import { useLayoutEffect, useRef } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const inner = scroller.querySelector('.scroll-stack-inner');
    const endEl = inner.querySelector('.scroll-stack-end');
    const cards = Array.from(inner.querySelectorAll(':scope > .scroll-stack-card'));
    if (!cards.length) return;

    // Set up card spacing
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.transformOrigin = 'top center';
      card.style.willChange = 'transform';
    });

    const parse = (v, h) =>
      typeof v === 'string' && v.includes('%') ? (parseFloat(v) / 100) * h : parseFloat(v);

    const applyTransforms = () => {
      const scrollTop = window.scrollY;
      const vh = window.innerHeight;
      const stackPx = parse(stackPosition, vh);
      const scaleEndPx = parse(scaleEndPosition, vh);
      const endTop = endEl.getBoundingClientRect().top + scrollTop;
      const pinEnd = endTop - vh / 2;

      cards.forEach((card, i) => {
        const cardTop = card.getBoundingClientRect().top + scrollTop;
        const triggerStart = cardTop - stackPx - itemStackDistance * i;
        const triggerEnd = cardTop - scaleEndPx;

        // scale
        let sp = 0;
        if (scrollTop > triggerStart && scrollTop < triggerEnd) {
          sp = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
        } else if (scrollTop >= triggerEnd) {
          sp = 1;
        }
        const scale = 1 - sp * (1 - (baseScale + i * itemScale));

        // pin
        let ty = 0;
        if (scrollTop >= triggerStart && scrollTop <= pinEnd) {
          ty = scrollTop - cardTop + stackPx + itemStackDistance * i;
        } else if (scrollTop > pinEnd) {
          ty = pinEnd - cardTop + stackPx + itemStackDistance * i;
        }

        const rot = rotationAmount ? ` rotate(${(i * rotationAmount * sp).toFixed(2)}deg)` : '';
        card.style.transform = `translate3d(0,${ty.toFixed(2)}px,0) scale(${scale.toFixed(4)})${rot}`;

        if (blurAmount) {
          let topIdx = 0;
          cards.forEach((c, j) => {
            if (scrollTop >= c.getBoundingClientRect().top + scrollTop - stackPx - itemStackDistance * j) topIdx = j;
          });
          card.style.filter = i < topIdx ? `blur(${((topIdx - i) * blurAmount).toFixed(1)}px)` : '';
        }
      });
    };

    // Run once immediately
    applyTransforms();

    // Native scroll listener always works (Lenis drives native scroll position too)
    window.addEventListener('scroll', applyTransforms, { passive: true });
    window.addEventListener('resize', applyTransforms);

    // Also subscribe to Lenis if/when it's available for frame-perfect sync
    let lenis = window.__lenis;
    let retryId = null;
    const subscribe = () => {
      lenis = window.__lenis;
      if (lenis) lenis.on('scroll', applyTransforms);
      else retryId = setTimeout(subscribe, 50);
    };
    subscribe();

    return () => {
      window.removeEventListener('scroll', applyTransforms);
      window.removeEventListener('resize', applyTransforms);
      if (lenis) lenis.off('scroll', applyTransforms);
      if (retryId) clearTimeout(retryId);
    };
  }, [itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount, blurAmount, onStackComplete]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
