import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainArea from './components/MainArea';
import RightSidebar from './components/RightSidebar';
import Onboarding from './components/Onboarding';

function App() {
  const [hasOnboarded, setHasOnboarded] = useState(false);

  if (!hasOnboarded) {
    return <Onboarding onComplete={() => setHasOnboarded(true)} />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <MainArea />
      <RightSidebar />
    </div>
  );
}

export default App;
