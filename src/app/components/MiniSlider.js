"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
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
        <SwiperSlide><Image src="/IMG_6806 1.png" alt="slide 1" width={400} height={300} style={{ width: '100%', height: 'auto' }} /></SwiperSlide>
        <SwiperSlide><Image src="/IMG_5702 2.png" alt="slide 2" width={400} height={300} style={{ width: '100%', height: 'auto' }} /></SwiperSlide>
        <SwiperSlide><Image src="/IMG_7236 3.png" alt="slide 3" width={400} height={300} style={{ width: '100%', height: 'auto' }} /></SwiperSlide>
      </Swiper>
    </div>
  );
}
