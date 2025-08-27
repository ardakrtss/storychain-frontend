import "./globals.css";
import { AuthProvider } from '../contexts/AuthContext';

export const metadata = {
  title: 'StoryChain - Paylaşımlı Hikaye Yazma Platformu',
  description: 'İlkokul öğrencileri için paylaşımlı hikaye yazma platformu',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="tr">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
