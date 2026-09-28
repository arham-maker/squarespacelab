"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, type FormEvent } from "react";
import {
  getFormString,
  submitForm,
} from "@/lib/forms/submit-form-client";

const BENEFITS = [
  "Expert Team of Designers",
  "Customized Design",
  "Dedicated Project Manager",
  "Initial concepts within 48 hours",
] as const;

export function Lp2LeadStrip() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      await submitForm({
        formType: "get-started",
        fields: {
          fullName: getFormString(formData, "fullName"),
          email: getFormString(formData, "email"),
          phone: getFormString(formData, "phone"),
        },
      });
      window.location.assign("/thankyou-lp2");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit form. Please try again."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <section className="lp2-lead-strip" aria-label="Get started with Squarespace">
      <div className="container">
        <div className="lp2-lead-strip__inner">
          <p className="lp2-lead-strip__eyebrow">Limited-time Squarespace offer</p>
          <h2 className="lp2-lead-strip__title">
            Get A Professional Resume Starting From <span>$79</span>
          </h2>
          <p className="lp2-lead-strip__lead">
            Let our experts craft a tailored website to help grow your online
            presence.
          </p>

          <ul className="lp2-lead-strip__benefits">
            {BENEFITS.map((item) => (
              <li key={item}>
                <span className="lp2-lead-strip__check" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="12" height="12">
                    <path
                      fill="currentColor"
                      d="M6.2 11.4 2.8 8l1.1-1.1 2.3 2.3 5-5L12.3 5.3z"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <form className="lp2-lead-strip__form" onSubmit={onSubmit}>
            <label className="lp2-lead-strip__field">
              <span className="visually-hidden">Full Name</span>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                autoComplete="name"
                disabled={isSubmitting}
              />
            </label>
            <label className="lp2-lead-strip__field">
              <span className="visually-hidden">Email Address</span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                autoComplete="email"
                disabled={isSubmitting}
              />
            </label>
            <label className="lp2-lead-strip__field lp2-lead-strip__field--phone">
              <span className="visually-hidden">Phone Number</span>
              <span className="lp2-lead-strip__dial" aria-hidden="true">
                +1
              </span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                autoComplete="tel"
                disabled={isSubmitting}
              />
            </label>
            <button
              type="submit"
              className="lp2-lead-strip__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Get Started Today"}
              {!isSubmitting ? (
                <i className="fas fa-arrow-right" aria-hidden="true" />
              ) : null}
            </button>
          </form>

          {error ? <p className="lp2-lead-strip__error">{error}</p> : null}

          <p className="lp2-lead-strip__promo">
            Sign-up today and save up to <span>80%</span> on all our packages
          </p>

          <div className="lp2-lead-strip__trust">
            <img
              src="/lp2w/assets/images/green-stars.svg"
              alt=""
              width={88}
              height={16}
            />
            <p>
              Rated <strong>4.6/5</strong> based on client reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
