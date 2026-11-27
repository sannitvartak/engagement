import { createRootRoute } from "@tanstack/react-router";
import { useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, CalendarPlus, MapPin } from "lucide-react";
import { Button } from "./components/ui/button";
import { invitation } from "./lib/invitation";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: "Sannit & Saloni | We're getting engaged!" },
      { name: "description", content: "Celebrate Sannit & Saloni's engagement on Sunday, 20 December 2026 at Rohidas Garden Hall, Kardal, Saphale. Bring the pastels!" },
      { property: "og:title", content: "Sannit & Saloni | We're getting engaged!" },
      { property: "og:description", content: "One date. Two people. A whole lot of celebration. 20.12.2026 at Rohidas Garden Hall, Kardal, Saphale." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [slide, setSlide] = useState(0);
  const [noPosition, setNoPosition] = useState({ left: 0, top: 0 });
  const escapeArea = useRef<HTMLDivElement>(null);
  const escapeButton = useRef<HTMLButtonElement>(null);
  const escape = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const area = escapeArea.current;
    const button = escapeButton.current;
    if (!area || !button) return;
    const bounds = area.getBoundingClientRect();
    const maxX = Math.max(0, area.clientWidth - button.offsetWidth);
    const maxY = Math.max(0, area.clientHeight - button.offsetHeight);
    const positions = [
      { left: 0, top: 0 }, { left: maxX, top: 0 },
      { left: 0, top: maxY }, { left: maxX, top: maxY },
    ];
    const distance = (pos: typeof noPosition) =>
      Math.hypot(pos.left + button.offsetWidth / 2 - (event.clientX - bounds.left),
        pos.top + button.offsetHeight / 2 - (event.clientY - bounds.top));
    positions.sort((a, b) => distance(b) - distance(a));
    const next = positions[0];
    if (next) setNoPosition(next);
  };
  const go = (next: number) => {
    setSlide(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleCalendarCheck = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <main className="invite-card">
      <div className="invite-content">
        <section key={slide} className="appear invitation-slide">
          {slide === 0 && <>
            <div className="heart">♡</div>
            <h1>Well, it's official! 💍</h1>
            <div className="photo-frame">
              <img src="/cover-image.jpg" alt="Sannit and Saloni photo placeholder" />
            </div>
            <p>We're making it official, and we'd really love to have you there when we do.</p>
            <p>Because what's a big life update without our favourite people around?</p>
            <div className="welcome-actions">
              <Button className="invite-btn invite-btn-primary" onClick={() => go(1)}>YES, COUNT ME IN ❤️</Button>
              <div ref={escapeArea} className="escape-area">
                <Button ref={escapeButton} variant="outline" className="invite-btn invite-btn-outline calendar-maybe"
                  style={{ left: noPosition.left, top: noPosition.top }}
                  onPointerEnter={escape} onPointerDown={escape}
                  onClick={handleCalendarCheck}>
                  NAHH, LET ME CHECK MY CALENDAR 🙃
                </Button>
              </div>
            </div>
            <p className="footer-note">P.S. We've already made up our minds. Your answer is just a formality.</p>
          </>}
          {slide === 1 && <>
            {/* <div className="heart">🌸</div>*/}
            <h1>What colour are you wearing?</h1>
            <p>We've got the gold and black covered.</p>
            <h2 className="text-primary">You bring the pastels.</h2>
            <div className="pastel-palette" aria-label="Pastel shades">
              {[
                ["blush", "Blush"], ["powder-blue", "Powder blue"],
                ["sage", "Sage"], ["lavender", "Lavender"],
                ["butter-yellow", "Butter yellow"], ["peach", "Peach"],
                ["soft-green", "Soft green"], ["dusty-rose", "Dusty rose"],
              ].map(([colour, name]) => <div key={colour} className="pastel-colour"><span className={`swatch-${colour}`} /><span className="pastel-label">{name}</span></div>)}
            </div>
            <p>P.S. We're not saying you'll be judged.<br />We're saying there will be photographs.</p>
          </>}
          {slide === 2 && <>
            <h2>Okay, here's the plan 🥂</h2>
            <p>One date. Two people. A whole lot of celebration.</p>
            <div className="celebration-details">
              <div className="date-details">
                <time dateTime={invitation.date} className="engagement-date">20.12.2026</time>
                <div className="eyebrow">Sunday</div>
                <h2 className="couple-names text-primary">Sannit & Saloni</h2>
                <h4>Are getting engaged!</h4>
              </div>
              <div className="venue-details">
                <div className="eyebrow">📍 Venue</div>
                <h2>{invitation.venue}</h2>
                <p>{invitation.locality}</p>
                <div className="venue-actions">
                  <Button asChild variant="outline" className="invite-btn invite-btn-outline"><a href={invitation.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin /> View on Map</a></Button>
                  <Button asChild className="invite-btn invite-btn-primary"><a href={invitation.calendarUrl} target="_blank" rel="noopener noreferrer"><CalendarPlus /> Add to Calendar</a></Button>
                </div>
              </div>
            </div>
            <h3 className="text-primary">Pyaar dosti hai. Aur dosti mein attendance compulsory hai.❤️</h3>
            <p><strong></strong></p>
            <p>Clear your calendars.<br />We've got a forever to celebrate.</p>
            <p className="footer-note">P.S. Kuch kuch plans cancel karne padenge.<strong> Yeh wala nahi.</strong></p>
          </>}
        </section>
        {slide > 0 && <nav className="slide-navigation" aria-label="Invitation slides">
          <Button variant="ghost" size="icon" onClick={() => go(slide - 1)} aria-label="Previous slide" title="Previous slide"><ArrowLeft /></Button>
          <div className="slide-dots" aria-hidden="true">{[0, 1, 2].map((n) => <span key={n} className={n === slide ? "active" : ""} />)}</div>
          {slide < 2 ? <Button variant="ghost" size="icon" onClick={() => go(slide + 1)} aria-label="Next slide" title="Next slide"><ArrowRight /></Button> : <span className="size-9" />}
        </nav>}
      </div>
    </main>
  );
}
