import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Download, X } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

/**
 * 简历弹层：点「查看简历」直接在本页看，不跳新标签页。
 *
 * 用 PDF 渲染出来的图片而不是 <iframe src="resume.pdf">：
 * 移动端 Safari 的 iframe 只画第一页、部分安卓浏览器会直接触发下载，
 * 图片则在任何设备上都按宽度铺满、可滚动。需要原文件的人走「下载 PDF」。
 */
export default function ResumeModal({ onClose }: { onClose: () => void }) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.classList.add('case-modal-open');
    // 打开时滚到最上面，避免上次看过的位置残留
    sheetRef.current?.querySelector('.resume-scroll')?.scrollTo({ top: 0 });
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

  return createPortal(
    <div
      className="case-backdrop resume-backdrop"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div ref={sheetRef} className="resume-sheet" role="dialog" aria-modal="true" aria-labelledby="resume-title">
        <header className="resume-bar">
          <div className="resume-bar-title">
            <p>RESUME</p>
            <h2 id="resume-title">陆机阳 · 简历</h2>
            <p className="resume-hint">手机可双指放大查看</p>
            <p className="resume-hint">手机可双指放大查看</p>
          </div>
          <div className="resume-bar-actions">
            <a href={`${BASE}resume.pdf`} download="陆机阳-简历.pdf">
              下载 PDF <Download aria-hidden="true" />
            </a>
            <button ref={closeRef} type="button" className="resume-close" onClick={onClose} aria-label="关闭简历">
              <X aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="resume-scroll">
          <img src={`${BASE}resume-page-1.webp`} alt="陆机阳的简历，单页 A4" decoding="async" />
        </div>
      </div>
    </div>,
    document.body,
  );
}
