/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FileCode2,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { STANDALONE_PRIVACY_HTML } from './standalonePrivacyHtml';

type ViewMode = 'policy' | 'source';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('policy');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [uuidInput, setUuidInput] = useState('');
  const [copiedRevokeMsg, setCopiedRevokeMsg] = useState(false);

  const handleCopyStandaloneHtml = async () => {
    try {
      await navigator.clipboard.writeText(STANDALONE_PRIVACY_HTML);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2200);
    } catch {
      // Fallback textarea copy
      const el = document.createElement('textarea');
      el.value = STANDALONE_PRIVACY_HTML;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2200);
    }
  };

  const handleDownloadPrivacyHtml = () => {
    const blob = new Blob([STANDALONE_PRIVACY_HTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'privacy.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('jimetansai714@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // ignore
    }
  };

  const normalizedUuid = uuidInput.trim() || 'EMMC-XXXX-XXXX-XXXX';
  const revokeSubject = encodeURIComponent(`UUID Revocation Request — eMMC List (${normalizedUuid})`);
  const revokeBody = encodeURIComponent(
    `Hello PYONELAY-mobile Support,\n\nPlease permanently revoke and delete the paired authorization record for my app-scoped installation UUID:\n\nInstallation UUID: ${normalizedUuid}\nApplication: eMMC List (Android)\n\nThank you.`
  );

  const handleCopyRevokeText = async () => {
    const plainMsg = `Hello PYONELAY-mobile Support, please revoke and delete the paired authorization record for my eMMC List installation UUID: ${normalizedUuid}`;
    try {
      await navigator.clipboard.writeText(plainMsg);
      setCopiedRevokeMsg(true);
      setTimeout(() => setCopiedRevokeMsg(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] flex flex-col selection:bg-[#38bdf8]/20 selection:text-[#38bdf8]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-[1120px] mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            onClick={() => setViewMode('policy')}
            className="text-base font-bold tracking-tight text-[#f8fafc] hover:text-[#38bdf8] transition-colors whitespace-nowrap shrink-0"
          >
            PYONELAY-mobile
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav
            aria-label="Privacy policy navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400"
          >
            <a
              href="#overview"
              onClick={() => setViewMode('policy')}
              className="hover:text-[#f8fafc] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Overview
            </a>
            <a
              href="#uuid-scope"
              onClick={() => setViewMode('policy')}
              className="hover:text-[#f8fafc] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              App-Scoped UUID
            </a>
            <a
              href="#authorization"
              onClick={() => setViewMode('policy')}
              className="hover:text-[#f8fafc] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Authorization
            </a>
            <a
              href="#data-safety"
              onClick={() => setViewMode('policy')}
              className="hover:text-[#f8fafc] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Data Safety
            </a>
            <a
              href="#contact"
              onClick={() => setViewMode('policy')}
              className="hover:text-[#f8fafc] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleDownloadPrivacyHtml}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0f172a] bg-[#38bdf8] rounded-lg hover:bg-[#38bdf8]/90 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download privacy.html</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 pt-8 pb-20 flex-1">
        {/* Hero Header Card */}
        <section
          aria-labelledby="policy-title"
          className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-10 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="max-w-3xl">
              {/* Unboxed Metadata with Subtle Separators */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] font-semibold text-[#38bdf8] mb-3">
                <span>PYONELAY-mobile</span>
                <span aria-hidden="true" className="text-slate-500">
                  ·
                </span>
                <span className="text-slate-300 font-medium">Android Application Policy</span>
                <span aria-hidden="true" className="text-slate-500">
                  ·
                </span>
                <span className="text-slate-300 font-mono font-normal">
                  Effective Date: November 13, 2026
                </span>
              </div>

              <h1
                id="policy-title"
                className="text-2xl sm:text-4xl font-bold tracking-tight text-[#f8fafc] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Privacy Policy — eMMC List
              </h1>

              <p className="text-slate-300 text-base sm:text-[17px] leading-relaxed max-w-[70ch]">
                This Privacy Policy describes how <strong className="text-white font-semibold">eMMC List</strong>,
                developed and maintained by <strong className="text-white font-semibold">PYONELAY-mobile</strong>,
                handles technical installation identifiers and local hardware reference data in strict compliance with{' '}
                <strong className="text-white font-semibold">Google Play Store Developer Program Policies</strong> and{' '}
                <strong className="text-white font-semibold">Google Play Data Safety</strong> requirements.
              </p>
            </div>

            {/* Interactive Workspace Switcher (Policy View vs GitHub Pages Source Code) */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 shrink-0">
              <div
                role="tablist"
                aria-label="Document view mode"
                className="inline-flex items-center p-1 bg-[#0f172a] border border-slate-800 rounded-lg"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === 'policy'}
                  onClick={() => setViewMode('policy')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    viewMode === 'policy'
                      ? 'bg-[#1e293b] text-[#38bdf8]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Rendered Policy
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={viewMode === 'source'}
                  onClick={() => setViewMode('source')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    viewMode === 'source'
                      ? 'bg-[#1e293b] text-[#38bdf8]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>Standalone HTML Code</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyStandaloneHtml}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-[#0f172a] hover:bg-slate-900 border border-slate-700/80 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedHtml ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span className="text-[#38bdf8]">Copied privacy.html</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy HTML for GitHub Pages</span>
                    </>
                  )}
                </button>
                <a
                  href="/privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#38bdf8] bg-[#0f172a] hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  title="Open raw standalone /privacy.html in new tab"
                >
                  <span>/privacy.html</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* 4-Column Compliance Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
            <div>
              <div className="text-xs text-slate-400 mb-1">Account Registration</div>
              <div className="text-sm font-semibold text-white">No Login or Profile Required</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Personal Data Collection</div>
              <div className="text-sm font-semibold text-white">Zero Personal Data Collected</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Ads &amp; Third-Party Sharing</div>
              <div className="text-sm font-semibold text-white">Zero Ads · Zero Sharing</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Installation Identifier</div>
              <div className="text-sm font-semibold text-[#38bdf8] font-mono">App-Scoped UUID (EMMC-...)</div>
            </div>
          </div>
        </section>

        {viewMode === 'source' ? (
          /* Standalone HTML Source Code Viewer for GitHub Pages */
          <section className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-800">
              <div>
                <div className="text-xs font-mono text-[#38bdf8] mb-1">
                  Single-File Deployment Artifact · Zero External Dependencies
                </div>
                <h2 className="text-lg font-bold text-white">
                  Ready-to-Deploy <code className="font-mono text-[#38bdf8]">privacy.html</code> /{' '}
                  <code className="font-mono text-[#38bdf8]">index.html</code>
                </h2>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyStandaloneHtml}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-100 bg-[#0f172a] border border-slate-700 rounded-lg hover:border-[#38bdf8] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedHtml ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span className="text-[#38bdf8]">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Complete HTML</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPrivacyHtml}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0f172a] bg-[#38bdf8] rounded-lg hover:bg-[#38bdf8]/90 transition-opacity cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download privacy.html</span>
                </button>
              </div>
            </div>

            <pre className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 sm:p-6 overflow-x-auto text-xs sm:text-[13px] leading-relaxed text-slate-300 font-mono select-all max-h-[720px]">
              <code>{STANDALONE_PRIVACY_HTML}</code>
            </pre>
          </section>
        ) : (
          /* Policy Sections Stack */
          <div className="space-y-6">
            {/* Section 01: App Overview */}
            <section
              id="overview"
              aria-labelledby="heading-overview"
              className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-9"
            >
              <div className="text-xs font-mono font-semibold text-[#38bdf8] mb-1.5">
                01 · Application Scope &amp; Purpose
              </div>
              <h2
                id="heading-overview"
                className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4"
              >
                App Overview
              </h2>
              <div className="space-y-4 text-slate-300 text-[15.5px] leading-relaxed max-w-[72ch]">
                <p>
                  <strong className="text-white font-semibold">eMMC List</strong> is a dedicated technical hardware
                  reference and memory chip (<strong className="text-white font-semibold">eMMC / UFS</strong>)
                  specification lookup tool designed for mobile repair technicians, board-level micro-soldering
                  specialists, and hardware engineers. The application provides structured integrated circuit (IC)
                  part numbers, BGA pinout diagrams, capacity/density configurations, and cross-device compatibility
                  reference tables.
                </p>
                <p>
                  The application is engineered to operate seamlessly in both{' '}
                  <strong className="text-white font-semibold">offline and online</strong> modes. Technicians can
                  search locally cached hardware specifications at the repair workbench without an internet connection,
                  and synchronize updated memory chip reference catalogs when online connectivity is available.
                </p>
              </div>
            </section>

            {/* Section 02: No Account Registration */}
            <section
              id="no-account"
              aria-labelledby="heading-no-account"
              className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-9"
            >
              <div className="text-xs font-mono font-semibold text-[#38bdf8] mb-1.5">
                02 · Zero Identity Profiling
              </div>
              <h2
                id="heading-no-account"
                className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4"
              >
                No Account Registration Required
              </h2>
              <div className="space-y-4 text-slate-300 text-[15.5px] leading-relaxed max-w-[72ch]">
                <p>
                  <strong className="text-white font-semibold">eMMC List</strong> does not require or provide user
                  account registration, sign-up screens, password authentication, user names, email addresses, or
                  personal profiles.
                </p>
                <p>
                  Technicians can install and launch the application immediately without creating an account or
                  submitting any personally identifiable information (PII).
                </p>
              </div>
            </section>

            {/* Section 03: App-Scoped Device UUID */}
            <section
              id="uuid-scope"
              aria-labelledby="heading-uuid"
              className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-9"
            >
              <div className="text-xs font-mono font-semibold text-[#38bdf8] mb-1.5">
                03 · Technical Installation Identifier
              </div>
              <h2
                id="heading-uuid"
                className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4"
              >
                App-Scoped Device UUID (
                <code className="font-mono text-[#38bdf8] bg-[#0f172a] px-2 py-0.5 rounded border border-slate-800 text-[0.9em]">
                  EMMC-...
                </code>
                )
              </h2>
              <div className="space-y-4 text-slate-300 text-[15.5px] leading-relaxed max-w-[72ch]">
                <p>
                  Upon first launch, <strong className="text-white font-semibold">eMMC List</strong> generates a
                  random, app-scoped installation identifier formatted with the prefix{' '}
                  <code className="font-mono text-[#38bdf8] bg-[#0f172a] px-1.5 py-0.5 rounded border border-slate-800 text-sm">
                    EMMC-...
                  </code>{' '}
                  (UUID). This identifier is stored locally inside the application&apos;s private sandbox storage on
                  your Android device.
                </p>
                <p>The app-scoped installation UUID is utilized solely for:</p>
                <ul className="space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="text-[#38bdf8] font-mono select-none">—</span>
                    <span>
                      <strong className="text-white font-semibold">Configuration Synchronization:</strong> Keeping
                      local hardware specification tables and schema revisions synchronized between offline and online
                      sessions.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#38bdf8] font-mono select-none">—</span>
                    <span>
                      <strong className="text-white font-semibold">Offline/Online Database Access Verification:</strong>{' '}
                      Validating cached database integrity for uninterrupted workbench lookup.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#38bdf8] font-mono select-none">—</span>
                    <span>
                      <strong className="text-white font-semibold">Technical Authorization:</strong> Pairing an
                      authorized activation token with your specific app installation instance.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Hardware & Personal Identifier Exclusion Box */}
              <div className="mt-6 bg-[#0f172a] border border-[#38bdf8]/35 rounded-xl p-5 max-w-[72ch]">
                <div className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#38bdf8] shrink-0" />
                  <span>Strict Hardware &amp; Personal Identifier Exclusion</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong className="text-white font-semibold">eMMC List</strong> explicitly does{' '}
                  <strong className="text-white font-semibold">NOT</strong> collect, read, access, or transmit
                  hardware <strong className="text-white font-semibold">IMEI</strong> numbers, device{' '}
                  <strong className="text-white font-semibold">serial numbers</strong>,{' '}
                  <strong className="text-white font-semibold">MAC addresses</strong>,{' '}
                  <strong className="text-white font-semibold">phone numbers</strong>, SIM identifiers,{' '}
                  <strong className="text-white font-semibold">contacts</strong>, or{' '}
                  <strong className="text-white font-semibold">GPS / location</strong> data.
                </p>
              </div>
            </section>

            {/* Section 04: Access Key / Authorization Token */}
            <section
              id="authorization"
              aria-labelledby="heading-authorization"
              className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-9"
            >
              <div className="text-xs font-mono font-semibold text-[#38bdf8] mb-1.5">
                04 · Technical Token Pairing
              </div>
              <h2
                id="heading-authorization"
                className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4"
              >
                Access Key / Authorization Token
              </h2>
              <div className="space-y-4 text-slate-300 text-[15.5px] leading-relaxed max-w-[72ch]">
                <p>
                  <strong className="text-white font-semibold">eMMC List</strong> provides core memory chip lookup
                  utilities and supports technical authorization tokens for unlocking extended hardware reference
                  datasets:
                </p>

                <div className="bg-[#0f172a] border border-[#38bdf8]/35 rounded-xl p-5 text-white font-medium leading-relaxed">
                  Extended database features are unlocked using an authorized Access Key / Activation Token issued by
                  the developer and paired with your installation UUID.
                </div>

                <p>
                  When a user enters an authorized Access Key / Activation Token, the application communicates over an
                  encrypted HTTPS channel (<code className="font-mono text-[#38bdf8] text-sm">TLS 1.3</code>) to verify
                  the token pairing with the local{' '}
                  <code className="font-mono text-[#38bdf8] text-sm">EMMC-...</code> installation UUID and stores the
                  authorization state locally for offline use.
                </p>
              </div>
            </section>

            {/* Section 05: Data Safety, Ads & Third-Party Sharing */}
            <section
              id="data-safety"
              aria-labelledby="heading-data-safety"
              className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-9"
            >
              <div className="text-xs font-mono font-semibold text-[#38bdf8] mb-1.5">
                05 · Google Play Data Safety Compliance
              </div>
              <h2
                id="heading-data-safety"
                className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4"
              >
                Data Safety, Ads &amp; Third-Party Sharing
              </h2>
              <p className="text-slate-300 text-[15.5px] leading-relaxed max-w-[72ch] mb-6">
                In compliance with Google Play Store Data Safety disclosure requirements,{' '}
                <strong className="text-white font-semibold">PYONELAY-mobile</strong> certifies the following
                application privacy guarantees:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5">
                  <div className="text-sm font-bold text-white mb-1.5">Zero Personal Data Collected</div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    No personal identifiers, names, emails, phone numbers, contacts, media files, or location
                    coordinates are collected or requested.
                  </p>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5">
                  <div className="text-sm font-bold text-white mb-1.5">Zero Third-Party Advertisements</div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    The application contains zero advertising SDKs, zero banner or interstitial ads, and zero cross-app
                    behavioral tracking.
                  </p>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5">
                  <div className="text-sm font-bold text-white mb-1.5">Zero Data Sold or Shared</div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Zero user or installation data is ever sold, rented, or shared with third-party analytics providers,
                    data brokers, or external organizations.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 06: Data Retention & Deletion */}
            <section
              id="retention"
              aria-labelledby="heading-retention"
              className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-9"
            >
              <div className="text-xs font-mono font-semibold text-[#38bdf8] mb-1.5">
                06 · User Control &amp; Data Erasure
              </div>
              <h2
                id="heading-retention"
                className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4"
              >
                Data Retention &amp; Deletion
              </h2>
              <div className="space-y-4 text-slate-300 text-[15.5px] leading-relaxed max-w-[72ch]">
                <p>
                  Users have complete, immediate control over locally stored application data and their app-scoped
                  installation UUID:
                </p>
                <ul className="space-y-3 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="text-[#38bdf8] font-mono select-none">—</span>
                    <span>
                      <strong className="text-white font-semibold">Reset or Delete Local Data Anytime:</strong> You can
                      delete all locally cached database files, saved preferences, and reset your app-scoped{' '}
                      <code className="font-mono text-[#38bdf8] text-sm">EMMC-...</code> UUID at any time by clearing
                      the application storage in Android Settings (
                      <em>Settings &rarr; Apps &rarr; eMMC List &rarr; Storage &rarr; Clear Data</em>) or by
                      uninstalling the application.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#38bdf8] font-mono select-none">—</span>
                    <span>
                      <strong className="text-white font-semibold">Revoke a Paired UUID Record:</strong> You may also
                      contact the developer directly via email, WhatsApp/Viber, or Telegram to request permanent
                      revocation and deletion of a paired{' '}
                      <code className="font-mono text-[#38bdf8] text-sm">EMMC-...</code> UUID record.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Optional Interactive UUID Revocation Request Helper */}
              <div className="mt-6 bg-[#0f172a] border border-slate-800 rounded-xl p-5 max-w-[72ch]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#38bdf8] mb-2">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Quick UUID Revocation Request Generator</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mb-3">
                  Enter your app-scoped <code className="font-mono text-slate-300">EMMC-...</code> UUID below to
                  generate a pre-filled revocation request via Email or copy the formatted message for WhatsApp /
                  Telegram:
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={uuidInput}
                    onChange={(e) => setUuidInput(e.target.value)}
                    placeholder="e.g. EMMC-8F4A-92C1-04B7"
                    aria-label="Your App-Scoped UUID"
                    className="flex-1 bg-[#1e293b] border border-slate-700 rounded-lg px-3.5 py-2 text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38bdf8]"
                  />
                  <a
                    href={`mailto:jimetansai714@gmail.com?subject=${revokeSubject}&body=${revokeBody}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0f172a] bg-[#38bdf8] rounded-lg hover:bg-[#38bdf8]/90 transition-opacity whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Revocation Email</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyRevokeText}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 bg-[#1e293b] border border-slate-700 rounded-lg hover:border-[#38bdf8] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedRevokeMsg ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#38bdf8]" />
                        <span className="text-[#38bdf8]">Copied Message</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Request Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* Section 07: Contact Developer */}
            <section
              id="contact"
              aria-labelledby="heading-contact"
              className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 sm:p-9"
            >
              <div className="text-xs font-mono font-semibold text-[#38bdf8] mb-1.5">
                07 · Official Support &amp; Inquiries
              </div>
              <h2
                id="heading-contact"
                className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3"
              >
                Contact Developer
              </h2>
              <p className="text-slate-300 text-[15.5px] leading-relaxed max-w-[72ch] mb-6">
                For questions regarding this Privacy Policy, technical database synchronization, or paired UUID
                deletion requests, contact <strong className="text-white font-semibold">PYONELAY-mobile</strong> through
                any of the official channels below:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Developer / Brand */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                  <span className="text-xs text-slate-400 mb-1">Developer / Brand</span>
                  <span className="text-base font-bold text-white">PYONELAY-mobile</span>
                </div>

                {/* Email */}
                <div className="bg-[#0f172a] border border-slate-800 hover:border-[#38bdf8]/40 rounded-xl p-5 flex items-center justify-between gap-3 transition-colors">
                  <div className="min-w-0">
                    <span className="block text-xs text-slate-400 mb-1">Email</span>
                    <a
                      href="mailto:jimetansai714@gmail.com"
                      className="text-sm sm:text-base font-semibold text-[#38bdf8] hover:underline font-mono break-all"
                    >
                      jimetansai714@gmail.com
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email address"
                    className="p-2 text-slate-400 hover:text-white bg-[#1e293b] rounded-lg border border-slate-800 cursor-pointer shrink-0"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-[#38bdf8]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* WhatsApp / Viber */}
                <div className="bg-[#0f172a] border border-slate-800 hover:border-[#38bdf8]/40 rounded-xl p-5 flex items-center justify-between gap-3 transition-colors">
                  <div>
                    <span className="block text-xs text-slate-400 mb-1">WhatsApp / Viber</span>
                    <a
                      href="https://wa.me/959977500588"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-semibold text-[#38bdf8] hover:underline font-mono"
                    >
                      +95 9977500588
                    </a>
                  </div>
                  <a
                    href="tel:+959977500588"
                    title="Call or message +95 9977500588"
                    className="p-2 text-slate-400 hover:text-[#38bdf8] bg-[#1e293b] rounded-lg border border-slate-800 shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

                {/* Telegram */}
                <div className="bg-[#0f172a] border border-slate-800 hover:border-[#38bdf8]/40 rounded-xl p-5 flex items-center justify-between gap-3 transition-colors">
                  <div>
                    <span className="block text-xs text-slate-400 mb-1">Telegram</span>
                    <a
                      href="https://t.me/pl14564"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-semibold text-[#38bdf8] hover:underline font-mono"
                    >
                      @pl14564
                    </a>
                  </div>
                  <a
                    href="https://t.me/pl14564"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Telegram @pl14564"
                    className="p-2 text-slate-400 hover:text-[#38bdf8] bg-[#1e293b] rounded-lg border border-slate-800 shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 py-8 px-6 text-xs text-slate-400">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; 2026 PYONELAY-mobile. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span>Privacy Policy — eMMC List</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">Effective Date: November 13, 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
