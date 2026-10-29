/** 项目详情（点开项目卡后的案例页） */
export interface ProjectCase {
  /** 一句话定位 */
  tagline: string;
  /** 卡片角标，如 VIBE CODING */
  badge?: string;
  /** 开发背景，按段落 */
  background: string[];
  /** 技术栈分组 */
  techStack: { group: string; items: string[] }[];
  /** 顶部关键数字 */
  stats: { value: string; label: string }[];
  /** 主视觉的呈现方式：card = 限宽居中当卡片看（适合截图类），默认满宽 */
  heroFit?: 'card';
  /** 内容选题清单：真实发过的笔记标题，2 列卡片渲染在 03 里 */
  notes?: { title: string; kind: string; desc: string }[];
  /** 界面一览的排布：trio = 三列等宽竖图（默认两列原比例） */
  gallery?: 'trio';
  /** 功能鸟瞰：一条一个要点，可带截图；wide = 图里是文字表格，需要整宽才看得清 */
  features: { title: string; desc: string; shot?: string; wide?: boolean }[];
  /** 工程亮点 */
  highlights: { title: string; desc: string }[];
  /** 需要在界面上如实说明的边界 */
  note?: string;
  /**
   * 章节标题可改：自媒体 / 调研类项目叫「技术栈」「工程上做了什么」很别扭，
   * 不给就用默认值（开发背景 / 技术栈 / 界面一览 / 工程上做了什么）。
   */
  labels?: {
    background?: string;
    stack?: string;
    features?: string;
    highlights?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string[];
  tags: string[];
  category: '创业' | '竞技' | 'AI智能' | '新媒体' | 'Vibe Coding';
  award?: string;
  impact?: string;
  demoUrl?: string;
  link?: string;
  actionLabel?: string;
  /** 有 case 的项目：点卡片打开详情，而不是跳外链 */
  caseStudy?: ProjectCase;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: {
    title: string;
    description: string;
  }[];
  impact?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  items: {
    name: string;
    level: number; // 0 to 100
    details?: string;
  }[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'experience' | 'project' | 'club';
  iconName: string;
}

export interface FuturePlanItem {
  id: string;
  title: string;
  timeframe: string;
  description: string;
  iconName: string;
  category: '学习' | '职业' | '创业' | '个人';
}
