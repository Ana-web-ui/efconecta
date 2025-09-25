// app/layout.js
import './globals.css'

export const metadata = {
  title: 'EFConecta',
  description: 'Sistema EFConecta',
}

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}