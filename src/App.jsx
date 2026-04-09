import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainArea from './components/MainArea';
import RightSidebar from './components/RightSidebar';
import Onboarding from './components/Onboarding';
import IndustrySignals from './components/IndustrySignals';
import MarketPulse from './components/MarketPulse';
import Tasks, { INITIAL_TASKS } from './components/Tasks';
import Profile from './components/Profile';
import Following from './components/Following';
import LearningHub from './components/LearningHub';
import Notifications from './components/Notifications';

function App() {
  const [hasOnboarded, setHasOnboarded] = useState(() => !!localStorage.getItem('jarvis_onboarded'));
  const [currentPage, setCurrentPage] = useState('command-center');
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const addTask = (task) => {
    setTasks(prev => {
      const alreadyExists = prev.some(t => t.title === task.title);
      return alreadyExists ? prev : [task, ...prev];
    });
  };

  if (!hasOnboarded) {
    return <Onboarding onComplete={() => { localStorage.setItem('jarvis_onboarded', '1'); setHasOnboarded(true); }} />;
  }

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      {currentPage === 'industry-signals' ? (
        <IndustrySignals addTask={addTask} />
      ) : currentPage === 'market-pulse' ? (
        <MarketPulse />
      ) : currentPage === 'tasks' ? (
        <Tasks tasks={tasks} setTasks={setTasks} />
      ) : currentPage === 'following' ? (
        <Following addTask={addTask} />
      ) : currentPage === 'learning' ? (
        <LearningHub />
      ) : currentPage === 'notifications' ? (
        <Notifications onNavigate={setCurrentPage} />
      ) : currentPage === 'profile' ? (
        <Profile />
      ) : (
        <MainArea onNavigate={setCurrentPage} />
      )}
      {currentPage === 'command-center' && <RightSidebar onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;
