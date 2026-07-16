"use client";

import { useMemo, useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import FormField from "./FormField";
import { ErrorMessage, LoadingState } from "./FormStatus";
import {
  allowedZipCodes,
  binPlans,
  calculateBinTotal,
  isZipServiced,
  web3formsAccessKey,
  type BillingInterval,
} from "@/lib/config";
import styles from "./SignupForm.module.css";

type ZipStatus = "idle" | "available" | "unavailable";
type Status = "idle" | "submitting" | "error";

const pickupDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function SignupForm({ initialPlan }: { initialPlan: BillingInterval }) {
  const router = useRouter();
  const [plan, setPlan] = useState<BillingInterval>(initialPlan);
  const [bins, setBins] = useState(1);
  const [zip, setZip] = useState("");
  const [zipStatus, setZipStatus] = useState<ZipStatus>("idle");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const config = binPlans[plan];
  const total = useMemo(() => calculateBinTotal(plan, bins), [plan, bins]);
  const allZips = useMemo(
    () => Array.from(new Set(Object.values(allowedZipCodes).flat())),
    [],
  );

  function checkZip(value: string) {
    setZip(value);
    if (value.trim().length < 5) {
      setZipStatus("idle");
      return;
    }
    setZipStatus(isZipServiced(value) ? "available" : "unavailable");
  }

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company_website") || "").length > 0) return;

    const nextErrors: Record<string, string> = {};
    const required = [
      ["name", "Please enter your full name."],
      ["email", "Please enter a valid email address."],
      ["phone", "Please enter a valid phone number."],
      ["address", "Please enter your service address."],
      ["city", "Please enter your city."],
      ["state", "Please enter your state."],
      ["zip", "Please enter your ZIP code."],
      ["pickupDay", "Please select your trash pickup day."],
      ["binLocation", "Please tell us where to find your bins."],
    ] as const;

    for (const [field, message] of required) {
      if (!String(data.get(field) || "").trim()) nextErrors[field] = message;
    }
    if (!data.get("serviceTerms")) nextErrors.serviceTerms = "You must accept the service terms.";
    if (config.recurring && !data.get("recurringBilling")) {
      nextErrors.recurringBilling = "You must accept recurring billing for this plan.";
    }
    if (!data.get("transactionalConsent")) {
      nextErrors.transactionalConsent = "Consent to transactional communications is required.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const zipValue = String(data.get("zip") || "");
    const serviced = isZipServiced(zipValue);

    setStatus("submitting");
    try {
      const payload = {
        access_key: web3formsAccessKey,
        subject: serviced
          ? "New Bin Cleaning signup — HGA Multiservi"
          : "Bin Cleaning waiting list signup — HGA Multiservi",
        source: "bin-cleaning-signup",
        signup_status: serviced ? "pending_payment" : "waiting_list",
        selected_plan: plan,
        number_of_bins: String(bins),
        total_price: String(total),
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("phone"),
        address: data.get("address"),
        unit: data.get("unit"),
        city: data.get("city"),
        state: data.get("state"),
        zip: zipValue,
        pickup_day: data.get("pickupDay"),
        recycling_day: data.get("recyclingDay"),
        bin_location: data.get("binLocation"),
        access_instructions: data.get("accessInstructions"),
        notes: data.get("notes"),
        marketing_consent: data.get("marketingConsent") ? "yes" : "no",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        const params = new URLSearchParams({
          status: serviced ? "received" : "waitlist",
          plan,
        });
        router.push(`/bin-cleaning/success?${params.toString()}`);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={styles.layout}>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="company_website">Leave this field empty</label>
          <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
        </div>

        <fieldset className={styles.fieldset}>
          <legend>Plan</legend>
          <div className={styles.planGrid}>
            {Object.values(binPlans).map((p) => (
              <label key={p.key} className={styles.planOption} data-selected={plan === p.key}>
                <input
                  type="radio"
                  name="plan"
                  value={p.key}
                  checked={plan === p.key}
                  onChange={() => setPlan(p.key)}
                />
                <span className={styles.planOptionName}>{p.name}</span>
                <span className={styles.planOptionPrice}>${p.firstBin.toFixed(2)}</span>
              </label>
            ))}
          </div>

          <FormField id="bins" label="Number of Bins" required>
            <select id="bins" name="bins" value={bins} onChange={(e) => setBins(Number(e.target.value))}>
              <option value={1}>1 bin</option>
              <option value={2}>2 bins</option>
            </select>
          </FormField>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Contact &amp; Service Address</legend>
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
            <FormField id="unit" label="Unit Number">
              <input type="text" id="unit" name="unit" autoComplete="address-line2" />
            </FormField>
            <FormField id="address" label="Service Address" required error={errors.address}>
              <input type="text" id="address" name="address" autoComplete="address-line1" aria-invalid={!!errors.address} />
            </FormField>
            <FormField id="city" label="City" required error={errors.city}>
              <input type="text" id="city" name="city" autoComplete="address-level2" aria-invalid={!!errors.city} />
            </FormField>
            <FormField id="state" label="State" required error={errors.state}>
              <input type="text" id="state" name="state" autoComplete="address-level1" defaultValue="FL" aria-invalid={!!errors.state} />
            </FormField>
            <FormField
              id="zip"
              label="ZIP Code"
              required
              error={errors.zip}
              hint={
                zipStatus === "available"
                  ? "Great news! We currently service your area."
                  : zipStatus === "unavailable"
                    ? undefined
                    : "We'll check availability in your area."
              }
            >
              <input
                type="text"
                id="zip"
                name="zip"
                inputMode="numeric"
                autoComplete="postal-code"
                value={zip}
                onChange={(e) => checkZip(e.target.value)}
                aria-invalid={!!errors.zip}
                list="known-zips"
              />
              <datalist id="known-zips">
                {allZips.map((z) => (
                  <option key={z} value={z} />
                ))}
              </datalist>
            </FormField>
          </div>

          {zipStatus === "unavailable" && (
            <div className={styles.zipNotice} role="status" aria-live="polite">
              We are not servicing your ZIP code yet. Join the waiting list and we will contact you
              when service becomes available. You will not be charged.
            </div>
          )}
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Pickup &amp; Access Details</legend>
          <div className={styles.grid}>
            <FormField id="pickupDay" label="Trash Pickup Day" required error={errors.pickupDay}>
              <select id="pickupDay" name="pickupDay" defaultValue="" aria-invalid={!!errors.pickupDay}>
                <option value="" disabled>
                  Select a day
                </option>
                {pickupDays.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField id="recyclingDay" label="Recycling Pickup Day">
              <select id="recyclingDay" name="recyclingDay" defaultValue="">
                <option value="">Not applicable</option>
                {pickupDays.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField id="binLocation" label="Bin Location" required error={errors.binLocation}>
              <input type="text" id="binLocation" name="binLocation" placeholder="e.g. Side of driveway" aria-invalid={!!errors.binLocation} />
            </FormField>
            <FormField id="accessInstructions" label="Gate Code or Access Instructions">
              <input type="text" id="accessInstructions" name="accessInstructions" />
            </FormField>
          </div>
          <FormField id="notes" label="Notes">
            <textarea id="notes" name="notes" rows={3} />
          </FormField>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Consent</legend>

          <label className={styles.consent} htmlFor="serviceTerms">
            <input type="checkbox" id="serviceTerms" name="serviceTerms" aria-invalid={!!errors.serviceTerms} />
            <span>
              I have read and accept the{" "}
              <a href="/bin-cleaning-terms" target="_blank" rel="noopener noreferrer">
                Bin Cleaning Terms
              </a>
              . *
            </span>
          </label>
          {errors.serviceTerms && <span className={styles.consentError} role="alert">{errors.serviceTerms}</span>}

          {config.recurring && (
            <>
              <label className={styles.consent} htmlFor="recurringBilling">
                <input type="checkbox" id="recurringBilling" name="recurringBilling" aria-invalid={!!errors.recurringBilling} />
                <span>
                  I authorize recurring billing of ${total.toFixed(2)} {config.frequencyLabel.toLowerCase()} until I cancel. *
                </span>
              </label>
              {errors.recurringBilling && (
                <span className={styles.consentError} role="alert">{errors.recurringBilling}</span>
              )}
            </>
          )}

          <label className={styles.consent} htmlFor="transactionalConsent">
            <input type="checkbox" id="transactionalConsent" name="transactionalConsent" aria-invalid={!!errors.transactionalConsent} />
            <span>I consent to receive transactional communications about my service. *</span>
          </label>
          {errors.transactionalConsent && (
            <span className={styles.consentError} role="alert">{errors.transactionalConsent}</span>
          )}

          <label className={styles.consent} htmlFor="marketingConsent">
            <input type="checkbox" id="marketingConsent" name="marketingConsent" />
            <span>(Optional) I&apos;d like to receive occasional promotions and offers by email.</span>
          </label>
        </fieldset>

        <button type="submit" className={styles.submit} disabled={status === "submitting"}>
          {status === "submitting" ? (
            <LoadingState>Submitting…</LoadingState>
          ) : zipStatus === "unavailable" ? (
            "Join Waiting List"
          ) : (
            "Continue to Secure Checkout"
          )}
        </button>
        <p className={styles.stripeNote}>
          Secure payment collection is being finalized. We will confirm availability and send a
          secure payment link before your first cleaning is scheduled — you will not be charged today.
        </p>

        {status === "error" && (
          <ErrorMessage>
            Something went wrong submitting your signup. Please try again or call us directly.
          </ErrorMessage>
        )}
      </form>

      <aside className={styles.summary} aria-label="Order summary">
        <h2>Order Summary</h2>
        <dl>
          <div>
            <dt>Plan</dt>
            <dd>{config.name}</dd>
          </div>
          <div>
            <dt>Number of bins</dt>
            <dd>{bins}</dd>
          </div>
          <div>
            <dt>First bin</dt>
            <dd>${config.firstBin.toFixed(2)}</dd>
          </div>
          {bins === 2 && (
            <div>
              <dt>Second bin</dt>
              <dd>+${config.secondBin.toFixed(2)}</dd>
            </div>
          )}
          <div>
            <dt>Billing frequency</dt>
            <dd>{config.frequencyLabel}</dd>
          </div>
        </dl>
        <div className={styles.total}>
          <span>Plan total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <p className={styles.totalNote}>
          You will not be charged today — we&apos;ll send a secure payment link once your signup is confirmed.
        </p>
      </aside>
    </div>
  );
}
