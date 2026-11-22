import { type FormEvent, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from 'lucide-react';
import { ActivityGallery, HeroVisualFrame, type ZoomImagePayload } from './components/MediaShowcase';
import { PolicyModal } from './components/PolicyModal';
import {
  BRANCHES,
  COMPANY_INFO,
  CONSULTATION_OUTCOMES,
  CONSULTATION_TOPICS,
  FAQ_ITEMS,
  HERO_CHECKLIST,
  LEGAL_REFERENCES,
  PROCESS_STEPS,
  SELF_REGISTRATION_STEPS,
  TAX_FIRST_YEAR_STEPS,
  TAX_OBLIGATIONS,
  type PolicyKey,
} from './data/vanXuanData';
import { buildStandaloneHtml } from './utils/exportStandaloneHtml';

const VIETNAM_PHONE_REGEX = /^(0|\+84)[0-9]{9,10}$/;

interface FormState {
  name: string;
  phone: string;
  need: string;
  note: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  consent?: string;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);
  const [zoomImage, setZoomImage] = useState<ZoomImagePayload | null>(null);
  const [exportNotice, setExportNotice] = useState(false);

  const [formState, setFormState] = useState<FormState>({
    name: '',
    phone: '',
    need: 'Tư vấn trước khi thành lập',
    note: '',
    consent: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submittedPayload, setSubmittedPayload] = useState<{
    name: string;
    phone: string;
    need: string;
    note: string;
    mailtoHref: string;
  } | null>(null);

  const noteInputRef = useRef<HTMLTextAreaElement | null>(null);
  const topicsSectionRef = useRef<HTMLElement | null>(null);
  const contactSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeTopic = CONSULTATION_TOPICS[activeTopicIndex];
  const currentYear = new Date().getFullYear();

  const handleJumpToTopic = (topicIndex: number) => {
    setActiveTopicIndex(topicIndex);
    topicsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTopicForContact = (topicTitle: string) => {
    setFormState((prev) => ({
      ...prev,
      need: 'Tư vấn trước khi thành lập',
      note: `Tôi cần trao đổi về: ${topicTitle}`,
    }));
    setSubmittedPayload(null);
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => {
      noteInputRef.current?.focus({ preventScroll: true });
    }, 450);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanedPhone = formState.phone.replace(/\s+/g, '');
    const nextErrors: FormErrors = {};

    if (!formState.name.trim()) {
      nextErrors.name = 'Vui lòng nhập họ và tên của bạn.';
    }
    if (!cleanedPhone) {
      nextErrors.phone = 'Vui lòng nhập số điện thoại liên hệ.';
    } else if (!VIETNAM_PHONE_REGEX.test(cleanedPhone)) {
      nextErrors.phone = 'Số điện thoại cần gồm 10–11 chữ số, bắt đầu bằng 0 hoặc +84.';
    }
    if (!formState.consent) {
      nextErrors.consent = 'Vui lòng xác nhận đồng ý với Chính sách bảo mật trước khi gửi.';
    }

    setFormErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const bodyText = [
      `Họ tên: ${formState.name.trim()}`,
      `Số điện thoại: ${cleanedPhone}`,
      `Nhu cầu: ${formState.need}`,
      `Nội dung: ${formState.note.trim() || '(Chưa ghi chú thêm)'}`,
    ].join('\n');

    const mailtoHref = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
      `Yêu cầu tư vấn — ${formState.need}`
    )}&body=${encodeURIComponent(bodyText)}`;

    setSubmittedPayload({
      name: formState.name.trim(),
      phone: cleanedPhone,
      need: formState.need,
      note: formState.note.trim(),
      mailtoHref,
    });
  };

  const handleDownloadStandaloneHtml = () => {
    const htmlContent = buildStandaloneHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ketoan-van-xuan.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setExportNotice(true);
    window.setTimeout(() => setExportNotice(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white text-[#102536]">
      {/* Top Bar: Strict 3-Zone Contract */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ${
          scrolled
            ? 'border-b border-[#d9e6ef] bg-white/95 backdrop-blur-md'
            : 'border-b border-white/10 bg-[#072b42]/90 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-8 px-5 sm:px-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className={`inline-flex shrink-0 items-center gap-2.5 font-display text-lg font-extrabold tracking-tight whitespace-nowrap transition-colors ${
              scrolled ? 'text-[#072b42]' : 'text-white'
            }`}
          >
            {!logoFailed && (
              <img
                src={COMPANY_INFO.logoUrl}
                alt=""
                width={32}
                height={32}
                referrerPolicy="no-referrer"
                onError={() => setLogoFailed(true)}
                className="h-8 w-8 rounded-lg bg-white object-contain p-1"
              />
            )}
            <span>{COMPANY_INFO.shortName}</span>
          </a>

          {/* Zone 2: 5 concise single-line text links */}
          <nav
            aria-label="Điều hướng chính"
            className={`hidden items-center gap-7 text-sm font-medium lg:flex ${
              scrolled ? 'text-[#314c61]' : 'text-white/85'
            }`}
          >
            <a
              href="#noi-dung"
              className="shrink-0 whitespace-nowrap border-b-2 border-transparent py-1 transition-colors hover:border-[#f4be44] hover:text-current"
            >
              Nội dung tư vấn
            </a>
            <a
              href="#hinh-anh"
              className="shrink-0 whitespace-nowrap border-b-2 border-transparent py-1 transition-colors hover:border-[#f4be44] hover:text-current"
            >
              Hoạt động thực tế
            </a>
            <a
              href="#quy-trinh"
              className="shrink-0 whitespace-nowrap border-b-2 border-transparent py-1 transition-colors hover:border-[#f4be44] hover:text-current"
            >
              Quy trình
            </a>
            <a
              href="#khai-thue"
              className="shrink-0 whitespace-nowrap border-b-2 border-transparent py-1 transition-colors hover:border-[#f4be44] hover:text-current"
            >
              Khai thuế năm đầu
            </a>
            <a
              href="#faq"
              className="shrink-0 whitespace-nowrap border-b-2 border-transparent py-1 transition-colors hover:border-[#f4be44] hover:text-current"
            >
              Hỏi đáp
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex shrink-0 items-center">
            <a
              href="#lien-he"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-[#0f8ec4] px-5 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-[#0a709c]"
            >
              Nhận tư vấn
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="top"
          className="bg-[linear-gradient(150deg,#072b42_0%,#0b3c5c_66%,#0e5278_100%)] pt-28 pb-16 text-white sm:pt-32 sm:pb-20"
        >
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Hero Left Column */}
              <div className="flex flex-col justify-center lg:col-span-6">
                <p className="inline-flex items-center gap-3 text-sm font-semibold text-[#8fdcfb]">
                  <span className="h-0.5 w-6 bg-[#f4be44]" aria-hidden="true" />
                  <span>Dành cho người chuẩn bị kinh doanh · TP. Hồ Chí Minh</span>
                </p>

                <h1 className="mt-4 font-display text-[clamp(2.125rem,3.8vw,3.25rem)] font-extrabold leading-[1.15] tracking-tight text-white">
                  Tư vấn trước khi{' '}
                  <span className="text-[#8fdcfb]">thành lập công ty</span>
                </h1>
                <p className="mt-2 font-display text-lg font-semibold text-white/85">
                  Cùng Kế toán Vạn Xuân
                </p>

                {/* Transparent Advisory Fee Row */}
                <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-y border-white/15 py-4">
                  <span className="text-sm text-white/80">Phí tư vấn trọn gói</span>
                  <span className="tabular-nums font-display text-3xl font-extrabold text-[#f4be44]">
                    {COMPANY_INFO.advisoryPrice}
                  </span>
                  <span className="text-xs text-white/75">
                    Thống nhất nội dung và phí trước khi thực hiện
                  </span>
                </div>

                <div className="mt-6 space-y-3 text-[15.5px] leading-relaxed text-white/85">
                  <p>
                    Bạn cần có tên công ty không trùng hoặc gây nhầm lẫn, ngành nghề đăng ký đúng
                    nhu cầu kinh doanh, vốn điều lệ phù hợp và lựa chọn đúng loại hình doanh
                    nghiệp.
                  </p>
                  <p>
                    Vạn Xuân phân tích từng lựa chọn, rà soát điều kiện và làm rõ trách nhiệm trước
                    khi bạn quyết định.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#lien-he"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#0f8ec4] px-6 py-3 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-[#0a709c]"
                  >
                    <span>Nhận tư vấn trước khi thành lập</span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                  <a
                    href="#noi-dung"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-white hover:text-[#072b42]"
                  >
                    Xem nội dung tư vấn
                  </a>
                </div>

                {/* Clean unboxed trust line (Zero-Pill Discipline) */}
                <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-white/85">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-[#f4be44]" aria-hidden="true" />
                    Đúng nhu cầu
                  </span>
                  <span className="text-white/35" aria-hidden="true">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-[#f4be44]" aria-hidden="true" />
                    Rõ điều kiện
                  </span>
                  <span className="text-white/35" aria-hidden="true">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-[#f4be44]" aria-hidden="true" />
                    Hiểu trách nhiệm
                  </span>
                </div>
              </div>

              {/* Hero Right Column */}
              <div className="lg:col-span-6">
                <HeroVisualFrame />
              </div>
            </div>

            {/* Full-Width 4-Column Interactive Readiness Strip */}
            <div className="mt-12 border-t border-white/15 pt-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-sm font-bold text-white">
                  Kiểm tra trước khi quyết định
                </p>
                <p className="text-xs text-white/70">
                  Chọn một hạng mục để xem chi tiết phân tích bên dưới
                </p>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {HERO_CHECKLIST.map((item, idx) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleJumpToTopic(item.topicIndex)}
                    className="group flex items-start justify-between rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-left transition-colors duration-150 hover:border-[#8fdcfb]/50 hover:bg-white/[0.11]"
                  >
                    <div>
                      <span className="tabular-nums text-xs font-bold text-[#f4be44]">
                        0{idx + 1}
                      </span>
                      <p className="mt-0.5 font-display text-sm font-bold text-white">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-white/75">{item.detail}</p>
                    </div>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-white/50 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#8fdcfb]"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 01: 7 Consultation Topics */}
        <section
          id="noi-dung"
          ref={topicsSectionRef}
          className="bg-[#f4f9fc] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-3 text-sm font-semibold text-[#0a709c]">
                <span className="h-0.5 w-6 bg-[#b57c08]" aria-hidden="true" />
                <span>01. Tư vấn trước khi thành lập</span>
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#072b42] sm:text-4xl">
                Nội dung chúng tôi tư vấn cho bạn
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#4c6477]">
                Hãy chọn đúng từ đầu, hạn chế việc hồ sơ phải sửa đi sửa lại. Chọn từng nội dung
                bên dưới để xem Vạn Xuân phân tích và rà soát những gì.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Topic Selector List */}
              <div
                role="tablist"
                aria-label="Danh sách 7 nội dung tư vấn trước khi thành lập"
                className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
              >
                {CONSULTATION_TOPICS.map((topic, index) => {
                  const isActive = index === activeTopicIndex;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`topic-panel-${topic.id}`}
                      id={`topic-tab-${topic.id}`}
                      onClick={() => setActiveTopicIndex(index)}
                      className={`flex shrink-0 items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold whitespace-nowrap transition-colors duration-150 lg:w-full lg:whitespace-normal ${
                        isActive
                          ? 'border-[#072b42] bg-[#072b42] text-white'
                          : 'border-[#d9e6ef] bg-white text-[#102536] hover:border-[#0f8ec4]'
                      }`}
                    >
                      <span
                        className={`tabular-nums text-xs font-bold ${
                          isActive ? 'text-[#f4be44]' : 'text-[#0a709c]'
                        }`}
                      >
                        {topic.index}
                      </span>
                      <span>{topic.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Topic Panel */}
              <article
                id={`topic-panel-${activeTopic.id}`}
                role="tabpanel"
                aria-labelledby={`topic-tab-${activeTopic.id}`}
                aria-live="polite"
                className="flex flex-col justify-between rounded-2xl border border-[#d9e6ef] bg-white p-6 sm:p-9 lg:col-span-8"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d9e6ef] pb-4 text-xs font-semibold text-[#4c6477]">
                    <span>Nội dung tư vấn · {activeTopic.title}</span>
                    <span className="tabular-nums text-[#0a709c]">
                      {activeTopic.index} / 0{CONSULTATION_TOPICS.length}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-[#072b42] sm:text-3xl">
                    {activeTopic.question}
                  </h3>
                  <p className="mt-2.5 text-base leading-relaxed text-[#4c6477]">
                    {activeTopic.summary}
                  </p>

                  <ul className="mt-6 space-y-3.5">
                    {activeTopic.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#102536]">
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-[#0f8ec4]"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="rounded-xl border border-[#ead8a8] bg-[#fffbf0] px-5 py-4">
                    <p className="text-xs font-bold text-[#946406]">Điều bạn nhận được</p>
                    <p className="mt-1 font-display text-base font-bold text-[#072b42]">
                      {activeTopic.outcome}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => handleSelectTopicForContact(activeTopic.title)}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0f8ec4] px-6 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-[#0a709c]"
                    >
                      <span>{activeTopic.ctaLabel}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </button>

                    <div className="flex items-center gap-2 text-xs text-[#4c6477]">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTopicIndex(
                            (activeTopicIndex - 1 + CONSULTATION_TOPICS.length) %
                              CONSULTATION_TOPICS.length
                          )
                        }
                        className="rounded-lg border border-[#d9e6ef] px-3 py-2 font-semibold text-[#072b42] transition-colors hover:bg-[#f4f9fc]"
                      >
                        Mục trước
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveTopicIndex((activeTopicIndex + 1) % CONSULTATION_TOPICS.length)
                        }
                        className="rounded-lg border border-[#d9e6ef] px-3 py-2 font-semibold text-[#072b42] transition-colors hover:bg-[#f4f9fc]"
                      >
                        Mục tiếp theo
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Consultation Outcomes */}
        <section id="ket-qua" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-3 text-sm font-semibold text-[#0a709c]">
                <span className="h-0.5 w-6 bg-[#b57c08]" aria-hidden="true" />
                <span>Kết quả của buổi tư vấn</span>
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#072b42] sm:text-4xl">
                Sau tư vấn, bạn cần rõ những gì?
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {CONSULTATION_OUTCOMES.map((item) => (
                <div
                  key={item.index}
                  className="rounded-2xl border border-[#d9e6ef] bg-white p-7 transition-colors duration-150 hover:border-[#0f8ec4]"
                >
                  <span className="tabular-nums font-display text-sm font-extrabold text-[#0a709c]">
                    {item.index}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-[#072b42]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#4c6477]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real Activity Showcase */}
        <section id="hinh-anh" className="bg-[#f4f9fc] py-20 sm:py-24">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-3 text-sm font-semibold text-[#0a709c]">
                <span className="h-0.5 w-6 bg-[#b57c08]" aria-hidden="true" />
                <span>Hình ảnh thực tế</span>
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#072b42] sm:text-4xl">
                Vạn Xuân – Người bạn đồng hành của Doanh nghiệp
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#4c6477]">
                Ở Vạn Xuân, chúng tôi chọn cách lắng nghe trước khi giải pháp được đưa ra, chọn sự
                tận tâm trước mọi con số.
              </p>
            </div>

            <ActivityGallery onZoomImage={setZoomImage} />

            <p className="mt-5 text-xs leading-relaxed text-[#4c6477]">
              Ngoài tư vấn trước khi thành lập, Vạn Xuân còn có dịch vụ về an toàn thực phẩm. Hình
              ảnh ghi lại hoạt động thực tế; kết quả từng hồ sơ do cơ quan có thẩm quyền xem xét,
              quyết định.
            </p>
          </div>
        </section>

        {/* Section 02: 3-Step Advisory Process */}
        <section
          id="quy-trinh"
          className="bg-[linear-gradient(155deg,#072b42_0%,#0b3c5c_100%)] py-20 text-white sm:py-24"
        >
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-3 text-sm font-semibold text-[#8fdcfb]">
                  <span className="h-0.5 w-6 bg-[#f4be44]" aria-hidden="true" />
                  <span>02. Quy trình tư vấn</span>
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Vạn Xuân tư vấn theo 3 bước
                </h2>
                <p className="mt-3 text-base text-white/80">
                  Nội dung và phí tư vấn được thống nhất trước khi thực hiện.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={COMPANY_INFO.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-white hover:text-[#072b42]"
                >
                  <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Nhắn Zalo</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.hotlineTel}`}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0f8ec4] px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-[#0a709c]"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Gọi tư vấn</span>
                </a>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.index}
                  className="rounded-2xl border border-white/15 bg-white/[0.06] p-7"
                >
                  <span className="tabular-nums font-display text-sm font-bold text-[#f4be44]">
                    Bước {step.index}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-white/80">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 03: Self-Registration Reference */}
        <section id="tu-dang-ky" className="bg-white py-20 sm:py-24">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
              <p className="inline-flex items-center gap-3 text-sm font-semibold text-[#0a709c]">
                <span className="h-0.5 w-6 bg-[#b57c08]" aria-hidden="true" />
                <span>03. Thông tin tham khảo</span>
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#072b42] sm:text-4xl">
                Tự đăng ký doanh nghiệp bắt đầu từ đâu?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#4c6477]">
                Sau khi chọn phương án, bạn có thể tự xem thủ tục, chuẩn bị hồ sơ và thực hiện trên
                hệ thống chính thức của cơ quan nhà nước.
              </p>

              <div className="mt-7 rounded-2xl border border-[#d9e6ef] bg-[#f4f9fc] p-6">
                <a
                  href={COMPANY_INFO.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#0f8ec4] bg-white px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-[#0a709c] transition-colors duration-150 hover:bg-[#0f8ec4] hover:text-white"
                >
                  <span>Xem hướng dẫn chính thức</span>
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
                <p className="mt-3 text-xs leading-relaxed text-[#4c6477]">
                  Liên kết đến Cổng thông tin quốc gia về đăng ký doanh nghiệp
                  (dangkykinhdoanh.gov.vn).
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-4">
                {SELF_REGISTRATION_STEPS.map((step) => (
                  <div
                    key={step.index}
                    className="flex items-start gap-5 rounded-2xl border border-[#d9e6ef] bg-white p-6"
                  >
                    <span className="tabular-nums flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#072b42] font-display text-sm font-bold text-white">
                      {step.index}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#072b42]">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-[#4c6477]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-[#ead8a8] bg-[#fffbf0] px-5 py-4 text-sm leading-relaxed text-[#5c4514]">
                Thành phần hồ sơ và yêu cầu cụ thể phụ thuộc loại hình, người tham gia và quy định
                tại thời điểm thực hiện. Cơ quan đăng ký kinh doanh tiếp nhận, xem xét và quyết
                định kết quả.
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: First-Year Tax Filing Services */}
        <section id="khai-thue" className="bg-[#f4f9fc] py-20 sm:py-24">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-3 text-sm font-semibold text-[#0a709c]">
                <span className="h-0.5 w-6 bg-[#b57c08]" aria-hidden="true" />
                <span>04. Khai thuế trong năm đầu</span>
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#072b42] sm:text-4xl">
                Dịch vụ khai thuế dành cho doanh nghiệp mới thành lập
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#4c6477]">
                Bạn cần biết phải khai những loại thuế nào, theo kỳ nào và ai theo dõi việc thực
                hiện. Vạn Xuân xác định nghĩa vụ, chuẩn bị hồ sơ và theo dõi từng kỳ theo phạm vi
                đã thống nhất.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="font-display text-xl font-extrabold text-[#072b42] sm:text-2xl">
                Trong 1 năm, doanh nghiệp phải khai thuế gì?
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4c6477]">
                Dưới đây là các nghĩa vụ thường gặp. Danh sách cụ thể được xác định theo hoạt động,
                phương pháp tính thuế và tình trạng doanh nghiệp.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {TAX_OBLIGATIONS.map((tax) => (
                  <div
                    key={tax.title}
                    className="rounded-2xl border border-[#d9e6ef] bg-white p-7"
                  >
                    <h4 className="font-display text-lg font-bold text-[#072b42]">{tax.title}</h4>
                    <p className="mt-1 text-xs font-semibold text-[#0a709c]">{tax.cadence}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#4c6477]">
                      {tax.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* 2026 Regulatory Notice */}
              <div className="mt-6 rounded-2xl bg-[#072b42] px-6 py-5 text-[15px] leading-relaxed text-white">
                <strong className="font-display font-bold text-[#f4be44]">Từ năm 2026: </strong>
                không phải khai, nộp lệ phí môn bài cho năm 2026 và các năm tiếp theo. Các nghĩa vụ
                thuế khác được rà soát theo hoạt động phát sinh.
              </div>
            </div>

            <div className="mt-14">
              <h3 className="font-display text-xl font-extrabold text-[#072b42] sm:text-2xl">
                Quy trình tư vấn &amp; thực hiện khai thuế năm đầu
              </h3>

              <ol className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {TAX_FIRST_YEAR_STEPS.map((step) => (
                  <li
                    key={step.index}
                    className="rounded-2xl border border-[#d9e6ef] bg-white p-6"
                  >
                    <span className="tabular-nums font-display text-sm font-extrabold text-[#0a709c]">
                      {step.index}
                    </span>
                    <h4 className="mt-2.5 font-display text-base font-bold text-[#072b42]">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#4c6477]">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-6 rounded-xl border border-[#ead8a8] bg-[#fffbf0] px-5 py-4 text-sm leading-relaxed text-[#5c4514]">
                Bạn cung cấp chứng từ và xác nhận số liệu. Vạn Xuân thực hiện công việc theo hợp
                đồng; việc ký, nộp hồ sơ theo thẩm quyền hợp lệ. Phạm vi và phí được thống nhất
                trước khi thực hiện.
              </div>

              <div className="mt-6 rounded-2xl border border-[#d9e6ef] bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d9e6ef] pb-3">
                  <h4 className="font-display text-sm font-bold text-[#072b42]">
                    Căn cứ tham khảo
                  </h4>
                  <span className="tabular-nums text-xs text-[#4c6477]">
                    Cập nhật 11/11/2026
                  </span>
                </div>
                <ul className="mt-4 grid grid-cols-1 gap-2.5 text-sm text-[#4c6477] sm:grid-cols-2">
                  {LEGAL_REFERENCES.map((reference) => (
                    <li key={reference} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#0a709c]" aria-hidden="true" />
                      <span>{reference}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-[900px] px-5 sm:px-8">
            <div className="text-center">
              <p className="inline-flex items-center gap-3 text-sm font-semibold text-[#0a709c]">
                <span className="h-0.5 w-6 bg-[#b57c08]" aria-hidden="true" />
                <span>Giải đáp trước khi liên hệ</span>
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#072b42] sm:text-4xl">
                Câu hỏi thường gặp
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-[#4c6477]">
                Giải đáp về tư vấn trước khi thành lập và khai thuế trong năm đầu hoạt động.
              </p>
            </div>

            <div className="mt-10 divide-y divide-[#d9e6ef] rounded-2xl border border-[#d9e6ef] bg-white">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={item.question}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-bold text-[#072b42] transition-colors hover:bg-[#f4f9fc]"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#0a709c] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-answer-${index}`}
                        className="px-6 pb-6 text-[15px] leading-relaxed text-[#4c6477]"
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact & Consultation Form */}
        <section
          id="lien-he"
          ref={contactSectionRef}
          className="bg-[linear-gradient(155deg,#072b42_0%,#0b3c5c_100%)] py-20 text-white sm:py-24"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
            {/* Company Contact Details */}
            <div className="lg:col-span-6">
              <p className="inline-flex items-center gap-3 text-sm font-semibold text-[#8fdcfb]">
                <span className="h-0.5 w-6 bg-[#f4be44]" aria-hidden="true" />
                <span>Liên hệ tư vấn</span>
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Nhận tư vấn trước khi thành lập
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                Bạn chỉ cần cung cấp tên, số liên hệ và nhu cầu. Vạn Xuân sẽ hướng dẫn hồ sơ cần
                thiết sau khi trao đổi.
              </p>

              <ul className="mt-8 divide-y divide-white/12 text-sm text-white/85">
                <li className="flex items-start gap-3.5 py-4">
                  <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f4be44]" aria-hidden="true" />
                  <span className="font-display font-bold text-white">
                    {COMPANY_INFO.legalName}
                  </span>
                </li>
                <li className="flex items-start gap-3.5 py-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#f4be44]" aria-hidden="true" />
                  <div className="space-y-2 leading-relaxed">
                    {BRANCHES.map((branch) => (
                      <p key={branch.label}>
                        <strong className="font-semibold text-white">{branch.label}: </strong>
                        {branch.address}
                      </p>
                    ))}
                  </div>
                </li>
                <li className="flex items-start gap-3.5 py-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#f4be44]" aria-hidden="true" />
                  <div>
                    <strong className="font-semibold text-white">Hotline: </strong>
                    <a
                      href={`tel:${COMPANY_INFO.hotlineTel}`}
                      className="tabular-nums font-semibold text-[#8fdcfb] hover:underline"
                    >
                      {COMPANY_INFO.hotlineDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3.5 py-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#f4be44]" aria-hidden="true" />
                  <div>
                    <strong className="font-semibold text-white">Email: </strong>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-[#8fdcfb] hover:underline"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3.5 py-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#f4be44]" aria-hidden="true" />
                  <div>
                    <strong className="font-semibold text-white">Giờ làm việc: </strong>
                    <span className="tabular-nums">{COMPANY_INFO.workingHours}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Lead Capture Form */}
            <div className="lg:col-span-6">
              <form
                onSubmit={handleFormSubmit}
                noValidate
                className="rounded-2xl border border-white/10 bg-white p-6 text-[#102536] sm:p-9"
              >
                <h3 className="font-display text-2xl font-bold text-[#072b42]">
                  Đăng ký nhận tư vấn
                </h3>
                <p className="mt-1.5 text-sm text-[#4c6477]">
                  Nội dung và phí tư vấn được thống nhất trước khi thực hiện.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="mb-1.5 block text-sm font-semibold text-[#072b42]"
                    >
                      Họ và tên <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formState.name}
                      onChange={(e) => {
                        setFormState((prev) => ({ ...prev, name: e.target.value }));
                        if (formErrors.name) {
                          setFormErrors((prev) => ({ ...prev, name: undefined }));
                        }
                      }}
                      placeholder="Nguyễn Văn A"
                      aria-invalid={Boolean(formErrors.name)}
                      className={`w-full rounded-lg border px-4 py-3 text-[15px] text-[#102536] transition-colors focus:bg-white ${
                        formErrors.name
                          ? 'border-red-500 bg-red-50/40'
                          : 'border-[#d9e6ef] bg-[#f4f9fc] focus:border-[#0f8ec4]'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="mb-1.5 block text-sm font-semibold text-[#072b42]"
                    >
                      Số điện thoại <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={formState.phone}
                      onChange={(e) => {
                        setFormState((prev) => ({ ...prev, phone: e.target.value }));
                        if (formErrors.phone) {
                          setFormErrors((prev) => ({ ...prev, phone: undefined }));
                        }
                      }}
                      placeholder="09xx xxx xxx"
                      aria-invalid={Boolean(formErrors.phone)}
                      className={`tabular-nums w-full rounded-lg border px-4 py-3 text-[15px] text-[#102536] transition-colors focus:bg-white ${
                        formErrors.phone
                          ? 'border-red-500 bg-red-50/40'
                          : 'border-[#d9e6ef] bg-[#f4f9fc] focus:border-[#0f8ec4]'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{formErrors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lead-need"
                      className="mb-1.5 block text-sm font-semibold text-[#072b42]"
                    >
                      Nhu cầu
                    </label>
                    <select
                      id="lead-need"
                      name="need"
                      value={formState.need}
                      onChange={(e) => setFormState((prev) => ({ ...prev, need: e.target.value }))}
                      className="w-full rounded-lg border border-[#d9e6ef] bg-[#f4f9fc] px-4 py-3 text-[15px] text-[#102536] focus:border-[#0f8ec4] focus:bg-white"
                    >
                      <option value="Tư vấn trước khi thành lập">Tư vấn trước khi thành lập</option>
                      <option value="Tư vấn khai thuế năm đầu">Tư vấn khai thuế năm đầu</option>
                      <option value="Nội dung khác">Nội dung khác</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="lead-note"
                      className="mb-1.5 block text-sm font-semibold text-[#072b42]"
                    >
                      Nội dung cần trao đổi
                    </label>
                    <textarea
                      ref={noteInputRef}
                      id="lead-note"
                      name="note"
                      rows={3}
                      value={formState.note}
                      onChange={(e) => setFormState((prev) => ({ ...prev, note: e.target.value }))}
                      placeholder="Hoạt động dự kiến, số người góp vốn, điều bạn còn phân vân…"
                      className="w-full rounded-lg border border-[#d9e6ef] bg-[#f4f9fc] px-4 py-3 text-[15px] text-[#102536] focus:border-[#0f8ec4] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="flex items-start gap-2.5 text-xs leading-relaxed text-[#4c6477]">
                      <input
                        type="checkbox"
                        checked={formState.consent}
                        onChange={(e) => {
                          setFormState((prev) => ({ ...prev, consent: e.target.checked }));
                          if (formErrors.consent) {
                            setFormErrors((prev) => ({ ...prev, consent: undefined }));
                          }
                        }}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#0f8ec4]"
                      />
                      <span>
                        Tôi đồng ý để Vạn Xuân sử dụng thông tin trên nhằm liên hệ tư vấn theo{' '}
                        <button
                          type="button"
                          onClick={() => setActivePolicy('privacy')}
                          className="font-semibold text-[#0a709c] underline"
                        >
                          Chính sách bảo mật
                        </button>
                        .
                      </span>
                    </label>
                    {formErrors.consent && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-700">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{formErrors.consent}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-[#0f8ec4] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0a709c]"
                  >
                    <span>Gửi yêu cầu tư vấn</span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>

                {submittedPayload && (
                  <div
                    role="status"
                    className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-semibold">
                          Đã ghi nhận yêu cầu của {submittedPayload.name}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-emerald-900">
                          Số liên hệ: <span className="tabular-nums">{submittedPayload.phone}</span>{' '}
                          · Nhu cầu: {submittedPayload.need}. Bạn có thể gửi trực tiếp qua ứng dụng
                          email hoặc nhắn Zalo để được phản hồi ngay trong giờ làm việc.
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a
                            href={submittedPayload.mailtoHref}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#072b42] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0b3c5c]"
                          >
                            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Mở ứng dụng Email</span>
                          </a>
                          <a
                            href={COMPANY_INFO.zaloUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3.5 py-2 text-xs font-semibold text-emerald-900 transition-colors hover:bg-emerald-100/60"
                          >
                            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Nhắn Zalo 09 3333 7683</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <p className="mt-4 text-center text-xs text-[#4c6477]">
                  Không gửi giấy tờ định danh, mật khẩu hoặc thông tin đăng nhập qua biểu mẫu này.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Corporate Footer */}
      <footer className="bg-[#051d2e] pt-14 pb-24 text-sm text-white/75 md:pb-14">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <h4 className="font-display text-sm font-bold text-white">
                {COMPANY_INFO.legalName}
              </h4>
              <ul className="mt-3.5 space-y-2 text-sm text-white/75">
                <li>Trụ sở: {BRANCHES[0].address}</li>
                <li>
                  Hotline:{' '}
                  <a
                    href={`tel:${COMPANY_INFO.hotlineTel}`}
                    className="tabular-nums text-white hover:underline"
                  >
                    {COMPANY_INFO.hotlineDisplay}
                  </a>{' '}
                  · Email:{' '}
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                </li>
                <li>
                  Website:{' '}
                  <a
                    href={COMPANY_INFO.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    ketoanvanxuan.vn
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-display text-sm font-bold text-white">Nội dung</h4>
              <ul className="mt-3.5 space-y-2">
                <li>
                  <a href="#noi-dung" className="hover:text-white hover:underline">
                    Tư vấn trước khi thành lập
                  </a>
                </li>
                <li>
                  <a href="#quy-trinh" className="hover:text-white hover:underline">
                    Quy trình tư vấn
                  </a>
                </li>
                <li>
                  <a href="#tu-dang-ky" className="hover:text-white hover:underline">
                    Tự đăng ký doanh nghiệp
                  </a>
                </li>
                <li>
                  <a href="#khai-thue" className="hover:text-white hover:underline">
                    Khai thuế trong năm đầu
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-display text-sm font-bold text-white">Chính sách &amp; Tiện ích</h4>
              <ul className="mt-3.5 space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy('privacy')}
                    className="text-left hover:text-white hover:underline"
                  >
                    Chính sách bảo mật
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy('terms')}
                    className="text-left hover:text-white hover:underline"
                  >
                    Điều khoản sử dụng
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy('fee')}
                    className="text-left hover:text-white hover:underline"
                  >
                    Chính sách phí &amp; hoàn phí
                  </button>
                </li>
                <li>
                  <a
                    href={COMPANY_INFO.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="hover:text-white hover:underline"
                  >
                    Cổng thông tin quốc gia về đăng ký doanh nghiệp
                  </a>
                </li>
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadStandaloneHtml}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/12"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {exportNotice
                        ? 'Đã tải ketoan-van-xuan.html'
                        : 'Tải file HTML & CSS độc lập (.html)'}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 space-y-2.5 border-t border-white/12 pt-6 text-xs leading-relaxed text-white/70">
            <p>
              <strong className="font-semibold text-white">Tuyên bố miễn trừ: </strong>
              Vạn Xuân là đơn vị tư vấn pháp lý tư nhân, không phải là cơ quan nhà nước hay cổng
              dịch vụ công của chính phủ. Phí trên trang là phí dịch vụ tư vấn của Vạn Xuân, không
              phải lệ phí nhà nước. Bạn có thể tự thực hiện thủ tục trực tiếp trên hệ thống chính
              thức của cơ quan đăng ký kinh doanh.
            </p>
            <p>
              Cơ quan đăng ký kinh doanh xem xét, quyết định kết quả; tư vấn không đồng nghĩa với
              bảo đảm hồ sơ được chấp thuận.
            </p>
            <p className="pt-1 text-white/60">
              © {currentYear} {COMPANY_INFO.shortName}. {COMPANY_INFO.slogan}.
            </p>
          </div>
        </div>
      </footer>

      {/* Desktop Quick Contact Rail (clean, zero pulsing animations) */}
      <div className="fixed right-5 bottom-6 z-30 hidden flex-col gap-2.5 md:flex">
        <a
          href={COMPANY_INFO.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn Zalo Kế toán Vạn Xuân"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0068ff] text-xs font-bold text-white shadow-lg transition-transform duration-150 hover:scale-105"
        >
          Zalo
        </a>
        <a
          href={`tel:${COMPANY_INFO.hotlineTel}`}
          aria-label="Gọi tư vấn Kế toán Vạn Xuân"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f8ec4] text-white shadow-lg transition-transform duration-150 hover:scale-105 hover:bg-[#0a709c]"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>

      {/* Compact Mobile Bottom Action Bar (height 52px <= 15% mobile viewport cap) */}
      <div className="fixed inset-x-0 bottom-0 z-30 grid h-[52px] grid-cols-3 border-t border-[#d9e6ef] bg-white md:hidden">
        <a
          href={`tel:${COMPANY_INFO.hotlineTel}`}
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#072b42]"
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Gọi tư vấn</span>
        </a>
        <a
          href={COMPANY_INFO.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 border-x border-[#d9e6ef] text-xs font-bold text-[#072b42]"
        >
          <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Nhắn Zalo</span>
        </a>
        <a
          href="#lien-he"
          className="flex items-center justify-center bg-[#0f8ec4] text-xs font-bold text-white"
        >
          Nhận tư vấn
        </a>
      </div>

      {/* Policy & Image Zoom Modal */}
      <PolicyModal
        activePolicy={activePolicy}
        zoomImage={zoomImage}
        onClose={() => {
          setActivePolicy(null);
          setZoomImage(null);
        }}
      />
    </div>
  );
}
