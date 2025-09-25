import './globals.css'

export const metadata = {
  title: 'SIDimas',
  description: 'Wisata Banyumas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
