import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Massar Trading | Official Links",
  description:
    "Connect with Massar Trading. Visit our website, shop on Shopee, contact us on WhatsApp, or email our team.",
};

const links = [
  {
    title: "Official Website",
    subtitle: "Visit Massar Trading",
    href: "https://www.massartrading.com",
    icon: "globe",
  },
  {
    title: "Shop on Shopee",
    subtitle: "Discover our NAWAH store",
    href: "https://shopee.com.my/nawahfood",
    icon: "shopping",
  },
  {
    title: "WhatsApp – Contact 1",
    subtitle: "+60 11-6564 2624",
    href: "https://wa.me/601165642624",
    icon: "whatsapp",
  },
  {
    title: "WhatsApp – Contact 2",
    subtitle: "+60 11-6560 2624",
    href: "https://wa.me/601165602624",
    icon: "whatsapp",
  },
  {
    title: "Email Us",
    subtitle: "info@massartrading.com",
    href: "mailto:info@massartrading.com",
    icon: "email",
  },
];

function LinkIcon({ type }: { type: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "globe") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18" />
        <path d="M12 3a15 15 0 0 0 0 18" />
      </svg>
    );
  }

  if (type === "shopping") {
    return (
      <svg {...common}>
        <path d="M5 8h14l1 12H4L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg {...common}>
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.6a8.5 8.5 0 1 1 16.3-3.9Z" />
        <path d="M8.5 8.5c.5 3 2 4.5 5 6l1.5-1.5 2 1c-.3 1.5-1.5 2.5-3 2.5-3.5-.5-7-4-7.5-7.5 0-1.5 1-2.7 2.5-3l1 2-1.5 1.5Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function LinksPage() {
  return (
    <main className="links-page">
      <div className="background-glow" />

      <section className="content">
        <div className="brand-mark">M</div>

        <div className="brand-name">MASSAR TRADING</div>

        <div className="gold-line" />

        <p className="eyebrow">OFFICIAL COMPANY LINKS</p>

        <h1>
          Connect With
          <br />
          <span>Massar Trading</span>
        </h1>

        <p className="description">
          Explore our official website, discover our products,
          and get in touch with our team.
        </p>

        <div className="links-list">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <div className="icon-box">
                <LinkIcon type={link.icon} />
              </div>

              <div className="link-text">
                <span className="link-title">{link.title}</span>
                <span className="link-subtitle">
                  {link.subtitle}
                </span>
              </div>

              <span className="arrow">↗</span>
            </a>
          ))}
        </div>

        <div className="footer">
          <div className="footer-line" />
          <p>QUALITY • TRUST • EXCELLENCE</p>
          <span>© {new Date().getFullYear()} MASSAR TRADING</span>
        </div>
      </section>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .links-page {
          min-height: 100vh;
          background: #080808;
          color: #f5f2ec;
          position: relative;
          overflow: hidden;
          padding: 55px 20px 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Arial, Helvetica, sans-serif;
        }

        .background-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          top: -280px;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(
            circle,
            rgba(190, 148, 78, 0.13),
            transparent 70%
          );
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 470px;
          text-align: center;
        }

        .brand-mark {
          width: 58px;
          height: 58px;
          border: 1px solid #b99a65;
          color: #d2b477;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          font-family: Georgia, serif;
          font-size: 31px;
          border-radius: 50%;
        }

        .brand-name {
          font-family: Georgia, serif;
          color: #d5b77e;
          font-size: 23px;
          letter-spacing: 4px;
          font-weight: 600;
        }

        .gold-line {
          width: 48px;
          height: 1px;
          background: #b99a65;
          margin: 21px auto;
        }

        .eyebrow {
          color: #a99572;
          font-size: 10px;
          letter-spacing: 3px;
          margin-bottom: 18px;
        }

        h1 {
          font-family: Georgia, serif;
          font-weight: 400;
          font-size: clamp(32px, 7vw, 43px);
          line-height: 1.2;
          margin: 0;
          color: #f4f0e8;
        }

        h1 span {
          color: #c9a66b;
        }

        .description {
          color: #99948a;
          font-size: 14px;
          line-height: 1.8;
          max-width: 350px;
          margin: 18px auto 32px;
        }

        .links-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .link-card {
          min-height: 76px;
          display: flex;
          align-items: center;
          text-align: left;
          gap: 15px;
          padding: 14px 17px;
          background: #111111;
          border: 1px solid #29251e;
          border-radius: 10px;
          text-decoration: none;
          color: #f5f2ec;
          transition: all 0.25s ease;
        }

        .link-card:hover {
          border-color: #b99a65;
          background: #17140f;
          transform: translateY(-2px);
        }

        .icon-box {
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #50432e;
          border-radius: 8px;
          color: #d1ae72;
        }

        .link-text {
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex: 1;
          min-width: 0;
        }

        .link-title {
          font-size: 14px;
          font-weight: 600;
          color: #eee8dc;
        }

        .link-subtitle {
          font-size: 12px;
          color: #928c80;
          overflow-wrap: anywhere;
        }

        .arrow {
          color: #c5a46d;
          font-size: 20px;
          padding-left: 5px;
        }

        .footer {
          margin-top: 42px;
        }

        .footer-line {
          width: 55px;
          height: 1px;
          background: #57462d;
          margin: 0 auto 18px;
        }

        .footer p {
          font-size: 9px;
          color: #aa9067;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }

        .footer span {
          font-size: 10px;
          color: #625e56;
          letter-spacing: 1px;
        }

        @media (max-width: 480px) {
          .links-page {
            padding: 42px 18px 30px;
            align-items: flex-start;
          }

          .content {
            max-width: 100%;
          }

          .brand-name {
            font-size: 21px;
            letter-spacing: 3px;
          }

          .link-card {
            min-height: 72px;
          }
        }
      `}</style>
    </main>
  );
}