import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shiv Raj Singh | AI/ML Engineer & Full Stack Developer",
  description:
    "B.Tech AI/ML student passionate about building AI-driven and scalable web applications. Full-stack developer combining intelligent automation with clean, user-friendly interfaces.",
  generator: "SR",

  icons: {
    icon: [
      {
        url: "/Sr.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/Sr.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/Sr.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/Sr.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
        ${spaceGrotesk.variable}
        ${jetbrainsMono.variable}
        scroll-smooth
      `}
    >
      <head>
        {/* 🧹 Strip extension-injected attributes before React hydrates */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function removeExtensionAttrs(node) {
                  if (node.nodeType !== 1) return;
                  var attrs = node.attributes;
                  for (var i = attrs.length - 1; i >= 0; i--) {
                    var name = attrs[i].name;
                    if (
                      name === 'fdprocessedid' ||
                      name.startsWith('bis_') ||
                      name.startsWith('__processed_') ||
                      name === 'bis_register'
                    ) {
                      node.removeAttribute(name);
                    }
                  }
                }
                // Clean the entire document once
                function cleanupRoot() {
                  removeExtensionAttrs(document.documentElement);
                  var walker = document.createTreeWalker(
                    document.documentElement,
                    NodeFilter.SHOW_ELEMENT
                  );
                  while (walker.nextNode()) {
                    removeExtensionAttrs(walker.currentNode);
                  }
                }
                cleanupRoot();

                // Watch for late additions until hydration is complete
                var observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.target.nodeType === 1) {
                      var name = mutation.attributeName;
                      if (
                        name === 'fdprocessedid' ||
                        name.startsWith('bis_') ||
                        name.startsWith('__processed_') ||
                        name === 'bis_register'
                      ) {
                        mutation.target.removeAttribute(name);
                      }
                    } else if (mutation.type === 'childList') {
                      mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                          removeExtensionAttrs(node);
                          var subWalker = document.createTreeWalker(
                            node,
                            NodeFilter.SHOW_ELEMENT
                          );
                          while (subWalker.nextNode()) {
                            removeExtensionAttrs(subWalker.currentNode);
                          }
                        }
                      });
                    }
                  });
                });
                observer.observe(document.documentElement, {
                  attributes: true,
                  childList: true,
                  subtree: true,
                });
                // Stop observing after 5 seconds – hydration will be long done
                setTimeout(function() { observer.disconnect(); }, 5000);
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="
          font-sans
          antialiased

          bg-[#050510]
          text-white

          overflow-x-hidden
          overscroll-none

          selection:bg-pink-500/30
          selection:text-white

          [font-synthesis-weight:none]
          [text-rendering:optimizeLegibility]
        "
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}