

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-dark text-title flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-h2b/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-10 w-full max-w-md mx-auto">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
};

export default AuthLayout;
