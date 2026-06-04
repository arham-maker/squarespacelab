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
import {
  LP_LEAD_FORM,
  LP_PHONE_COUNTRIES,
} from "@/lib/data/lp-lead-form";
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
};

export function LpLeadModal({
  isOpen,
  selectedPackage,
  onClose,
}: LpLeadModalProps) {
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [countryDial, setCountryDial] = useState<string>(
    LP_PHONE_COUNTRIES[0].dial
  );

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
    const phoneLocal = getFormString(formData, LP_LEAD_FORM.fields.phone.name);
    const dial =
      getFormString(formData, "countryDial") || countryDial;

    try {
      const baseFields = {
        fullName: getFormString(formData, LP_LEAD_FORM.fields.name.name),
        email: getFormString(formData, LP_LEAD_FORM.fields.email.name),
        phone: `${dial}${phoneLocal}`.replace(/\s+/g, ""),
        businessIndustry: getFormString(
          formData,
          LP_LEAD_FORM.fields.industry.name
        ),
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
      router.push(LP_LEAD_FORM.thankYouPath);
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
              <h3>
                <span className="fs-36">{LP_LEAD_FORM.title}</span>
              </h3>
              {selectedPackage ? (
                <h4>
                  starting at <span>{selectedPackage.price}</span> only
                </h4>
              ) : null}
              {selectedPackage ? (
                <div className="lp-lead-modal__package">
                  <strong>{selectedPackage.name}</strong>
                  {selectedPackage.category ? (
                    <>
                      <br />
                      {selectedPackage.category}
                    </>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="formpop">
              <form onSubmit={handleSubmit} noValidate>
                <div className="fld-input">
                  <input
                    type="text"
                    name={LP_LEAD_FORM.fields.name.name}
                    placeholder={LP_LEAD_FORM.fields.name.placeholder}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="fld-input">
                  <input
                    type="email"
                    name={LP_LEAD_FORM.fields.email.name}
                    placeholder={LP_LEAD_FORM.fields.email.placeholder}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="fld-input fld-input--phone">
                  <select
                    name="countryDial"
                    value={countryDial}
                    onChange={(event) => setCountryDial(event.target.value)}
                    aria-label="Country code"
                  >
                    {LP_PHONE_COUNTRIES.map((country) => (
                      <option key={country.dial} value={country.dial}>
                        {country.label} {country.dial}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name={LP_LEAD_FORM.fields.phone.name}
                    placeholder={LP_LEAD_FORM.fields.phone.placeholder}
                    autoComplete="tel"
                    inputMode="tel"
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
                  />
                </div>

                <div className="fld-input">
                  <textarea
                    name={LP_LEAD_FORM.fields.industry.name}
                    placeholder={LP_LEAD_FORM.fields.industry.placeholder}
                    rows={2}
                  />
                </div>

                {submitError ? (
                  <p className="lp-lead-modal__error" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <div className="fld-btn">
                  <button type="submit" disabled={isSubmitting}>
                    {LP_LEAD_FORM.submitLabel}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="popup-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LP_LEAD_FORM.image.src}
              alt={LP_LEAD_FORM.image.alt}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
