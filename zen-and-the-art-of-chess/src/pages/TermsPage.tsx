// ============================================
// TERMS OF SERVICE PAGE
// Required for App Store submission
// ============================================

import { useNavigate } from 'react-router-dom';

export function TermsPage() {
  const navigate = useNavigate();
  const lastUpdated = 'December 7, 2025';
  const contactEmail = 'legal@zenchess.app';

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm mb-4 hover:opacity-80 transition-opacity"
            style={{ color: 'var(--text-muted)' }}
          >
            ← Back
          </button>
          <h1 
            className="text-3xl font-display font-medium mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Terms of Service
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div 
          className="space-y-8 text-base leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {/* Agreement */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Agreement to Terms
            </h2>
            <p>
              By accessing or using Zen Chess ("the App"), you agree to be bound by these Terms of 
              Service. If you do not agree to these terms, please do not use the App.
            </p>
          </section>

          {/* Description of Service */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Description of Service
            </h2>
            <p>
              Zen Chess is a chess training application designed to help users improve their chess 
              skills through puzzles, games, courses, and AI-powered coaching. The App may be accessed 
              via web browser, iOS, or Android devices.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              User Accounts
            </h2>
            <p className="mb-3">
              Creating an account is optional. Without an account, your data is stored locally on 
              your device. If you choose to create an account:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must notify us immediately of any unauthorized access</li>
              <li>You may not share your account credentials with others</li>
              <li>We reserve the right to suspend accounts that violate these terms</li>
            </ul>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Acceptable Use
            </h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the App for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the App's functionality</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Use automated systems to access the App excessively</li>
              <li>Transmit viruses or malicious code</li>
              <li>Impersonate another person or entity</li>
              <li>Harass, abuse, or harm other users</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Intellectual Property
            </h2>
            <p className="mb-3">
              The App and its original content, features, and functionality are owned by Zen Chess 
              and are protected by international copyright, trademark, and other intellectual 
              property laws. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Zen Chess name, logo, and branding</li>
              <li>User interface design and layout</li>
              <li>Puzzle collections and course content</li>
              <li>AI coaching systems and prompts</li>
              <li>Sound effects and visual assets</li>
            </ul>
            <p className="mt-3">
              Historical chess games and standard chess positions are in the public domain and are 
              not claimed as our intellectual property.
            </p>
          </section>

          {/* Subscriptions and Payments */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Subscriptions and Payments
            </h2>
            <p className="mb-3">
              Zen Chess offers both free and premium features. For premium subscriptions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prices are displayed before purchase and include applicable taxes</li>
              <li>Subscriptions auto-renew unless cancelled before the renewal date</li>
              <li>You can manage subscriptions through your app store account</li>
              <li>Refunds are handled according to Apple/Google's refund policies</li>
              <li>We may change pricing with reasonable notice</li>
            </ul>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Disclaimers
            </h2>
            <p className="mb-3">
              THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, 
              EXPRESS OR IMPLIED, INCLUDING:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Warranties of merchantability and fitness for a particular purpose</li>
              <li>Warranties that the App will be error-free or uninterrupted</li>
              <li>Warranties regarding chess improvement or results</li>
              <li>Warranties about the accuracy of AI coaching advice</li>
            </ul>
            <p className="mt-3">
              Chess improvement depends on many factors including individual effort, practice time, 
              and natural ability. We do not guarantee specific results from using the App.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Limitation of Liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ZEN CHESS SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, LOSS 
              OF PROFITS, OR LOSS OF GOODWILL, ARISING FROM YOUR USE OF THE APP. OUR TOTAL LIABILITY 
              SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE PAST TWELVE MONTHS.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless Zen Chess and its officers, directors, employees, 
              and agents from any claims, damages, losses, or expenses arising from your use of the 
              App or violation of these Terms.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Termination
            </h2>
            <p className="mb-3">
              We may terminate or suspend your access to the App at any time, without prior notice, 
              for conduct that we believe:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violates these Terms of Service</li>
              <li>Is harmful to other users or us</li>
              <li>Is fraudulent or illegal</li>
            </ul>
            <p className="mt-3">
              You may terminate your account at any time by deleting the App or contacting us. Upon 
              termination, your right to use the App ceases immediately.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of 
              material changes through the App or by email. Your continued use of the App after 
              changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the 
              United States, without regard to its conflict of law provisions. Any disputes shall 
              be resolved in the courts of competent jurisdiction.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Contact Us
            </h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-3">
              <a href={`mailto:${contactEmail}`} className="text-purple-400 hover:underline">
                {contactEmail}
              </a>
            </p>
          </section>

          {/* Footer Links */}
          <section className="pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-4 text-sm">
              <button
                onClick={() => navigate('/privacy')}
                className="text-purple-400 hover:underline"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="text-purple-400 hover:underline"
              >
                Settings
              </button>
              <button
                onClick={() => navigate('/')}
                className="text-purple-400 hover:underline"
              >
                Home
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;

