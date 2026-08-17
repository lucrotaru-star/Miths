import { useEffect, useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ContactsPage from '@/pages/ContactsPage';

type Page = 'home' | 'contacts';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'contacts' || hash === 'home') setPage(hash);
  }, []);

  const navigate = (next: Page) => {
    setPage(next);
    window.location.hash = next;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedBackground />
      <Header current={page} onNavigate={navigate} />

      <main className="flex-1">
        {page === 'home' ? <HomePage /> : <ContactsPage />}
      </main>

      <Footer />
    </div>
  );
}
