"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function MiniSlider() {
  return (
    <div className="mini-slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide><img src="/IMG_6806 1.png" alt="slide 1" /></SwiperSlide>
        <SwiperSlide><img src="/IMG_5702 2.png" alt="slide 2" /></SwiperSlide>
        <SwiperSlide><img src="/IMG_7236 3.png" alt="slide 3" /></SwiperSlide>
      </Swiper>
    </div>
  );
}
