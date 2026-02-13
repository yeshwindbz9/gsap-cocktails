"use-client";
import React from "react";
import { sliderLists } from "../../constants";
import { useState } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Menu = () => {
  const contentRef = useRef();
  const [currentIdx, setCurrentIdx] = useState(0);
  useGSAP(() => {
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(
      ".details h2",
      { opacity: 0, yPercent: 100 },
      { opacity: 1, yPercent: 0, duration: 1, ease: "power1.inOut" },
    );
    gsap.fromTo(
      ".details p",
      { opacity: 0, yPercent: 100 },
      { opacity: 1, yPercent: 0, duration: 1, ease: "power1.inOut" },
    );
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 },
      { opacity: 1, xPercent: 0, duration: 1, ease: "power1.inOut" },
    );
  }, [currentIdx]);

  const totalCocktails = sliderLists.length;
  const goToSlide = (idx) => {
    const newIdx = (idx + totalCocktails) % totalCocktails;
    setCurrentIdx(newIdx);
  };

  const getCocktailAt = (indexOffset) => {
    return sliderLists[
      (currentIdx + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);
  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, idx) => {
          const isActive = idx === currentIdx;
          return (
            <button
              className={
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }
              key={cocktail.id}
              onClick={() => goToSlide(idx)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIdx - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>

          <button
            className="text-left"
            onClick={() => goToSlide(currentIdx + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="cocktail">
          <img
            src={currentCocktail.image}
            alt="cocktail-img"
            className="object-contain"
          />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Explore</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
