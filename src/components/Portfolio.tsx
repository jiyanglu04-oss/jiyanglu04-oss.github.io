import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Camera,
  ChartNoAxesCombined,
  Clapperboard,
  Eye,
  Heart,
  Sparkles,
} from 'lucide-react';
import { personalInfo } from '../data';
import { mediaUrl } from '../media';
import Folio3D from './Folio3D';

const BASE = import.meta.env.BASE_URL;

type EditingWork = { title: string; platform: string; url: string };
type ImageWork = { src: string; title: string; source: string };
type OperationWork = { title: string; type: string; url: string; cover: string; views: string; likes: string; saves: string };

const editingTypes = ['口播', '混剪', '宣传'] as const;
type EditingType = (typeof editingTypes)[number];

const speakingWorks: EditingWork[] = [
  { title: '口播作品 01', platform: '微信视频号', url: 'talk-01.mp4' },
  { title: '口播作品 02', platform: '小红书', url: 'talk-02.mp4' },
  { title: '口播作品 03', platform: '小红书', url: 'talk-03.mp4' },
];

const mixedWorks: EditingWork[] = [
  { title: '混剪作品 01', platform: '小红书', url: 'mixed-01.mp4' },
  { title: '混剪作品 02', platform: '小红书', url: 'mixed-02.mp4' },
  { title: '混剪作品 03', platform: '小红书', url: 'mixed-03.mp4' },
  { title: '混剪作品 04', platform: '小红书', url: 'mixed-04.mp4' },
];

const promotionWorks: EditingWork[] = [
  { title: '宣传剪辑作品 01', platform: '微信视频号', url: 'promotion-link-01.mp4' },
  { title: '宣传剪辑作品 02', platform: '微信视频号', url: 'promotion-link-02.mp4' },
  { title: '宣传剪辑作品 03', platform: '微信视频号', url: 'promotion-link-03.mp4' },
  { title: '宣传剪辑作品 04', platform: '微信视频号', url: 'promotion-link-04.mp4' },
  { title: '药膳智环项目宣传视频', platform: '药膳智环 · 作品 01', url: 'promotion-video-01.mp4' },
  { title: '药膳智环项目宣传视频', platform: '药膳智环 · 作品 02', url: 'promotion-video-02.mp4' },
];

const photoWorks: ImageWork[] = [
  { src: 'photography-01.jpg', title: '城市影像组照 01', source: 'IMG_3766.JPG' },
  { src: 'photography-02.jpg', title: '城市影像组照 02', source: 'IMG_3750.JPG' },
  { src: 'photography-03.jpg', title: '城市影像组照 03', source: 'IMG_0492 - 副本.JPG' },
  { src: 'photography-04.jpg', title: '城市影像组照 04', source: 'IMG_0494.JPG' },
  { src: 'photography-05.jpg', title: '城市影像组照 05', source: 'IMG_0495 - 副本.JPG' },
  { src: 'photography-06.jpg', title: '城市影像组照 06', source: 'IMG_0493.JPG' },
  { src: 'photography-07.jpg', title: '城市影像组照 07', source: 'IMG_0429 - 副本.JPG' },
  { src: 'photography-08.jpg', title: '城市影像组照 08', source: 'IMG_3784.JPG' },
  { src: 'photography-09.jpg', title: '城市影像组照 09', source: 'IMG_2242.JPG' },
];

const aiImageWorks: ImageWork[] = [
  { src: 'ai-work-01.png', title: 'AI 空间视觉作品 01', source: '高端复式住宅场景' },
  { src: 'ai-work-02.png', title: 'AI 家居场景作品 02', source: '家庭生活与智能家电' },
  { src: 'ai-work-03.png', title: 'AI 空间视觉作品 03', source: '现代复式住宅场景' },
  { src: 'ai-work-04.png', title: 'AI 家居场景作品 04', source: '自然光居家生活场景' },
  { src: 'ai-work-05.png', title: 'AI 家居场景作品 05', source: '亲子家庭清洁场景' },
  { src: 'ai-work-06.jpg', title: 'AI 家居场景作品 06', source: '家庭陪伴与智能家居场景' },
];

const operationWorks: OperationWork[] = [
  { title: '在珠海，这些景点真的好好逛～（附旅行路线）', type: '旅行攻略', url: 'http://xhslink.com/o/7NLHo20Tbuw', cover: 'xhs-work-01.jpg', views: '47,855', likes: '670', saves: '378' },
  { title: '苹果手机这样调色，30秒调出风光大片', type: '摄影教程', url: 'http://xhslink.com/o/AwjWhwxNrbf', cover: 'xhs-work-02.jpg', views: '27,128', likes: '326', saves: '288' },
  { title: '十多年前的单反真的与时代脱节了吗？', type: '器材分享', url: 'http://xhslink.com/o/8AehS15KjFu', cover: 'xhs-work-03.jpg', views: '40,415', likes: '529', saves: '119' },
  { title: '不要去李子坝人挤人啦！这里人少又好拍！', type: '机位分享', url: 'http://xhslink.com/o/4MbMW4KKw2Z', cover: 'xhs-work-04.jpg', views: '37,814', likes: '1,068', saves: '1,401' },
  { title: '广州9个机位大公开！摄影党速速码住！', type: '机位分享', url: 'http://xhslink.com/o/6FhRXMZSeXq', cover: 'xhs-work-05.jpg', views: '18,506', likes: '480', saves: '414' },
  { title: '一个县城女孩的十年｜一切都来得及', type: '成长故事', url: 'http://xhslink.com/o/A6G7QLSO1MP', cover: 'xhs-work-06.png', views: '24,971', likes: '512', saves: '202' },
];

/** 书本的四个章节 —— 一章 = 一个跨页（左扉页 + 右作品页） */
const chapters = [
  {
    id: 'editing',
    label: '剪辑作品',
    english: 'EDITING WORKS',
    title: '影像剪辑与动态叙事',
    description: '口播、混剪与宣传片，从脚本、拍摄到成片都在自己手里完成。',
    note: '云端存储 · 站内播放',
    count: 13,
    unit: '支视频',
    icon: Clapperboard,
    tint: 'lime',
  },
  {
    id: 'photography',
    label: '摄影作品',
    english: 'PHOTOGRAPHY',
    title: '摄影创作与视觉观察',
    description: '城市、风景与人文的一组组影像，视觉中国签约摄影师。',
    note: '点击查看原图',
    count: 9,
    unit: '组照片',
    icon: Camera,
    tint: 'blue',
  },
  {
    id: 'ai-images',
    label: 'AI 生图',
    english: 'AI IMAGE WORKS',
    title: '生成式视觉与创意实验',
    description: '用生成模型做空间与家居场景的商业素材实验，探索可控性。',
    note: '点击查看原图',
    count: 6,
    unit: '组作品',
    icon: Sparkles,
    tint: 'pink',
  },
  {
    id: 'operations',
    label: '运营经历',
    english: 'XIAOHONGSHU CASES',
    title: '小红书爆款内容作品',
    description: '选题、制作、发布与数据复盘，用真实的播放与收藏说话。',
    note: '播放 / 点赞 / 收藏',
    count: 6,
    unit: '篇笔记',
    icon: ChartNoAxesCombined,
    tint: 'yellow',
  },
];

const pad = (value: number) => String(value).padStart(2, '0');
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * 书页里只放缩略图（原图动辄 1–2MB，缩略图 20–50KB）；
 * 「查看原图」的 href 仍然指向原图，点开才是高清。
 */
const thumbOf = (src: string) => src.replace(/\.(jpe?g|png)$/i, '.thumb.webp');

/** 窄屏降级用：不渲染 3D 书，直接纵向读 */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export default function Portfolio({ onContactMe }: { onContactMe?: () => void }) {
  /** 0..4：4 = 后记 + 封底的最后一跨页 */
  const [spread, setSpread] = useState(0);
  const [editingType, setEditingType] = useState<EditingType>('口播');
  const [delays, setDelays] = useState<number[]>([]);
  const chapterRef = useRef(0);
  const timers = useRef<number[]>([]);
  const gestureRef = useRef<{ x: number; swiped: boolean } | null>(null);
  const narrow = useMediaQuery('(max-width: 900px)');

  const total = chapters.length;

  useEffect(() => {
    chapterRef.current = Math.min(spread, total - 1);
  }, [spread, total]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const goTo = (next: number) => {
    const to = clamp(next, 0, total);
    if (to === spread) return;

    // 跨页大于 1 时逐页错峰翻，才像「一页一页翻过去」
    const step = 120;
    const map = new Array(total).fill(0);
    if (to > spread) {
      for (let i = spread; i < to; i += 1) map[i] = (i - spread) * step;
    } else {
      for (let i = spread - 1; i >= to; i -= 1) map[i] = (spread - 1 - i) * step;
    }

    setDelays(map);
    setSpread(to);

    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [window.setTimeout(() => setDelays([]), 820 + total * step)];
  };

  const editingWorks = editingType === '口播' ? speakingWorks : editingType === '混剪' ? mixedWorks : promotionWorks;

  /* ------------------------------ 内容块 ------------------------------ */

  const worksBody = (id: string) => {
    if (id === 'editing') {
      return (
        <div className="folio-clips">
          {editingWorks.map((work, index) => (
            <article className="folio-clip" key={work.url}>
              <video controls preload="metadata" playsInline aria-label={work.title}>
                <source src={mediaUrl(work.url)} type="video/mp4" />
                您的浏览器不支持视频播放。
              </video>
              <div className="folio-clip-cap">
                <i>{pad(index + 1)}</i>
                <div>
                  <b>{work.title}</b>
                  <span>{work.platform}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (id === 'photography' || id === 'ai-images') {
      const list = id === 'photography' ? photoWorks : aiImageWorks;
      return (
        <div className={`folio-plates${id === 'ai-images' ? ' is-wide' : ''}`}>
          {list.map((work, index) => (
            <a
              className="folio-plate"
              key={work.src}
              href={`${BASE}${work.src}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`查看${work.title}原图`}
            >
              <span className="folio-plate-img">
                <img src={`${BASE}${thumbOf(work.src)}`} alt={work.title} loading="lazy" decoding="async" />
              </span>
              <span className="folio-plate-cap">
                <i>{pad(index + 1)}</i>
                {work.title}
              </span>
            </a>
          ))}
        </div>
      );
    }

    return (
      <div className="folio-cases">
        {operationWorks.map((work, index) => (
          <a className="folio-case" key={work.url} href={work.url} target="_blank" rel="noopener noreferrer">
            <span className="folio-case-cover">
              <img src={`${BASE}${thumbOf(work.cover)}`} alt={work.title} loading="lazy" decoding="async" />
              <i>{pad(index + 1)}</i>
            </span>
            <span className="folio-case-body">
              <small>{work.type}</small>
              <b>{work.title}</b>
              <span className="folio-case-metrics">
                <span><Eye aria-hidden="true" />{work.views}</span>
                <span><Heart aria-hidden="true" />{work.likes}</span>
                <span><Bookmark aria-hidden="true" />{work.saves}</span>
              </span>
            </span>
            <ArrowUpRight className="folio-case-go" aria-hidden="true" />
          </a>
        ))}
      </div>
    );
  };

  /** 左页：章节扉页 */
  const opener = (index: number) => {
    const chapter = chapters[index];
    const Icon = chapter.icon;
    return (
      <div className="folio-page folio-page--opener" data-tint={chapter.tint}>
        <div className="folio-watermark" aria-hidden="true">{pad(index + 1)}</div>

        <header className="folio-opener-top">
          <span className="folio-chapter-no">CH. {pad(index + 1)}</span>
          <span className="folio-chapter-cn">{chapter.label}</span>
        </header>

        <div className="folio-opener-body">
          <h3>{chapter.title}</h3>
          <p>{chapter.description}</p>
          <span className="folio-rule" aria-hidden="true" />
          <ul className="folio-opener-meta">
            <li>
              <b>{chapter.count}</b>
              <span>{chapter.unit}</span>
            </li>
            <li>
              <b>{chapter.note}</b>
              <span>浏览方式</span>
            </li>
          </ul>
        </div>

        <footer className="folio-opener-foot">
          <span className="folio-stamp">
            <Icon aria-hidden="true" />
          </span>
          <span className="folio-page-no">{pad(index * 2 + 1)}</span>
        </footer>
      </div>
    );
  };

  /** 右页：章节作品 */
  const worksPage = (index: number) => {
    const chapter = chapters[index];
    return (
      <div className="folio-page folio-page--works" data-tint={chapter.tint}>
        <header className="folio-works-head">
          <div>
            <small>{chapter.english}</small>
            <h4>{chapter.label}</h4>
          </div>
          <span className="folio-works-note">{chapter.note}</span>
        </header>

        {chapter.id === 'editing' && (
          <div className="folio-tabs" role="tablist" aria-label="剪辑作品分类">
            {editingTypes.map((type) => (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={editingType === type}
                className={editingType === type ? 'is-active' : ''}
                onClick={() => setEditingType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        <div className="folio-works-body" data-lenis-prevent>
          {worksBody(chapter.id)}
        </div>

        <span className="folio-page-no">{pad(index * 2 + 2)}</span>
      </div>
    );
  };

  const colophon = (
    <div className="folio-page folio-page--colophon">
      <span className="folio-page-no">09</span>
      <p className="folio-kicker">COLOPHON · 后记</p>
      <h3>谢谢你翻到这里。</h3>
      <p className="folio-colophon-text">
        这四个章节只是能公开的那部分。如果你想知道某件作品背后的选题、数据和复盘，
        或者想聊聊合作，直接找我。
      </p>
      <div className="folio-colophon-actions">
        <a className="folio-btn" href={`mailto:${personalInfo.email}`}>
          写信给我
          <ArrowUpRight aria-hidden="true" />
        </a>
        {onContactMe && (
          <button type="button" className="folio-btn folio-btn--ghost" onClick={onContactMe}>
            联系方式
          </button>
        )}
      </div>
    </div>
  );

  const backCover = (
    <div className="folio-page folio-page--back">
      <span className="folio-back-mark">JY.LU</span>
      <span className="folio-back-meta">PORTFOLIO · {new Date().getFullYear()}</span>
      <button type="button" className="folio-back-reset" onClick={() => goTo(0)}>
        <ArrowLeft aria-hidden="true" />
        回到第一页
      </button>
    </div>
  );

  /* ------------------------------ 书本 ------------------------------ */

  const book = (
    <div
      className="folio-stage"
      tabIndex={0}
      role="region"
      aria-label="作品集书页，可用左右方向键翻页"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') { event.preventDefault(); goTo(spread + 1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(spread - 1); }
      }}
      onClickCapture={(event) => {
        // 滑动翻页之后浏览器还会补一次 click：在这里拦掉，免得顺手打开了某个链接
        if (gestureRef.current?.swiped) {
          event.preventDefault();
          event.stopPropagation();
          gestureRef.current = null;
        }
      }}
      onPointerDown={(event) => {
        // 视频控件和按钮上的拖动留给它们自己
        if ((event.target as HTMLElement).closest('video, input, button')) return;
        // 链接上允许起手：作品页几乎全是 <a>，不然滑动翻页等于不可用
        gestureRef.current = { x: event.clientX, swiped: false };
      }}
      onPointerUp={(event) => {
        const gesture = gestureRef.current;
        if (!gesture) return;
        const dx = event.clientX - gesture.x;
        if (Math.abs(dx) >= 64) {
          gesture.swiped = true;
          goTo(spread + (dx < 0 ? 1 : -1));
        }
      }}
      onPointerCancel={() => { gestureRef.current = null; }}
      // 作品页里几乎全是 <a> 和 <img>：不拦掉原生拖拽，一拖就会触发 dragstart，
      // 浏览器随即把指针事件打断成 pointerleave，滑动翻页直接失效
      onDragStart={(event) => event.preventDefault()}
    >
      <div className="folio-book">
        {/* 静止左页：第一章扉页 */}
        <div className="folio-leaf folio-leaf--base is-left">
          <div className="folio-face">{opener(0)}</div>
        </div>

        {/* 静止右页（最底层）：封底 */}
        <div className="folio-leaf folio-leaf--base is-right">
          <div className="folio-face">{backCover}</div>
        </div>

        {chapters.map((chapter, index) => {
          const flipped = index < spread;
          const visible = index === spread || index === spread - 1;
          return (
            <div
              key={chapter.id}
              className={`folio-leaf folio-leaf--turn${flipped ? ' is-flipped' : ''}`}
              style={{
                zIndex: flipped ? total + index + 1 : total - index,
                transitionDelay: `${delays[index] ?? 0}ms`,
              }}
              aria-hidden={!visible}
              inert={!visible}
            >
              <div className="folio-face folio-face--front">{worksPage(index)}</div>
              <div className="folio-face folio-face--back">
                {index + 1 < total ? opener(index + 1) : colophon}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* --------------------- 窄屏：纵向章节（不用书） --------------------- */

  const linear = (
    <div className="folio-linear">
      {chapters.map((chapter, index) => (
        <section className="folio-linear-chapter" key={chapter.id} data-tint={chapter.tint}>
          <header className="folio-linear-head">
            <span className="folio-chapter-no">CH. {pad(index + 1)}</span>
            <h3>{chapter.title}</h3>
            <p>{chapter.description}</p>
          </header>
          {chapter.id === 'editing' && (
            <div className="folio-tabs" role="tablist" aria-label="剪辑作品分类">
              {editingTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  role="tab"
                  aria-selected={editingType === type}
                  className={editingType === type ? 'is-active' : ''}
                  onClick={() => setEditingType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
          {worksBody(chapter.id)}
        </section>
      ))}
    </div>
  );

  return (
    <section id="portfolio" className="portfolio-section folio-section">
      <div className="portfolio-shell">
        <div className="portfolio-heading folio-heading" data-reveal>
          <div>
            <div className="section-kicker section-title-english">PORTFOLIO</div>
            <h2>作品集</h2>
          </div>
          <Folio3D spreadRef={chapterRef} />
          <p>{narrow ? '按章节往下读，视频与图片都可以点开看原作品。' : '四个章节装订成一本册子，点书签、翻页角，或者直接拖动它。'}</p>
        </div>

        {narrow ? linear : (
          <>
            <div className="folio-frame" data-reveal>
              <div className="folio-desk">
                {book}

                <button
                  type="button"
                  className="folio-corner"
                  onClick={() => goTo(spread + 1)}
                  aria-label="翻到下一页"
                  data-off={spread >= total ? 'true' : 'false'}
                />

                <div className="folio-bookmarks" role="tablist" aria-label="章节书签">
                  {chapters.map((chapter, index) => (
                    <button
                      key={chapter.id}
                      type="button"
                      role="tab"
                      aria-selected={Math.min(spread, total - 1) === index}
                      className={`folio-bookmark${Math.min(spread, total - 1) === index ? ' is-active' : ''}`}
                      style={{ top: `${16 + index * 16}%` }}
                      onClick={() => goTo(index)}
                    >
                      <span>{pad(index + 1)}</span>
                      {chapter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="folio-controls">
              <button type="button" className="folio-arrow" onClick={() => goTo(spread - 1)} disabled={spread === 0} aria-label="上一页">
                <ArrowLeft aria-hidden="true" />
              </button>
              <span className="folio-counter">
                <b>{pad(spread + 1)}</b> / {pad(total + 1)}
              </span>
              <button type="button" className="folio-arrow" onClick={() => goTo(spread + 1)} disabled={spread >= total} aria-label="下一页">
                <ArrowRight aria-hidden="true" />
              </button>
              <span className="folio-hint">拖动书页 · 点右下角翻页 · ← → 翻页</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
