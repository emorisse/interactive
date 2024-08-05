import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUpRight, Brain, FileText, TrendingUp, Heart, BookOpen, LucideProps } from 'lucide-react';

const MadeToStickGame = () => {
  const [selectedPrinciple, setSelectedPrinciple] = useState<{ name: string; icon: React.ComponentType<LucideProps>; content: string } | null>(null);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [shuffledContent, setShuffledContent] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const principles = useMemo(() => [
    { name: "Headline", icon: ArrowUpRight, content: "Transforms complex AI into business-driving solutions" },
    { name: "Unexpected", icon: Brain, content: "Turned AI experiment into 12+ internal tools" },
    { name: "Concrete", icon: FileText, content: "Launched Red Hat's first AI product for infrastructure code" },
    { name: "Credible", icon: TrendingUp, content: "20+ years turning cutting-edge tech into market leaders" },
    { name: "Passionate", icon: Heart, content: "Making AI accessible and valuable" },
    { name: "Results", icon: BookOpen, content: "42% increase in 'cloud tco' search on Google following report" }
  ], []);

  useEffect(() => {
    setShuffledContent(shuffleArray(principles.map(p => p.content)));
  }, [principles]);

  const handlePrincipleClick = (principle: React.SetStateAction<{ name: string; icon: React.ComponentType<LucideProps>; content: string; } | null>) => {
    setSelectedPrinciple(principle);
  };

  const handleContentClick = (content: string) => {
    setSelectedContent(content);
    if (selectedPrinciple && content) {
      const foundPrinciple = principles.find(p => p.name === selectedPrinciple.name);
      if (foundPrinciple && foundPrinciple.content === content) {
        setMatched([...matched, selectedPrinciple.name]);
        setScore(score + 1);
        if (matched.length + 1 === principles.length) {
          setGameOver(true);
        }
      } else {
        setScore(Math.max(0, score - 1));
      }
      setSelectedPrinciple(null);
      setSelectedContent(null);
    }
  };

  function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const resetGame = () => {
    setSelectedPrinciple(null);
    setSelectedContent(null);
    setMatched([]);
    setShuffledContent(shuffleArray(principles.map(p => p.content)));
    setScore(0);
    setGameOver(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="bg-gray-100 p-8 rounded-xl max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Erich Morisse's moderately accurate, and completely AI Generated Resume Game&trade;</h2>
        <p className="text-center mb-4">Match Erich's principles with the corresponding outcome. Score: {score}</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>
            <h3 className="font-bold mb-2">Principles</h3>
            {principles.map((principle) => (
              <button
                key={principle.name}
                style={{
                  minHeight: '50px',
                  backgroundColor: matched.includes(principle.name)
                    ? '#bbf7d0' // bg-green-200 equivalent
                    : selectedPrinciple?.name === principle.name
                    ? '#bfdbfe' // bg-blue-200 equivalent
                    : 'white', // bg-white equivalent
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  borderRadius: '4px',
                  width: '100%',
                }}
                onClick={() => handlePrincipleClick(principle)}
              >
                <principle.icon className="w-6 h-6 mr-2" />
                {principle.name}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 3, gap: '8px' }}>
            <h3 className="font-bold mb-2">Outcomes</h3>
            {shuffledContent.map((content, index) => (
              <button
                key={index}
                style={{ 
                  minHeight: '50px',
                  backgroundColor: matched.includes(principles.find(p => p.content === content)?.name ?? "")
                    ? '#d0d0d0' // bg-green-200 equivalent
                    : selectedContent === content
                    ? '#bfdbfe' // bg-blue-200 equivalent
                    : 'white', // bg-white equivalent
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  width: '100%',
                  borderRadius: '4px',
                  textAlign: 'left',
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                }} 
                onClick={() => handleContentClick(content)}
                disabled={matched.includes(principles.find(p => p.content === content)?.name ?? '')}
              >
                {content}
              </button>
            ))}
          </div>
        </div>
        {gameOver && (
          <div className="text-center mt-4">
            <h3 className="text-xl font-bold mb-2">Congratulations! You've matched all principles!</h3>
            <button onClick={resetGame} className="bg-blue-500 text-white px-4 py-2 rounded">
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MadeToStickGame;