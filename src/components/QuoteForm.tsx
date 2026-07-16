"use client";

import { useState, type SubmitEvent } from "react";
import FormField from "./FormField";
import { ErrorMessage, LoadingState, SuccessMessage } from "./FormStatus";
import { serviceNeededOptions, web3formsAccessKey } from "@/lib/config";
import styles from "./QuoteForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

type Errors = Partial<Record<
  "name" | "email" | "phone" | "address" | "city" | "zip" | "service" | "consent",
  string
>>;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v: string) => /^[\d\s()+.-]{7,}$/.test(v);

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never fill this hidden field.
    if (String(data.get("company_website") || "").length > 0) {
      return;
    }

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const address = String(data.get("address") || "").trim();
    const city = String(data.get("city") || "").trim();
    const zip = String(data.get("zip") || "").trim();
    const service = String(data.get("service") || "").trim();
    const consent = data.get("consent");

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your full name.";
    if (!email || !isEmail(email)) nextErrors.email = "Please enter a valid email address.";
    if (!phone || !isPhone(phone)) nextErrors.phone = "Please enter a valid phone number.";
    if (!address) nextErrors.address = "Please enter your service address.";
    if (!city) nextErrors.city = "Please enter your city.";
    if (!zip) nextErrors.zip = "Please enter your ZIP code.";
    if (!service) nextErrors.service = "Please select a service.";
    if (!consent) nextErrors.consent = "Consent is required to submit this form.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const payload = {
        access_key: web3formsAccessKey,
        subject: "New Exterior Cleaning quote request — HGA Multiservi",
        source: "exterior-cleaning",
        name,
        email,
        phone,
        address,
        city,
        zip,
        service,
        square_footage: String(data.get("sqft") || ""),
        message: String(data.get("message") || ""),
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {/* Honeypot field — hidden from real users, bots tend to fill every input. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.grid}>
        <FormField id="name" label="Full Name" required error={errors.name}>
          <input type="text" id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} />
        </FormField>

        <FormField id="email" label="Email Address" required error={errors.email}>
          <input type="email" id="email" name="email" autoComplete="email" aria-invalid={!!errors.email} />
        </FormField>

        <FormField id="phone" label="Phone Number" required error={errors.phone}>
          <input type="tel" id="phone" name="phone" autoComplete="tel" aria-invalid={!!errors.phone} />
        </FormField>

        <FormField id="address" label="Service Address" required error={errors.address}>
          <input type="text" id="address" name="address" autoComplete="street-address" aria-invalid={!!errors.address} />
        </FormField>

        <FormField id="city" label="City" required error={errors.city}>
          <input type="text" id="city" name="city" autoComplete="address-level2" aria-invalid={!!errors.city} />
        </FormField>

        <FormField id="zip" label="ZIP Code" required error={errors.zip}>
          <input type="text" id="zip" name="zip" inputMode="numeric" autoComplete="postal-code" aria-invalid={!!errors.zip} />
        </FormField>

        <FormField id="service" label="Service Needed" required error={errors.service}>
          <select id="service" name="service" defaultValue="" aria-invalid={!!errors.service}>
            <option value="" disabled>
              Select a service
            </option>
            {serviceNeededOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="sqft" label="Approximate Square Footage">
          <input type="text" id="sqft" name="sqft" inputMode="numeric" />
        </FormField>
      </div>

      <FormField id="message" label="Message">
        <textarea id="message" name="message" rows={4} />
      </FormField>

      <label className={styles.consent} htmlFor="consent">
        <input type="checkbox" id="consent" name="consent" aria-invalid={!!errors.consent} />
        <span>
          I consent to be contacted by HGA Multiservi about my quote request. *
        </span>
      </label>
      {errors.consent && (
        <span className={styles.consentError} role="alert">
          {errors.consent}
        </span>
      )}

      <button type="submit" className={styles.submit} disabled={status === "submitting"}>
        {status === "submitting" ? <LoadingState>Submitting…</LoadingState> : "Submit Request"}
      </button>

      {status === "success" && (
        <SuccessMessage>
          Thanks! Your quote request was sent. We&apos;ll be in touch shortly.
        </SuccessMessage>
      )}
      {status === "error" && (
        <ErrorMessage>
          Something went wrong sending your request. Please try again or call us directly.
        </ErrorMessage>
      )}
    </form>
  );
}
