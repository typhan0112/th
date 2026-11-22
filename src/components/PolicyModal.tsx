import { useEffect } from 'react';
import { X } from 'lucide-react';
import { POLICIES, type PolicyKey } from '../data/vanXuanData';
import type { ZoomImagePayload } from './MediaShowcase';

interface PolicyModalProps {
  activePolicy: PolicyKey | null;
  zoomImage: ZoomImagePayload | null;
  onClose: () => void;
}

export function PolicyModal({ activePolicy, zoomImage, onClose }: PolicyModalProps) {
  const isOpen = Boolean(activePolicy || zoomImage);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const policyDoc = activePolicy ? POLICIES[activePolicy] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#051d2e]/80 p-4 sm:p-6 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={policyDoc ? policyDoc.title : zoomImage?.alt}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#d9e6ef] bg-white p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng hộp thoại"
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f9fc] text-[#072b42] transition-colors hover:bg-[#e7f4fb]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {policyDoc && (
          <div>
            <h3 className="pr-12 font-display text-2xl font-bold text-[#072b42]">
              {policyDoc.title}
            </h3>
            <div className="mt-6 space-y-5 border-t border-[#d9e6ef] pt-5">
              {policyDoc.sections.map((section) => (
                <div key={section.heading}>
                  <h4 className="font-display text-base font-bold text-[#072b42]">
                    {section.heading}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4c6477]">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {zoomImage && (
          <div className="pt-2">
            <img
              src={zoomImage.src}
              alt={zoomImage.alt}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-full rounded-xl object-contain bg-[#f4f9fc]"
            />
            <p className="mt-4 text-sm leading-relaxed text-[#4c6477]">{zoomImage.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
