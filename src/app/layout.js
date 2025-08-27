import "./globals.css";
import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'StoryChain - Paylaşımlı Hikaye Yazma Platformu',
  description: 'İlkokul öğrencileri için paylaşımlı hikaye yazma platformu',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
