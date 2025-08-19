import "./globals.css";
import { AuthProvider } from '../contexts/AuthContext';
import Header from '../components/Header';
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
      <body>
        <AuthProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flexGrow: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
