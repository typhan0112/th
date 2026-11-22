import { useState } from 'react';
import { Building2, FileCheck2, MapPin, PlayCircle, ShieldCheck, ZoomIn } from 'lucide-react';
import { BRANCHES, COMPANY_INFO, MEDIA_ASSETS } from '../data/vanXuanData';

export interface ZoomImagePayload {
  src: string;
  alt: string;
  caption: string;
}

export function HeroVisualFrame() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <figure className="flex h-full flex-col justify-between">
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/15 bg-[#0a3856] min-h-[340px] lg:min-h-[420px]">
        {!imgFailed ? (
          <>
            <img
              src={MEDIA_ASSETS.team}
              alt="Đội ngũ Công ty TNHH Dịch vụ Doanh nghiệp Vạn Xuân tại văn phòng công ty"
              referrerPolicy="no-referrer"
              fetchPriority="high"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover object-[center_32%]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#051d2e]/85 via-[#051d2e]/35 to-transparent p-6 pt-16">
              <p className="font-display text-sm font-semibold text-white">
                {COMPANY_INFO.legalName}
              </p>
              <p className="mt-1 text-xs text-white/80">
                4 văn phòng tại TP. Hồ Chí Minh · Tư vấn trực tiếp &amp; trực tuyến
              </p>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_top_right,rgba(15,142,196,0.28),transparent_55%),linear-gradient(155deg,#093552_0%,#062236_100%)] p-7 sm:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-white/12 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#f4be44]">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold tracking-tight text-white">
                      KẾ TOÁN VẠN XUÂN
                    </p>
                    <p className="text-xs text-white/70">Tư vấn pháp lý &amp; kế toán doanh nghiệp</p>
                  </div>
                </div>
                <span className="tabular-nums text-xs font-semibold text-[#8fdcfb]">TP.HCM</span>
              </div>

              <p className="mt-6 font-display text-xl font-bold leading-snug text-white">
                Hồ sơ chuẩn ngay từ bước đầu — hạn chế sửa đổi nhiều lần
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-white/75">
                Rà soát trực tiếp 7 hạng mục pháp lý cốt lõi trước khi bạn kê khai đăng ký doanh
                nghiệp hoặc ký hợp đồng thuê trụ sở.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-2.5 border-t border-white/12 pt-5 sm:grid-cols-2">
              {BRANCHES.map((branch) => (
                <div key={branch.label} className="flex items-start gap-2 text-xs text-white/80">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#f4be44]" aria-hidden="true" />
                  <div>
                    <span className="font-semibold text-white">{branch.label}: </span>
                    <span className="text-white/75">{branch.address.replace(', TP.HCM', '')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <figcaption className="mt-3.5 text-xs leading-relaxed text-white/75">
        Đội ngũ Vạn Xuân tại văn phòng công ty. Vạn Xuân là đơn vị tư vấn pháp lý tư nhân, không
        phải là cơ quan nhà nước hay cổng dịch vụ công của chính phủ.
      </figcaption>
    </figure>
  );
}

interface ActivityGalleryProps {
  onZoomImage: (payload: ZoomImagePayload) => void;
}

export function ActivityGallery({ onZoomImage }: ActivityGalleryProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [photo1Failed, setPhoto1Failed] = useState(false);
  const [photo2Failed, setPhoto2Failed] = useState(false);

  const photo1Caption =
    'Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm tại một quán đồ uống';
  const photo2Caption = 'Hình chụp cùng hồ sơ tại một tiệm bánh & tráng miệng';

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
      {/* Video tile */}
      <figure className="relative overflow-hidden rounded-2xl border border-[#d9e6ef] bg-[#062337] lg:col-span-5 lg:h-[420px]">
        {!videoFailed ? (
          <>
            <video
              src={`${MEDIA_ASSETS.video}#t=0.1`}
              controls
              playsInline
              preload="metadata"
              onError={() => setVideoFailed(true)}
              aria-label="Video hoạt động của Kế toán Vạn Xuân"
              className="h-full min-h-[280px] w-full bg-black object-contain"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-[#051d2e]/85 via-[#051d2e]/40 to-transparent px-5 pt-4 pb-10 text-xs font-medium text-white">
              Video do Vạn Xuân ghi lại
            </figcaption>
          </>
        ) : (
          <div className="flex h-full min-h-[300px] flex-col justify-between bg-[linear-gradient(155deg,#093552_0%,#051d2e_100%)] p-7 text-white">
            <div className="flex items-center justify-between text-xs text-white/75">
              <span>Tư liệu thực tế</span>
              <PlayCircle className="h-5 w-5 text-[#8fdcfb]" aria-hidden="true" />
            </div>
            <div>
              <p className="font-display text-lg font-bold leading-snug text-white">
                Video hoạt động tư vấn &amp; bàn giao hồ sơ tại Kế toán Vạn Xuân
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-white/75">
                Đường dẫn video được cấu hình sẵn tại{' '}
                <span className="font-mono text-xs text-[#8fdcfb]">
                  /upload/landing/van-xuan-video.mp4
                </span>{' '}
                và sẽ tự động phát khi tệp được tải lên máy chủ ketoanvanxuan.vn.
              </p>
            </div>
            <p className="border-t border-white/12 pt-4 text-xs text-white/70">
              Video do Vạn Xuân ghi lại
            </p>
          </div>
        )}
      </figure>

      {/* Photo 1 */}
      <figure className="group relative overflow-hidden rounded-2xl border border-[#d9e6ef] bg-[#072b42] lg:col-span-3 lg:h-[420px]">
        {!photo1Failed ? (
          <button
            type="button"
            onClick={() =>
              onZoomImage({
                src: MEDIA_ASSETS.photo1,
                alt: photo1Caption,
                caption: photo1Caption,
              })
            }
            className="relative block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={`Phóng to ảnh: ${photo1Caption}`}
          >
            <img
              src={MEDIA_ASSETS.photo1}
              alt={photo1Caption}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setPhoto1Failed(true)}
              className="h-full min-h-[280px] w-full object-cover object-[35%_30%] transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#051d2e]/70 text-white backdrop-blur-xs transition-transform duration-200 group-hover:scale-105">
              <ZoomIn className="h-4 w-4" aria-hidden="true" />
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#051d2e]/90 via-[#051d2e]/45 to-transparent px-4 pt-12 pb-4 text-xs leading-relaxed text-white">
              {photo1Caption}
            </figcaption>
          </button>
        ) : (
          <div className="flex h-full min-h-[280px] flex-col justify-between bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f4fb] text-[#0a709c]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0a709c]">An toàn thực phẩm</p>
              <p className="mt-1.5 font-display text-base font-bold text-[#072b42]">
                Cơ sở kinh doanh đồ uống
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4c6477]">{photo1Caption}.</p>
            </div>
            <p className="border-t border-[#d9e6ef] pt-3.5 text-xs text-[#4c6477]">
              Ảnh thực tế sẽ hiển thị từ /upload/landing/
            </p>
          </div>
        )}
      </figure>

      {/* Photo 2 */}
      <figure className="group relative overflow-hidden rounded-2xl border border-[#d9e6ef] bg-[#072b42] lg:col-span-4 lg:h-[420px]">
        {!photo2Failed ? (
          <button
            type="button"
            onClick={() =>
              onZoomImage({
                src: MEDIA_ASSETS.photo2,
                alt: photo2Caption,
                caption: photo2Caption,
              })
            }
            className="relative block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={`Phóng to ảnh: ${photo2Caption}`}
          >
            <img
              src={MEDIA_ASSETS.photo2}
              alt={photo2Caption}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setPhoto2Failed(true)}
              className="h-full min-h-[280px] w-full object-cover object-[46%_50%] transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#051d2e]/70 text-white backdrop-blur-xs transition-transform duration-200 group-hover:scale-105">
              <ZoomIn className="h-4 w-4" aria-hidden="true" />
            </span>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#051d2e]/90 via-[#051d2e]/45 to-transparent px-4 pt-12 pb-4 text-xs leading-relaxed text-white">
              {photo2Caption}
            </figcaption>
          </button>
        ) : (
          <div className="flex h-full min-h-[280px] flex-col justify-between bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f4fb] text-[#0a709c]">
              <FileCheck2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0a709c]">Đồng hành hộ &amp; doanh nghiệp F&amp;B</p>
              <p className="mt-1.5 font-display text-base font-bold text-[#072b42]">
                Tiệm bánh &amp; tráng miệng tại TP.HCM
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#4c6477]">{photo2Caption}.</p>
            </div>
            <p className="border-t border-[#d9e6ef] pt-3.5 text-xs text-[#4c6477]">
              Ảnh thực tế sẽ hiển thị từ /upload/landing/
            </p>
          </div>
        )}
      </figure>
    </div>
  );
}
