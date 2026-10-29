import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { Project } from '../types';

const BASE = import.meta.env.BASE_URL;

interface Props {
  project: Project;
  onClose: () => void;
}

/**
 * 项目案例页：点项目卡上的箭头打开。
 * 结构固定为「定位 → 关键数字 → 背景 → 技术栈 → 界面一览 → 工程亮点」，
 * 内容全部来自 data.ts 的 caseStudy，改文案不用动组件。
 */
export default function ProjectModal({ project, onClose }: Props) {
  const sheetRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const study = project.caseStudy;
  const label = {
    background: study?.labels?.background ?? '开发背景',
    stack: study?.labels?.stack ?? '技术栈',
    features: study?.labels?.features ?? '界面一览',
    highlights: study?.labels?.highlights ?? '工程上做了什么',
  };

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.classList.add('case-modal-open');
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !sheetRef.current) return;
      const focusable = Array.from(
        sheetRef.current.querySelectorAll<HTMLElement>('button, a[href]'),
      ).filter((element) => !element.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('case-modal-open');
      previousFocus?.focus();
    };
  }, [onClose]);

  if (!study) return null;

  const hero = study.features.find((item) => item.shot);
  const gallery = study.features.filter((item) => item !== hero);

  return createPortal(
    <div
      className="case-backdrop"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <article
        ref={sheetRef}
        className="case-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
      >
        <button ref={closeRef} type="button" className="case-close" onClick={onClose} aria-label="关闭项目详情">
          <X aria-hidden="true" />
        </button>

        <header className="case-head">
          <p className="case-kicker">
            CASE STUDY
            {study.badge && <span className="case-badge">{study.badge}</span>}
          </p>
          <h2 id="case-title">{project.title}</h2>
          <p className="case-tagline">{study.tagline}</p>
          <div className="case-meta">
            <span>{project.role}</span>
            <span>{project.period}</span>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="case-tag">{tag}</span>
            ))}
          </div>
        </header>

        {hero?.shot && (
          <figure className="case-hero">
            <img src={`${BASE}${hero.shot}`} alt={`${project.title}界面截图`} loading="lazy" decoding="async" />
          </figure>
        )}

        <dl className="case-stats">
          {study.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>

        <section className="case-block">
          <h3><i>01</i>{label.background}</h3>
          <div className="case-prose">
            {study.background.map((paragraph) => <p key={paragraph.slice(0, 12)}>{paragraph}</p>)}
          </div>
        </section>

        <section className="case-block">
          <h3><i>02</i>{label.stack}</h3>
          <div className="case-stack">
            {study.techStack.map((group) => (
              <div key={group.group} className="case-stack-group">
                <h4>{group.group}</h4>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="case-block">
          <h3><i>03</i>{label.features}</h3>
          <div className="case-shots">
            {gallery.map((item) => (
              <figure key={item.title} className={`case-shot${item.wide ? ' is-wide' : ''}`}>
                {item.shot && (
                  <img src={`${BASE}${item.shot}`} alt={`${item.title}界面`} loading="lazy" decoding="async" />
                )}
                <figcaption>
                  <b>{item.title}</b>
                  <span>{item.desc}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="case-block">
          <h3><i>04</i>{label.highlights}</h3>
          <ul className="case-highlights">
            {study.highlights.map((item) => (
              <li key={item.title}>
                <b>{item.title}</b>
                <span>{item.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        {study.note && <p className="case-note">{study.note}</p>}
      </article>
    </div>,
    document.body,
  );
}
