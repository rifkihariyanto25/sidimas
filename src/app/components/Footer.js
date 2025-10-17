import Image from "next/image"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          {/* Hero Section dengan Animasi */}
          <div className="footer-hero">
            <div className="footer-character">
              <Image 
                src="/Group 86.png" 
                alt="Banyumas Character" 
                width={300} 
                height={400}
                className="character-img"
              />
            </div>
            <div className="footer-hero-text">
              <h2>
                <span className="text-lime-400">Ayo Kunjungi</span><br />
                DAN JELAJAHI BANYUMAS
              </h2>
              <p>Be an explorer and experience the beauty of diversity in Banyumas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links - Full Width Section */}
      <div className="footer-links">
        <div className="footer-links-container">
          {/* About Sidimas */}
          <div className="footer-col">
            <h3>Sidimas</h3>
            <p>
              SIDIMAS hadir sebagai solusi inovatif untuk menjawab kebutuhan masyarakat Banyumas akan layanan informasi yang praktis, mudah diakses, dan mendukung terwujudnya informasi berbasis digital.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i>F</a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i>I</a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i>Y</a>
            </div>
          </div>

          {/* Navigasi */}
          <div className="footer-col">
            <h3>Navigasi</h3>
            <ul>
              <li><a href="/">Beranda</a></li>
              <li><a href="/wisata">Wisata</a></li>
              <li><a href="/kuliner">Kuliner</a></li>
              <li><a href="/budaya">Budaya</a></li>
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div className="footer-col">
            <h3>Hubungi Kami</h3>
            <ul>
              <li>
                <span>📍</span> Jl. Bojong Lengkong, Kabupaten Tegal, Jawa Tengah
              </li>
              <li>
                <span>📞</span> +6285222555212
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 Azkal Jaya Las. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
