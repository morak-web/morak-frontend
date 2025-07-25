import Header from '../Header/Header';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
    </>
  );
}
