"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { LEAD_FORM } from "@/lib/data/lead-form";
import {
  getFormCheckbox,
  getFormString,
  submitForm,
} from "@/lib/forms/submit-form-client";
import gsap from "gsap";

type GetStartedModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
        gsap.set(dialog, { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(dialog, { autoAlpha: 0, y: 24, scale: 0.96 });
      gsap.to(overlay, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
      gsap.to(dialog, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
        delay: 0.05,
      });
      return;
    }

    if (reducedMotion) {
      gsap.set([overlay, dialog], { autoAlpha: 0 });
      return;
    }

    gsap.to(dialog, {
      autoAlpha: 0,
      y: 16,
      scale: 0.98,
      duration: 0.25,
      ease: "power2.in",
    });
    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.25,
      ease: "power2.in",
      delay: 0.05,
    });
  }, [isOpen, reducedMotion]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await submitForm({
        formType: "get-started",
        fields: {
          fullName: getFormString(formData, LEAD_FORM.fields.name.name),
          email: getFormString(formData, LEAD_FORM.fields.email.name),
          phone: getFormString(formData, LEAD_FORM.fields.phone.name),
          consentMarketing: getFormCheckbox(
            formData,
            LEAD_FORM.checkboxes[0].name
          ),
          consentSms: getFormCheckbox(formData, LEAD_FORM.checkboxes[1].name),
          consentTerms: getFormCheckbox(formData, LEAD_FORM.checkboxes[2].name),
        },
      });

      onClose();
      router.push(LEAD_FORM.thankYouPath);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit form. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="get-started-modal" aria-hidden={false}>
      <div
        ref={overlayRef}
        className="get-started-modal__overlay"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="get-started-modal__dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="get-started-modal__close"
          onClick={onClose}
          aria-label="Close form"
        >
          <svg
            className="get-started-modal__close-icon"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
          >
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="get-started-modal__inner">
          <div className="get-started-modal__media">
            <Image
              src={LEAD_FORM.image.src}
              alt={LEAD_FORM.image.alt}
              width={396}
              height={600}
              className="get-started-modal__img"
              priority
            />
          </div>

          <div className="get-started-modal__form-wrap">
            <div className="get-started-modal__heading" id={titleId}>
              <h3 className="get-started-modal__title m-0">{LEAD_FORM.title}</h3>
              <p className="get-started-modal__title-highlight m-0">
                {LEAD_FORM.titleHighlight}
              </p>
            </div>

            <form className="get-started-modal__form" onSubmit={handleSubmit} noValidate>
              <div className="get-started-modal__field">
                <input
                  type="text"
                  name={LEAD_FORM.fields.name.name}
                  placeholder={LEAD_FORM.fields.name.placeholder}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="get-started-modal__field">
                <input
                  type="email"
                  name={LEAD_FORM.fields.email.name}
                  placeholder={LEAD_FORM.fields.email.placeholder}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="get-started-modal__field">
                <input
                  type="tel"
                  name={LEAD_FORM.fields.phone.name}
                  placeholder={LEAD_FORM.fields.phone.placeholder}
                  autoComplete="tel"
                  inputMode="tel"
                  minLength={10}
                  maxLength={15}
                  required
                  onKeyDown={(event) => {
                    if (
                      event.key === "Backspace" ||
                      event.key === "Delete" ||
                      event.key === "ArrowLeft" ||
                      event.key === "ArrowRight" ||
                      event.key === "Tab" ||
                      event.key === "Enter"
                    ) {
                      return;
                    }
                    if (
                      (event.ctrlKey || event.metaKey) &&
                      ["a", "c", "v", "x"].includes(event.key.toLowerCase())
                    ) {
                      return;
                    }
                    if (!/^\d$/.test(event.key)) event.preventDefault();
                  }}
                  onPaste={(event) => {
                    event.preventDefault();
                    const pasted = event.clipboardData.getData("text");
                    const sanitized = pasted.replace(/\D/g, "");
                    event.currentTarget.value = sanitized;
                  }}
                />
              </div>

              {LEAD_FORM.checkboxes.map((checkbox) => (
                <div key={checkbox.id} className="get-started-modal__checkbox">
                  <input
                    type="checkbox"
                    id={checkbox.id}
                    name={checkbox.name}
                    required
                  />
                  <label htmlFor={checkbox.id}>
                    {checkbox.label === "terms" ? (
                      <>
                        I agree and accept the{" "}
                        <Link
                          href={LEAD_FORM.termsHref}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms &amp; Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          href={LEAD_FORM.privacyHref}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </>
                    ) : (
                      checkbox.label
                    )}
                  </label>
                </div>
              ))}

              {submitError ? (
                <p className="get-started-modal__error m-0" role="alert">
                  {submitError}
                </p>
              ) : null}

              <button
                type="submit"
                className="btn btn-primary get-started-modal__submit"
                disabled={isSubmitting}
              >
                {LEAD_FORM.submitLabel}
                <FaArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
