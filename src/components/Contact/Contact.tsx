import { lazy, Suspense, useEffect, useState } from "react";

import type { Language } from "../../types";
import AnimatedPage from "../AnimatedPage";
import "./contact.css";

const ContactScene = lazy(() => import("./ContactScene"));

interface ContactItem {
  href: string;
  icon: string;
  className: string;
  text: string;
  external?: boolean;
}

interface ContactProps {
  language: Language;
}

const contacts: readonly ContactItem[] = [
  {
    href: "tel:+359894696679",
    icon: "/assets/phone.svg",
    className: "phone",
    text: "+359 894 696679",
  },
  {
    href: "mailto:globalarh@abv.bg",
    icon: "/assets/envelope.svg",
    className: "email",
    text: "globalarh@abv.bg",
  },
  {
    href: "https://www.linkedin.com/in/diana-radeva/",
    icon: "/assets/linkedin.svg",
    className: "linked",
    text: "@diana-radeva",
    external: true,
  },
];

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function Contact({ language }: ContactProps) {
  const mobile = useMediaQuery("(max-width: 1280px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [visibleContacts, setVisibleContacts] = useState(
    reduceMotion ? contacts.length : 0,
  );

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    const timers = contacts.map((_, index) =>
      window.setTimeout(() => setVisibleContacts(index + 1), 600 * (index + 1)),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [reduceMotion]);

  return (
    <AnimatedPage>
      <main aria-label={language ? "Contact details" : "Контакти"}>
        {!mobile && (
          <Suspense fallback={null}>
            <ContactScene />
          </Suspense>
        )}
        <div className="icons">
          {contacts.map((contact, index) => (
            <div
              className={`icon-cont${index < visibleContacts ? " show" : ""}`}
              key={contact.href}
              style={
                reduceMotion ? { opacity: 1, transition: "none" } : undefined
              }
            >
              <a
                className={index < visibleContacts ? "show" : undefined}
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noreferrer noopener" : undefined}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  opacity: reduceMotion ? 1 : undefined,
                  transition: reduceMotion ? "none" : undefined,
                }}
              >
                <img
                  src={contact.icon}
                  alt=""
                  aria-hidden="true"
                  width="25"
                  height="25"
                  style={{
                    position: "relative",
                    left: 0,
                    width: 25,
                    height: 25,
                    filter: mobile ? "invert(50%)" : undefined,
                  }}
                />
                <div className={contact.className}>{contact.text}</div>
              </a>
            </div>
          ))}
        </div>
      </main>
    </AnimatedPage>
  );
}

export default Contact;
