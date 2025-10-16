export default function Navbar() {
  return (
    <header className="navbar fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-4 z-50 bg-black/40 backdrop-blur-md text-white">
      <div className="logo font-bold text-lg">SIDimas.</div>
      <nav>
        <ul className="flex gap-6">
          <li><a href="/">Beranda</a></li>
          <li><a href="/wisata">Wisata</a></li>
          <li><a href="/kuliner">Kuliner</a></li>
          <li><a href="/budaya">Budaya</a></li>
          <li><a href="#">Kontribusi</a></li>
        </ul>
      </nav>
      <div className="nav-actions flex gap-3">
        <a href="/admin/login" className="login">Log in</a>
        <a href="#" className="signup bg-lime-600 px-4 py-2 rounded-lg font-semibold hover:bg-lime-700">Sign Up</a>
      </div>
    </header>
  )
}
