// ============================================
// PRIVACY POLICY PAGE
// Required for App Store submission
// ============================================

import { useNavigate } from 'react-router-dom';

export function PrivacyPage() {
  const navigate = useNavigate();
  const lastUpdated = 'December 7, 2025';
  const contactEmail = 'privacy@zenchess.app';

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
            Privacy Policy
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
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Introduction
            </h2>
            <p>
              Zen Chess ("we," "our," or "us") respects your privacy and is committed to protecting 
              your personal data. This privacy policy explains how we collect, use, and safeguard 
              your information when you use our chess training application.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Information We Collect
            </h2>
            
            <h3 className="text-lg font-medium mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              Information Stored Locally
            </h3>
            <p className="mb-3">
              By default, Zen Chess stores all your data locally on your device. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your puzzle progress and statistics</li>
              <li>Game history and analysis</li>
              <li>Course progress and completion status</li>
              <li>App preferences and settings</li>
              <li>Study notes and annotations</li>
              <li>Achievement and streak data</li>
            </ul>
            <p className="mt-3">
              This local data never leaves your device unless you explicitly choose to enable cloud sync.
            </p>

            <h3 className="text-lg font-medium mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              Information Collected with Cloud Sync (Optional)
            </h3>
            <p className="mb-3">
              If you create an account and enable cloud sync, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address (for account authentication)</li>
              <li>Your progress data (to sync across devices)</li>
              <li>Subscription status (if you purchase premium features)</li>
            </ul>

            <h3 className="text-lg font-medium mb-2 mt-4" style={{ color: 'var(--text-primary)' }}>
              Information Collected Automatically
            </h3>
            <p className="mb-3">
              We may collect limited technical information to improve our service:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Device type and operating system (for compatibility)</li>
              <li>App version (for updates and bug fixes)</li>
              <li>Crash reports (to improve stability)</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              How We Use Your Information
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain the Zen Chess application</li>
              <li>Save your progress and preferences locally</li>
              <li>Sync your data across devices (if you enable cloud sync)</li>
              <li>Process subscription payments (if applicable)</li>
              <li>Send important service notifications</li>
              <li>Improve and optimize the app experience</li>
              <li>Fix bugs and prevent technical issues</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Third-Party Services
            </h2>
            <p className="mb-3">
              Zen Chess may use the following third-party services:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Supabase:</strong> For optional user authentication and data sync. 
                <a href="https://supabase.com/privacy" className="text-purple-400 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>Stripe:</strong> For processing web payments (if applicable). 
                <a href="https://stripe.com/privacy" className="text-purple-400 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>RevenueCat:</strong> For managing in-app purchases on mobile. 
                <a href="https://www.revenuecat.com/privacy" className="text-purple-400 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>Anthropic:</strong> For AI coaching features (optional). Your chess positions 
                may be sent to Anthropic's API to provide personalized coaching. 
                <a href="https://www.anthropic.com/privacy" className="text-purple-400 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              data against unauthorized access, alteration, disclosure, or destruction. However, no 
              method of transmission over the Internet or electronic storage is 100% secure, and we 
              cannot guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Data Retention
            </h2>
            <p>
              Local data is stored on your device until you delete the app or clear the data manually. 
              If you have an account with cloud sync enabled, we retain your data for as long as your 
              account is active. You can request deletion of your cloud data at any time by contacting us.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data ("right to be forgotten")</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of optional data collection</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, use the Settings page in the app or contact us at{' '}
              <a href={`mailto:${contactEmail}`} className="text-purple-400 hover:underline">
                {contactEmail}
              </a>.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Children's Privacy
            </h2>
            <p>
              Zen Chess is suitable for users of all ages. We do not knowingly collect personal 
              information from children under 13 (or the applicable age in your jurisdiction) without 
              parental consent. If you believe we have collected data from a child without proper 
              consent, please contact us immediately.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any material 
              changes by posting the new policy in the app and updating the "Last updated" date. Your 
              continued use of Zen Chess after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
              Contact Us
            </h2>
            <p>
              If you have questions about this privacy policy or our data practices, please contact us at:
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
                onClick={() => navigate('/terms')}
                className="text-purple-400 hover:underline"
              >
                Terms of Service
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

export default PrivacyPage;

