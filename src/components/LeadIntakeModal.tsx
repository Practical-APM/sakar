"use client";

import { useState } from "react";
import { profile } from "@/data/social";

export function LeadIntakeModal({
  isOpen,
  onClose,
  onBlip,
}: {
  isOpen: boolean;
  onClose: () => void;
  onBlip?: () => void;
}) {
  const [roleType, setRoleType] = useState<string>("Full-time AI PM");
  const [companyName, setCompanyName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const mailSubject = encodeURIComponent(
    `Product Opportunity: ${roleType}${companyName ? ` at ${companyName}` : ""}`
  );
  const mailBody = encodeURIComponent(
    `Hi Sakar,\n\nI'm reaching out regarding a ${roleType} role${
      companyName ? ` with ${companyName}` : ""
    }.\n\n${message ? `Project Details:\n${message}\n\n` : ""}Let's connect!\n`
  );
  const mailtoHref = `mailto:${profile.email}?subject=${mailSubject}&body=${mailBody}`;

  const handleCopyEmail = () => {
    onBlip?.();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintResume = () => {
    onBlip?.();
    window.open(`/work`, "_blank");
  };

  return (
    <div className="modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div
        className="modal-container nes-container is-rounded is-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 className="modal-title">👾 HIRE SAKAR BAXI // PRODUCT INQUIRY</h3>
          <button
            type="button"
            className="nes-btn is-error modal-close-btn"
            onClick={() => {
              onBlip?.();
              onClose();
            }}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-intro">
            Select opportunity specs to draft a pre-formatted inquiry or grab Sakar's credentials.
          </p>

          <div className="modal-field">
            <label className="modal-label">ENGAGEMENT TYPE:</label>
            <div className="modal-options">
              {["Full-time AI PM", "Product Advisory", "0→1 Product Sprint"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`nes-btn modal-chip${roleType === type ? " is-warning" : ""}`}
                  onClick={() => {
                    onBlip?.();
                    setRoleType(type);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-field">
            <label className="modal-label">ORGANIZATION / COMPANY (OPTIONAL):</label>
            <input
              type="text"
              className="modal-input"
              placeholder="e.g. Acme Corp / Stealth Startup"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">PROJECT SCOPE / NOTE (OPTIONAL):</label>
            <textarea
              className="modal-textarea"
              rows={3}
              placeholder="Outline role objectives, integration needs, or team size..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <a
              href={mailtoHref}
              className="nes-btn is-success modal-action-btn"
              onClick={() => onBlip?.()}
            >
              ✉ SEND VIA EMAIL
            </a>
            <button
              type="button"
              className="nes-btn is-primary modal-action-btn"
              onClick={handleCopyEmail}
            >
              {copied ? "✓ COPIED!" : "📋 COPY EMAIL"}
            </button>
            <button
              type="button"
              className="nes-btn is-warning modal-action-btn"
              onClick={handlePrintResume}
            >
              📄 EXPORT RESUME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
