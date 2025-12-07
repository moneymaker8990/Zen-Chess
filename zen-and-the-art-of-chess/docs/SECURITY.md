# Security Guide

## Environment Variables

Zen Chess uses the following environment variables. Create a `.env` file in the root directory with these values:

### Required for AI Features
```
VITE_ANTHROPIC_API_KEY=sk-ant-xxxxx
```
Get from: https://console.anthropic.com/

### Optional: Authentication & Cloud Sync
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
```
Get from: https://supabase.com/dashboard

### Optional: Web Payments
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
VITE_API_URL=https://your-backend.com
```
Get from: https://dashboard.stripe.com/

### Optional: Mobile In-App Purchases
```
VITE_REVENUECAT_IOS_KEY=xxxxx
VITE_REVENUECAT_ANDROID_KEY=xxxxx
```
Get from: https://app.revenuecat.com/

### Optional: Debug Mode
```
VITE_DEBUG=false
```
Set to 'true' to enable debug logging in production.

## Security Measures

### Content Security Policy (CSP)

The app includes a Content Security Policy in `vercel.json` that:
- Restricts script sources to self and inline (required for Vite)
- Allows connections only to trusted domains (Anthropic, Supabase, Lichess)
- Blocks framing (clickjacking protection)
- Restricts media and font sources

### HTTP Security Headers

The following security headers are set:
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-XSS-Protection: 1; mode=block` - XSS filter
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information
- `Permissions-Policy` - Restricts browser features

### API Key Security

1. **Never commit API keys** - All keys should be in `.env` (gitignored)
2. **Client-side keys are public** - `VITE_` prefix means keys are bundled in client code
3. **Use server-side validation** - For sensitive operations, validate on backend
4. **Anthropic key exposure** - The Anthropic key is used with `dangerouslyAllowBrowser: true`. Consider moving to an edge function for production.

### Sensitive Operations

For production deployments, consider:
1. Moving Anthropic API calls to an edge function or backend
2. Validating user authentication on server-side
3. Rate limiting API requests
4. Implementing proper CORS policies on your API

## Data Security

### Local Storage
- User data is stored in browser localStorage by default
- Data is not encrypted (rely on browser security)
- Users can export/import their data from Settings

### Cloud Sync (Optional)
- Uses Supabase for authentication and data storage
- Row Level Security (RLS) should be enabled in Supabase
- Data is transmitted over HTTPS

## Reporting Security Issues

If you discover a security vulnerability, please email: security@zenchess.app

Do not create public GitHub issues for security vulnerabilities.


