"use client";

const Timeline = () => {
  const items = [
    {
      title: "Bahasa Banyumasan",
      description:
        "Bahasa Banyumasan itu unik banget dan punya ciri khas sendiri. Tau bahasanya bikin kita lebih dekat sama warga lokal.",
      image: "/images/bahasa.jpg",
    },
    {
      title: "Budaya & Tradisi",
      description:
        "Dari wayang kulit sampai upacara adat, Banyumas punya banyak kegiatan seru.",
      image: "/images/budaya.jpg",
    },
    {
      title: "Kuliner Banyumas",
      description:
        "Mendoan, getuk goreng, dan banyak makanan khas lain yang wajib dicoba!",
      image: "/images/kuliner.jpg",
    },
  ];

  return (
    <section className="relative w-full max-w-6xl mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-4">Alasan</h2>
      <p className="text-center text-gray-600 mb-12">
        Kenapa Kamu Harus Mengetahui Kekayaan Banyumas
      </p>

      <div className="relative grid grid-cols-3 gap-6">
        {/* Garis Tengah */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-green-600 transform -translate-x-1/2"></div>

        {items.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-3 items-center w-full col-span-3`}
          >
            {/* Card di kiri kalau genap, di kanan kalau ganjil */}
            {index % 2 === 0 ? (
              <>
                {/* Card */}
                <div className="p-6 bg-white rounded-xl shadow-md text-center">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {/* Spacer untuk garis tengah */}
                <div></div>
                {/* Gambar */}
                <div className="flex justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-60 h-40 object-cover rounded-xl shadow"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Gambar */}
                <div className="flex justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-60 h-40 object-cover rounded-xl shadow"
                  />
                </div>
                {/* Spacer untuk garis tengah */}
                <div></div>
                {/* Card */}
                <div className="p-6 bg-white rounded-xl shadow-md text-center">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
