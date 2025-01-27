import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Timer from "../Timer";

const TRAIT_TYPES = {
  virtue: {
    items: ["Kindness", "Patience", "Integrity", "Generosity"],
    textcolor: "#FF2684",
    bgcolor: "#FFD3E6",
  },
  vice: {
    items: ["Procrastination", "Impulsiveness", "Jealousy", "Stubbornness"],
    textcolor: "#9747FF",
    bgcolor: "#F3EAFF",
  },
  tidbit: {
    items: [
      "Can solve a Rubik's cube in under a minute",
      "Has visited 15 countries",
      "Plays three musical instruments",
      "Loves baking sourdough bread",
    ],
    textcolor: "#209AFF",
    bgcolor: "#E0F1FF",
  },
  trade: {
    items: ["Teacher", "Carpenter", "Designer", "Chef"],
    textcolor: "#1BC16F",
    bgcolor: "#DFFFF0",
  },
};

const BuildYourBoy = () => {
  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundImage: "url('/mobile-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "top",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "white",
      fontFamily: "Xanh Mono, sans-serif",
      overflow: "hidden",
    },
    timerWrapper: {
        position: "absolute",
        top: "3%",
        left: "50%",
        transform: "translateX(-50%)",
    },
    title: {
      fontSize: "0.9rem",
      margin: "1vh",
      fontFamily: "Syne Mono, sans-serif",

    },
    titleMain: {
      fontSize: "1.2rem",
      marginTop: "1vh",
      marginBottom: "2vh",
      position: "absolute",
      top: "10%",
    },
    carouselWrapper: {
      width: "100%",
      marginBottom: "1vh",
      position: "relative",
    },
    rectangle: (textcolor, bgcolor) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "6vh",
      borderRadius: "8px",
      width: "75%",
      margin: "0 auto",
      color: textcolor,
      backgroundColor: bgcolor,
      fontFamily: "Syne Mono, sans-serif",
    }),
    smallImage: {
      width: "75%",
      height: "25vh",
      objectPosition: "center",
      borderRadius: "8px",
      marginTop: "17vh",
      marginBottom: "1vh",
      objectFit: "cover",
      objectPosition: "center",
    },
    navButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "transparent",
      fontFamily: "Syne Mono, sans-serif",
      color: "white",
      border: "none",
      width: "30px",
      height: "30px",
      fontSize: "1.5rem",
      cursor: "pointer",
      zIndex: 10,
    },
    prevButton: {
      left: "5px",
    },
    nextButton: {
      right: "5px",
    },
    buttonImage: {
      marginTop: "8vh",
    },
    submitButton: {
      width: "90%",
      padding: "10px",
      backgroundColor: "#FFA6CB",
      height: "5vh",
      color: "black",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontFamily: "Syne Mono, sans-serif",
      fontSize: "1rem",
      position: "absolute",
      bottom: "5vh",
    },
  };

  const swiperRefs = {
    images: useRef(null),
    virtue: useRef(null),
    vice: useRef(null),
    tidbit: useRef(null),
    trade: useRef(null),
  };

  const renderCarousel = (items, ref, textcolor, bgcolor) => {
    const isImage = items[0].includes("/");
    return (
    <div style={styles.carouselWrapper}>
      <Swiper
        spaceBetween={5} // Minimized space between items
        slidesPerView={1} // Full-width slides
        loop={true}
        onSwiper={(swiper) => (ref.current = swiper)}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {!item.includes("/") ? (
              <div style={styles.rectangle(textcolor, bgcolor)}>{item}</div>
            ) : (
              <img src={item} alt={`Slide ${index + 1}`} style={styles.smallImage} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        style={{ ...styles.navButton, ...styles.prevButton, ...(isImage ? styles.buttonImage : {}) }}
        onClick={() => ref.current?.slidePrev()}
      >
        &lt;
      </button>
      <button
        style={{ ...styles.navButton, ...styles.nextButton,...(isImage ? styles.buttonImage : {}) }}
        onClick={() => ref.current?.slideNext()}
      >
        &gt;
      </button>
    </div>
  )};

  return (
    <div style={styles.container}>
        <div style={styles.timerWrapper}>
            <Timer sizeVH="4" />
        </div>
      <div style={styles.titleMain}>Build Your Boy</div>

      {/* Image Carousel */}
      {renderCarousel(
        ["/test-boys/1.png", "/test-boys/2.png"],
        swiperRefs.images,
        "#000" // Default for images
      )}

      {/* Virtue Carousel */}
      <div style={styles.title}>Virtue</div>
      {renderCarousel(
        TRAIT_TYPES.virtue.items,
        swiperRefs.virtue,
        TRAIT_TYPES.virtue.textcolor,
        TRAIT_TYPES.virtue.bgcolor
      )}

      {/* Vice Carousel */}
      <div style={styles.title}>Vice</div>
      {renderCarousel(
        TRAIT_TYPES.vice.items,
        swiperRefs.vice,
        TRAIT_TYPES.vice.textcolor,
        TRAIT_TYPES.vice.bgcolor
      )}

      {/* Tidbit Carousel */}
      <div style={styles.title}>Tidbit</div>
      {renderCarousel(
        TRAIT_TYPES.tidbit.items,
        swiperRefs.tidbit,
        TRAIT_TYPES.tidbit.textcolor,
        TRAIT_TYPES.tidbit.bgcolor
      )}

      {/* Trade Carousel */}
      <div style={styles.title}>Trade</div>
      {renderCarousel(
        TRAIT_TYPES.trade.items,
        swiperRefs.trade,
        TRAIT_TYPES.trade.textcolor,
        TRAIT_TYPES.trade.bgcolor
      )}

      {/* Submit Button */}
      <button style={styles.submitButton}>Submit</button>
    </div>
  );
};

export default BuildYourBoy;
