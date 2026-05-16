// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20">
      <div className="text-center village-card p-8">
        <div className="text-6xl mb-4">🏫</div>
        <h1 className="mb-4 text-4xl font-bold font-fredoka text-primary">ecoQuest Admin</h1>
        <p className="text-xl text-muted-foreground mb-4">
          This is the admin view. Students should access the main app at the root path.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary-light px-6 py-3 text-white font-medium hover:from-primary-dark hover:to-primary transition-all duration-300"
        >
          Go to Student App →
        </a>
      </div>
    </div>
  );
};

export default Index;
