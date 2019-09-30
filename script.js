//Letter animation
let letters = document.querySelectorAll(".home-section .letter");
let letterWrappers = document.querySelectorAll(".home-section .letter-wrapper");
let lettersRange = letters.length;
let specimenLetters = document.querySelectorAll(".info-section .letter");
let specimenLetterWrappers = document.querySelectorAll(
  ".info-section .letter-wrapper"
);
let specimenLettersRange = specimenLetters.length;
function createRowAnim(letterWrapper, letter) {
  let rowIndex = 1;
  let evenRows = [];
  let oddRows = [];

  let isHovering = false;
  function allComplete() {
    if (isHovering) {
      let checkHovering = setInterval(function() {
        if (!isHovering) {
          revertLetterAnimation();
          clearInterval(checkHovering);
        }
      }, 500);
    } else {
      revertLetterAnimation();
    }
  }
  function revertLetterAnimation() {
    TweenMax.to(letter, 0.5, {
      xPercent: -5
    });
    TweenMax.staggerTo(
      evenRows,
      0.3,
      {
        x: 0,
        y: 0,
        ease: Back.easeOut
      },
      0.04
    );
    TweenMax.staggerTo(
      oddRows,
      0.2,
      {
        x: 0,
        y: 0,
        ease: Circ.easeOut
      },
      0.03
    );
  }
  for (var i = 0; i < letter.childNodes.length; i++) {
    if (letter.childNodes[i].className == "letter-row") {
      if (rowIndex % 2 == 0) {
        evenRows.push(letter.childNodes[i]);
      } else {
        oddRows.push(letter.childNodes[i]);
      }
      rowIndex++;
    }
    let homeY =
      (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) *
        0.0798 *
        2.5) /
      7;
    let specimenY =
      (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) *
        0.0798 *
        1.2) /
      7;
    TweenMax.set(letter, {
      xPercent: -5,
      rotation: -45
    });
    letterWrapper.addEventListener("mouseenter", function() {
      TweenMax.to(letter, 0.4, {
        xPercent: letter.id == "A" ? -12 : letter.id == "I" ? -16 : -10,
        ease: Circ.easeOut
      });
      TweenMax.staggerTo(
        evenRows,
        1.5,
        {
          x: document.body.classList.contains("info-page") ? -20 : -50,
          y: 0,
          delay: 0.06,
          ease: Elastic.easeOut.config(1, 0.5),
          force3D: true
        },
        0.04
      );
      TweenMax.staggerTo(
        oddRows,
        0.4,
        {
          x: document.body.classList.contains("info-page") ? specimenY : homeY,
          y: document.body.classList.contains("info-page") ? specimenY : homeY,
          delay: 0.04,
          ease: Back.easeOut
        },
        0.03
      );
      isHovering = true;
      setTimeout(function() {
        allComplete();
      }, 300);
    });
    letterWrapper.addEventListener("mouseleave", function() {
      isHovering = false;
    });
  }
}

function createRandomWiggle(letter) {
  let rows = [];
  for (var i = 0; i < letter.childNodes.length; i++) {
    if (letter.childNodes[i].className == "letter-row") {
      rows.push(letter.childNodes[i]);
    }
  }
  let tl = new TimelineMax();
  tl.staggerTo(
    rows,
    1.3,
    {
      x: -30,
      css: {
        scale: document.body.classList.contains("info-page") ? 0.8 : 0.7
      },
      ease: Elastic.easeOut.config(1, 0.5),
      cycle: {
        delay: function(index) {
          return index * 0.06;
        }
      }
    },
    0
  ).staggerTo(
    rows,
    1.2,
    {
      x: 0,
      css: {
        scale: 1
      },
      ease: Elastic.easeOut.config(1, 0.5)
    },
    0.1,
    "-=1.3"
  );
}

function bgFunctionController() {
  if (document.body.classList.contains("info-page")) {
    minimizeBg();
    clearInterval(specimenWiggleInterval);
  } else {
    expandBg();
    for (var i = 0; i < specimenLetters.length; i++) {
      createRowAnim(specimenLetterWrappers[i], specimenLetters[i]);
    }
    let specimenWiggleInterval = setInterval(function() {
      if (
        document.hasFocus() &&
        document.body.classList.contains("info-page")
      ) {
        createRandomWiggle(
          specimenLetters[Math.floor(Math.random() * specimenLettersRange)]
        );
      }
    }, 5000);
  }
}
function expandBg() {
  TweenMax.set(document.querySelector(".info-section"), {
    css: {
      opacity: 1
    }
  });
  let bg = document.querySelector(".info-bg");
  TweenMax.set(bg, {
    css: {
      opacity: 1
    }
  });
  TweenMax.to(document.querySelector(".info-button__border"), 0.7, {
    css: {
      strokeDashoffset: 0
    },
    ease: Circ.easeOut,
    delay: 0.2
  });
  setTimeout(function() {
    document.querySelector(".info-button span").innerHTML = "Close";
  }, 100);
  TweenMax.to(bg, 0.4, {
    css: {
      scale: 23
    },
    force3D: true,
    ease: Circ.easeIn,
    onComplete: function() {
      TweenMax.from(document.querySelector(".description"), 0.4, {
        css: {
          opacity: 0
        }
      });
      TweenMax.from(document.querySelector(".shape-toggle-wrapper"), 0.4, {
        css: {
          opacity: 0
        },
        delay: 0.1
      });
      document.body.classList.add("info-page");
      TweenMax.staggerFrom(
        Array.prototype.slice.call(
          document.querySelectorAll(".specimen-wrapper__inner .letter-wrapper"),
          0,
          17
        ),
        0.2,
        {
          css: {
            opacity: 0,
            y: -20
          },
          cycle: {
            delay: function(index) {
              return index * 0.06;
            }
          },
          delay: 0.4
        },
        0
      );
    }
  });
}

function minimizeBg() {
  setTimeout(function() {
    document.querySelector(".info-button span").innerHTML = "Info";
  }, 100);
  TweenMax.to(document.querySelector(".shape-toggle-wrapper"), 0.2, {
    css: {
      opacity: 0
    }
  });
  let minimizeTl = new TimelineMax();
  minimizeTl
    .to(document.querySelector(".info-button__border"), 0.4, {
      css: {
        strokeDashoffset: 308
      },
      ease: Circ.easeOut
    })
    .to(
      document.querySelector(".info-section"),
      0.2,
      {
        css: {
          opacity: 0
        },
        onComplete: function() {
          document.body.classList.remove("info-page");
          TweenMax.to(document.querySelector(".shape-toggle-wrapper"), 0.2, {
            css: {
              opacity: 1
            }
          });
        }
      },
      "-=0.3"
    )
    .to(
      document.querySelector(".info-bg"),
      0.35,
      {
        css: {
          scale: 1
        },
        force3D: true,
        ease: Circ.easeOut
      },
      "-=0.1"
    );
}

function toggleShape(shape) {
  let body = document.body;
  if (shape == "sharp") {
    if (body.classList.contains("soft-mode")) {
      body.classList.remove("soft-mode");
    }
    body.classList.add("sharp-mode");
  } else {
    if (body.classList.contains("sharp-mode")) {
      body.classList.remove("sharp-mode");
    }
    body.classList.add("soft-mode");
  }
}
function onReady() {
  for (var i = 0; i < letters.length; i++) {
    createRowAnim(letterWrappers[i], letters[i]);
  }
  setInterval(function() {
    if (document.hasFocus() && !document.body.classList.contains("info-page")) {
      createRandomWiggle(letters[Math.floor(Math.random() * lettersRange)]);
    }
  }, 7000);
  TweenMax.to("html", 2, { "--accent": "#ff3500", yoyo: true, repeat: -1 });
  document
    .querySelector(".info-button")
    .addEventListener("click", bgFunctionController);
  document.querySelector(".toggle-sharp").addEventListener("click", function() {
    toggleShape("sharp");
  });
  document.querySelector(".toggle-round").addEventListener("click", function() {
    toggleShape("round");
  });
}

if (document.readyState !== "loading") {
  setTimeout(onReady, 0);
} else {
  document.addEventListener("DOMContentLoaded", onReady);
}
