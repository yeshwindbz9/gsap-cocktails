import React from "react";
import { openingHours, socials } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
const Contact = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#contact h2", { type: "words" });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
      },
      ease: "power1.inOut",
    });

    timeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .from("#contact h3, #contact p", {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .to("#f-right-leaf", {
        y: "-50",
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        "#f-left-leaf",
        {
          y: "50",
          duration: 1,
          ease: "power1.inOut",
        },
        "<",
      );
  }, []);
  return (
    <footer id="contact">
      <img
        src={`${import.meta.env.BASE_URL}/images/footer-right-leaf.png`}
        alt="leaf-right"
        id="f-right-leaf"
      />
      <img
        src={`${import.meta.env.BASE_URL}/images/footer-left-leaf.png`}
        alt="leaf-left"
        id="f-left-leaf"
      />
      <div className="content">
        <h2>Get in Touch</h2>
        <div>
          <h3>Visit our Store today</h3>
          <p>Suite 2, Brecon Court, Cwmbran NP44 3AB</p>
        </div>

        <div>
          <h3>Contact us</h3>
          <p>+44 7845965875</p>
          <p>yeshwin@dev.com</p>
        </div>

        <div>
          <h3>Open 365 days</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day}:{time.time}
            </p>
          ))}
        </div>

        <div>
          <h3>Socials</h3>
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                href={social.url}
                key={social.name}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
