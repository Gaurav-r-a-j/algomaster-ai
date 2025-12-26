"use client"

import Script from "next/script"
import { env } from "@/config/common/env"

/**
 * Google Tag Manager Provider
 * 
 * Loads GTM script and initializes dataLayer for tracking.
 * GTM allows you to manage all your analytics and marketing tags
 * from one place without code changes.
 * 
 * @see https://tagmanager.google.com
 */
export function GTMProvider() {
  const gtmId = env.NEXT_PUBLIC_GTM_ID

  if (!gtmId) {
    return null
  }

  return (
    <>
      {/* GTM Script - Loads in head */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      
      {/* GTM Noscript - Fallback for users with JavaScript disabled */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  )
}

// Re-export GTM utilities for convenience
// Use these functions to track events throughout your app
export {
  pushGTMEvent,
  trackEvent,
  trackPageView,
  trackButtonClick,
  trackFormSubmit,
  trackTopicComplete,
  trackQuizComplete,
  trackSignUp,
  trackLogin,
} from "@/lib/analytics"

