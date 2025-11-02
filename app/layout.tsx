export const metadata = {
  title: 'Generador de Alias de Email',
  description: 'Genera alias únicos y seguros para tu email',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
