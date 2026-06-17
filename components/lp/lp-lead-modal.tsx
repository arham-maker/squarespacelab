"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { LP_LEAD_FORM } from "@/lib/data/lp-lead-form";
import { LP2_LEAD_FORM } from "@/lib/data/lp2-lead-form";
import {
  getFormString,
  submitForm,
} from "@/lib/forms/submit-form-client";
import {
  selectedPackageToFields,
  type SelectedPackage,
} from "@/lib/forms/selected-package";
import gsap from "gsap";

type LpLeadModalProps = {
  isOpen: boolean;
  selectedPackage: SelectedPackage | null;
  onClose: () => void;
  variant?: "lp" | "lp2";
};

export function LpLeadModal({
  isOpen,
  selectedPackage,
  onClose,
  variant = "lp",
}: LpLeadModalProps) {
  const formConfig = variant === "lp2" ? LP2_LEAD_FORM : LP_LEAD_FORM;
  const isLp2 = variant === "lp2";
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const dialog = dialogRef.current;
    if (!overlay || !dialog) return;

    if (isOpen) {
      gsap.killTweensOf([overlay, dialog]);

      if (reducedMotion) {
        gsap.set(overlay, { autoAlpha: 1 });
        gsap.set(dialog, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(dialog, { autoAlpha: 0, y: 20 });
      gsap.to(overlay, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dialog, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        delay: 0.04,
      });
      return;
    }

    if (reducedMotion) {
      gsap.set([overlay, dialog], { autoAlpha: 0 });
      return;
    }

    gsap.to(dialog, { autoAlpha: 0, y: 12, duration: 0.2, ease: "power2.in" });
    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.2,
      ease: "power2.in",
      delay: 0.04,
    });
  }, [isOpen, reducedMotion]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const messageField = isLp2
        ? LP2_LEAD_FORM.fields.message.name
        : LP_LEAD_FORM.fields.industry.name;

      const baseFields = {
        fullName: getFormString(formData, formConfig.fields.name.name),
        email: getFormString(formData, formConfig.fields.email.name),
        phone: getFormString(formData, formConfig.fields.phone.name),
        businessIndustry: getFormString(formData, messageField),
        consentMarketing: "Accepted via LP lead form",
        consentSms: "Accepted via LP lead form",
        consentTerms: "Accepted via LP lead form",
      };

      await submitForm({
        formType: selectedPackage ? "package" : "get-started",
        fields: selectedPackage
          ? { ...baseFields, ...selectedPackageToFields(selectedPackage) }
          : baseFields,
      });

      onClose();
      router.push(formConfig.thankYouPath);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit form. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  if (!mounted || !isOpen) return null;

  const modal = (
    <div className="lp-lead-modal-root">
      <div
        ref={overlayRef}
        className="overlay active"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="popupmain lp-lead-modal--visible"
        id="popstatic"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="closeico"
          onClick={onClose}
          aria-label="Close form"
        >
          <svg viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="mmpopup">
          <div className="popup-text">
            <div
              className={`centercont ${selectedPackage ? "dynamic" : "static"}`}
              id={titleId}
            >
              {isLp2 ? (
                <>
                  <h3>
                    <span className="fs-36">
                      {selectedPackage
                        ? selectedPackage.name
                        : LP2_LEAD_FORM.staticTitle}
                    </span>
                  </h3>
                  {selectedPackage ? (
                    <h4>
                      In Just <span>{selectedPackage.price}</span>
                    </h4>
                  ) : (
                    <p>{LP2_LEAD_FORM.staticLead}</p>
                  )}
                  {selectedPackage ? (
                    <p>{LP2_LEAD_FORM.packageLead}</p>
                  ) : null}
                </>
              ) : (
                <>
                  <h3>
                    <span className="fs-36">
                      {selectedPackage ? (
                        selectedPackage.name
                      ) : "title" in formConfig ? (
                        formConfig.title
                      ) : (
                        ""
                      )}
                    </span>
                  </h3>
                  {selectedPackage ? (
                    <h4>
                      In Just <span>{selectedPackage.price}</span>
                    </h4>
                  ) : null}
                </>
              )}
            </div>

            <div className="formpop">
              <form onSubmit={handleSubmit} noValidate>
                <div className="fld-input">
                  <input
                    type="text"
                    name={formConfig.fields.name.name}
                    placeholder={formConfig.fields.name.placeholder}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="fld-input">
                  <input
                    type="email"
                    name={formConfig.fields.email.name}
                    placeholder={formConfig.fields.email.placeholder}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="fld-input">
                  <input
                    type="tel"
                    name={formConfig.fields.phone.name}
                    placeholder={formConfig.fields.phone.placeholder}
                    autoComplete="tel"
                    inputMode="tel"
                    minLength={10}
                    maxLength={15}
                    required
                  />
                </div>

                <div className="fld-input">
                  <textarea
                    name={
                      isLp2
                        ? LP2_LEAD_FORM.fields.message.name
                        : LP_LEAD_FORM.fields.industry.name
                    }
                    placeholder={
                      isLp2
                        ? LP2_LEAD_FORM.fields.message.placeholder
                        : LP_LEAD_FORM.fields.industry.placeholder
                    }
                    rows={isLp2 ? 3 : 2}
                  />
                </div>

                {submitError ? (
                  <p className="lp-lead-modal__error" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <div className="fld-btn">
                  <button type="submit" disabled={isSubmitting}>
                    {formConfig.submitLabel}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="popup-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={formConfig.image.src}
              alt={formConfig.image.alt}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
