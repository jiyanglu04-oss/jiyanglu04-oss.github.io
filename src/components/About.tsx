import { useRef, useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { personalInfo } from '../data';
import AboutBadge from './AboutBadge';
import ResumeModal from './ResumeModal';

interface AboutProps {
  onContactMe: () => void;
}

export default function About({ onContactMe }: AboutProps) {
  const badgeFocus = useRef<number | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section id="about" className="editorial-about">
      <div className="about-grid">
        <figure
          className="identity-card"
          data-reveal
          onPointerEnter={() => { badgeFocus.current = 0; }}
          onPointerLeave={() => { badgeFocus.current = null; }}
        >
          <AboutBadge focusRef={badgeFocus} />
          <div className="identity-photo">
            <img src={`${import.meta.env.BASE_URL}about-handdrawn-portrait.webp`} alt="陆机阳手绘风格个人肖像" loading="lazy" />
          </div>
          <figcaption className="identity-copy">
            <div>
              <h3>陆机阳</h3>
              <p>Jackson Lu</p>
            </div>
            <span>产品 · 运营 · AI 实践</span>
          </figcaption>
        </figure>

        <div className="about-copy" data-reveal>
          <p className="section-kicker section-title-english">ABOUT ME</p>
          <h2>产品、运营<br /><span>都是我正在探索的<br />职业去向。</span></h2>
          <h3>产品经理和运营的探索者</h3>
          <p className="about-bio">{personalInfo.bio}</p>

          <div className="about-facts">
            <div>
              <small>教育背景 / 专业</small>
              <strong className="about-school-line">
                <span>{personalInfo.university}</span>
                <img
                  className="about-school-logo"
                  src={`${import.meta.env.BASE_URL}experience-logos/jnu.webp`}
                  alt="暨南大学校徽"
                  loading="lazy"
                />
              </strong>
              <span>{personalInfo.major}</span>
            </div>
            <div>
              <small>当前所在地</small>
              <strong><MapPin aria-hidden="true" /> {personalInfo.location}</strong>
              <span>开放商业合作与企业实习</span>
            </div>
          </div>

          <div className="about-actions">
            {/* 站内弹层看简历，不跳新标签；PDF 原文件在弹层里可下载 */}
            <button type="button" onClick={() => setResumeOpen(true)}>查看简历 <ArrowDownToLine /></button>
            <button type="button" onClick={onContactMe}>邮箱联系 <Mail /></button>
            <button onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>继续了解 <ArrowUpRight /></button>
          </div>
        </div>
      </div>

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </section>
  );
}
