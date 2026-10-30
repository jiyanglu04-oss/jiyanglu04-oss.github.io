import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { projects } from '../data';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

const categories = [
  { label: '全部', id: 'all' }, { label: 'Vibe Coding', id: 'Vibe Coding' },
  { label: 'AI 智能', id: 'AI智能' }, { label: '调研竞技', id: '竞技' },
  { label: '自媒体', id: '新媒体' }, { label: '创业', id: '创业' },
];

const coverFor = (project: Project) => ({
  'Vibe Coding': 'xueban/cover.webp',
  AI智能: 'yaoshan-cover.webp', 竞技: 'zhengda-cover.webp', 创业: 'shopee-store.webp', 新媒体: 'xhs-profile-2026-10.webp',
}[project.category] || 'avatar.webp');

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** 转盘每一侧的夹角（度）。34° 有纵深感，卡片正面又还看得清字 */
const SIDE_ANGLE = 34;
/** 相邻卡片的水平间距系数（相对卡片宽度） */
const SPACING_RATIO = 0.68;
/** 侧面卡片后退的深度 */
const DEPTH = 300;
/** 阻尼系数：越大越跟手 */
const EASE = 0.16;

/** 间距按卡片实际宽度算 —— 卡片宽度本身是 clamp()，写死像素会在窄屏上叠成一坨 */
const getSpacing = (deck: HTMLElement | null) => {
  const card = deck?.children[0] as HTMLElement | undefined;
  return (card?.offsetWidth || 360) * SPACING_RATIO;
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [active, setActive] = useState(0);
  /** 打开的项目案例（有 caseStudy 的项目点箭头会进来） */
  const [caseId, setCaseId] = useState<string | null>(null);
  const caseProject = projects.find((item) => item.id === caseId) ?? null;
  const deckRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startPos: 0,
    moved: false,
    spacing: 300,
    /** 只有确认是「拖动」之后才捕获指针，否则 click 会被劫持到容器上 */
    pointerId: null as number | null,
    /** 按下时压在哪张卡上（指针捕获后 click 的 target 会丢失，用它兜底） */
    downIndex: null as number | null,
  });

  const filtered = selectedCategory === 'all' ? projects : projects.filter((item) => item.category === selectedCategory);

  /**
   * 把 pos（可以是小数）投影成每张卡片的 3D 变换。
   * 位置差做环形取模 —— 所以 4 张卡能无限往任一方向转，不会撞到边界。
   */
  const layout = useCallback(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const cards = Array.from(deck.children) as HTMLElement[];
    const total = cards.length;
    if (!total) return;

    const spacing = getSpacing(deck);
    const pos = posRef.current;

    cards.forEach((card, index) => {
      let delta = index - pos;
      delta = ((delta + total / 2) % total + total) % total - total / 2;

      const distance = Math.abs(delta);
      // 只留正中一张 + 左右各一张，更远的直接收起来，否则转盘会糊成一团
      const visible = distance <= 1.55;

      card.style.opacity = visible ? '1' : '0';
      card.style.zIndex = String(100 - Math.round(distance * 10));
      card.style.pointerEvents = visible ? 'auto' : 'none';
      card.classList.toggle('is-center', distance < 0.5);
      // 侧卡压一层墨黑蒙层：既不抢主体，也保证卡面文字不会互相打架
      card.style.setProperty('--deck-dim', String(clamp((distance - 0.1) * 0.78, 0, 0.86)));
      card.style.transform = [
        'translate(-50%, -50%)',
        `translateX(${(delta * spacing).toFixed(2)}px)`,
        `translateZ(${(-distance * DEPTH).toFixed(2)}px)`,
        `rotateY(${(-delta * SIDE_ANGLE).toFixed(2)}deg)`,
      ].join(' ');
    });
  }, []);

  const settle = useCallback((index: number) => {
    const deck = deckRef.current;
    const total = deck ? deck.children.length : 0;
    if (!total) return;
    setActive(((Math.round(index) % total) + total) % total);
  }, []);

  const tick = useCallback(() => {
    const diff = targetRef.current - posRef.current;
    if (Math.abs(diff) < 0.002) {
      posRef.current = targetRef.current;
      layout();
      rafRef.current = 0;
      settle(posRef.current);
      return;
    }
    posRef.current += diff * EASE;
    layout();
    rafRef.current = requestAnimationFrame(tick);
  }, [layout, settle]);

  const run = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const goTo = useCallback((index: number) => {
    targetRef.current = index;
    run();
  }, [run]);

  // 切换分类后重新归零
  useEffect(() => {
    posRef.current = 0;
    targetRef.current = 0;
    setActive(0);
    layout();
  }, [selectedCategory, layout]);

  // 尺寸变化时重排
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const observer = new ResizeObserver(() => layout());
    observer.observe(deck);
    layout();
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [layout, filtered.length]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    const deck = deckRef.current;
    if (!deck) return;
    const card = (event.target as HTMLElement).closest?.('.nb-deck-card') as HTMLElement | null;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startPos: posRef.current,
      moved: false,
      spacing: getSpacing(deck),
      // 关键：按下时**不**捕获指针。一旦在这里 setPointerCapture，
      // 后续 pointerup / click 的 target 都会变成容器，卡片上的 onClick 永远不会触发。
      pointerId: null,
      downIndex: card ? Array.from(deck.children).indexOf(card) : null,
    };
    deck.dataset.dragging = 'true';
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const deck = deckRef.current;
    if (!drag.active || !deck) return;
    const dx = event.clientX - drag.startX;
    if (!drag.moved) {
      // 4px 以内算手抖/点击，不转动卡片
      if (Math.abs(dx) <= 4) return;
      // 确认要拖了才捕获指针 —— 拖出容器也跟手，同时不污染「点击」
      drag.moved = true;
      drag.pointerId = event.pointerId;
      wrapRef.current?.setPointerCapture?.(event.pointerId);
    }
    posRef.current = drag.startPos - dx / drag.spacing;
    targetRef.current = posRef.current;
    layout();
  };

  const endDrag = (event?: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const deck = deckRef.current;
    if (!drag.active || !deck) return;
    drag.active = false;
    deck.dataset.dragging = 'false';
    if (drag.pointerId != null) {
      const target = wrapRef.current;
      if (target?.hasPointerCapture?.(drag.pointerId)) target.releasePointerCapture(drag.pointerId);
      drag.pointerId = null;
    }
    if (event && deck.hasPointerCapture?.(event.pointerId)) deck.releasePointerCapture(event.pointerId);
    goTo(Math.round(posRef.current));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(Math.round(targetRef.current) - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); goTo(Math.round(targetRef.current) + 1); }
  };

  const total = filtered.length;

  /**
   * 点击任意一张卡 → 直接把它转到正中。
   * 统一放在容器的捕获阶段处理，因为指针捕获会把 click 的 target 改写成容器，
   * 卡片自己的 onClick 并不可靠（拖动后还要吞掉那次 click，避免误触卡内链接）。
   */
  const handleDeckClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const deck = deckRef.current;
    if (!deck) return;
    const drag = dragRef.current;

    if (drag.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.moved = false;
      return;
    }

    const card = (event.target as HTMLElement).closest?.('.nb-deck-card') as HTMLElement | null;
    // 万一点击落在容器上（指针捕获场景），用按下时压住的那张兜底
    const index = card ? Array.from(deck.children).indexOf(card) : drag.downIndex;
    drag.downIndex = null;
    if (index == null || index < 0) return;
    // 正中那张放行：卡里的箭头链接照常可点
    if (index === active) return;

    event.preventDefault();
    event.stopPropagation();
    goTo(index);
  };

  return (
    <section id="projects" className="editorial-projects">
      <div className="projects-head" data-reveal>
        <div><div className="section-kicker light section-title-english">RESEARCH &amp; PROJECTS</div><h2>研究与项目</h2></div>
        <div className="project-drag-hint" aria-hidden="true"><span>拖动旋转</span><i>↔</i></div>
      </div>

      <div className="project-filters">
        {categories.map((item) => (
          <button key={item.id} onClick={() => setSelectedCategory(item.id)} className={selectedCategory === item.id ? 'active' : ''}>{item.label}</button>
        ))}
      </div>

      <div
        className="nb-deck-wrap"
        data-reveal
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={(event) => dragRef.current.active && endDrag(event)}
      >
        <div
          className="nb-deck"
          ref={deckRef}
          role="group"
          aria-label="项目 3D 卡片转盘"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onClickCapture={handleDeckClick}
        >
          {filtered.map((project, index) => (
            <article
              key={project.id}
              className="project-poster nb-deck-card"
              onDragStart={(event) => event.preventDefault()}
            >
              <img src={`${import.meta.env.BASE_URL}${coverFor(project)}`} alt={project.title} draggable="false" loading="lazy" decoding="async" />
              <div className="poster-shade" />
              <div className="poster-number">{String(index + 1).padStart(2, '0')}</div>
              {project.caseStudy?.badge && <div className="poster-badge">{project.caseStudy.badge}</div>}
              {project.award && <div className="poster-award"><Trophy /> {project.award}</div>}
              <div className="poster-copy">
                <small>{project.category} · {project.period}</small>
                <h3>{project.title}</h3>
                <p>{project.description[0]}</p>
                <div className="poster-tags">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              {project.caseStudy ? (
                <button
                  type="button"
                  className="poster-action"
                  onClick={() => setCaseId(project.id)}
                  aria-label={`查看${project.title}的项目详情`}
                >
                  <ArrowUpRight />
                </button>
              ) : (
                <a
                  href={project.link || 'mailto:1346514923@qq.com'}
                  target={project.link ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={project.actionLabel}
                >
                  <ArrowUpRight />
                </a>
              )}
              <span className="nb-deck-scrim" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>

      <div className="nb-deck-controls">
        <button type="button" className="nb-deck-arrow" onClick={() => goTo(Math.round(targetRef.current) - 1)} aria-label="上一个项目">
          <ChevronLeft />
        </button>
        <span className="nb-deck-counter" aria-live="polite">
          <b>{String(active + 1).padStart(2, '0')}</b> / {String(total).padStart(2, '0')}
        </span>
        <button type="button" className="nb-deck-arrow" onClick={() => goTo(Math.round(targetRef.current) + 1)} aria-label="下一个项目">
          <ChevronRight />
        </button>
      </div>

      <div className="projects-note">拖动卡片转盘或按 ← → 切换项目；点击两侧卡片可转到它，点中间的按钮看详情。</div>

      {caseProject?.caseStudy && (
        <ProjectModal project={caseProject} onClose={() => setCaseId(null)} />
      )}
    </section>
  );
}
