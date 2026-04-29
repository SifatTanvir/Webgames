import React, { useState, useEffect } from 'react';
import { RefreshCw, Target, CheckCircle2 } from 'lucide-react';


export const TASK_ID_CCSSVisualEditor = 'cms-debug-applycss';
export const PASSWORD_CCSSVisualEditor = 'CSSNinja';

interface CSSProperty {
  name: string;
  value: string;
}

interface Challenge {
  id: string;
  goal: string;
  brokenElement: string;
  correctFix: CSSProperty;
  initialStyles: Record<string, string>;
  layoutType: 'flexbox' | 'grid' | 'positioning' | 'overflow';
}

const CHALLENGES: Challenge[] = [
  {
    id: 'center-button',
    goal: 'Center the button horizontally in its container',
    brokenElement: 'button',
    correctFix: { name: 'margin', value: '0 auto' },
    initialStyles: { margin: '0', display: 'block', width: '200px' },
    layoutType: 'flexbox'
  },
  {
    id: 'fix-overflow',
    goal: 'Fix the image that overflows its container',
    brokenElement: 'img',
    correctFix: { name: 'maxWidth', value: '100%' },
    initialStyles: { width: '150%', height: 'auto' },
    layoutType: 'overflow'
  },
  {
    id: 'align-text',
    goal: 'Vertically center the text in the card',
    brokenElement: 'text',
    correctFix: { name: 'alignItems', value: 'center' },
    initialStyles: { display: 'flex', alignItems: 'flex-start', height: '200px' },
    layoutType: 'flexbox'
  },
  {
    id: 'fix-spacing',
    goal: 'Add proper spacing between the list items',
    brokenElement: 'list',
    correctFix: { name: 'gap', value: '16px' },
    initialStyles: { display: 'flex', flexDirection: 'column', gap: '0px' },
    layoutType: 'flexbox'
  }
];

const THEMES = [
  { bg: 'bg-gradient-to-br from-blue-50 to-indigo-100', accent: 'border-blue-500' },
  { bg: 'bg-gradient-to-br from-green-50 to-emerald-100', accent: 'border-green-500' },
  { bg: 'bg-gradient-to-br from-purple-50 to-violet-100', accent: 'border-purple-500' },
  { bg: 'bg-gradient-to-br from-orange-50 to-red-100', accent: 'border-orange-500' }
];

const CSSVisualEditor : React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [currentStyles, setCurrentStyles] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [theme, setTheme] = useState(THEMES[0]);

  const randomizeChallenge = () => {
    const randomChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
    
    setCurrentChallenge(randomChallenge);
    setCurrentStyles(randomChallenge.initialStyles);
    setTheme(randomTheme);
    setIsCompleted(false);
  };

  useEffect(() => {
    randomizeChallenge();
  }, []);

  useEffect(() => {
    if (!currentChallenge) return;
    
    const { correctFix } = currentChallenge;
    const currentValue = currentStyles[correctFix.name];
    
    if (currentValue === correctFix.value) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  }, [currentStyles, currentChallenge]);

  const updateStyle = (property: string, value: string) => {
    setCurrentStyles(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const renderBrokenLayout = () => {
    if (!currentChallenge) return null;

    const containerClass = `${theme.bg} p-8 rounded-lg border-2 ${theme.accent} min-h-[300px] relative overflow-hidden`;

    switch (currentChallenge.brokenElement) {
      case 'button':
        return (
          <div className={containerClass}>
            <div className="bg-editor-preview p-6 rounded border-2 border-dashed border-muted">
              <button
                style={currentStyles}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium"
              >
                Center Me!
              </button>
            </div>
          </div>
        );
      
      case 'img':
        return (
          <div className={containerClass}>
            <div className="bg-editor-preview p-6 rounded border-2 border-dashed border-muted w-80">
              <div
                style={currentStyles}
                className="bg-gradient-to-r from-primary to-accent h-32 rounded"
              />
              <p className="text-editor-preview-foreground mt-2 text-sm">Image placeholder</p>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className={containerClass}>
            <div 
              className="bg-editor-preview p-6 rounded border-2 border-dashed border-muted"
              style={currentStyles}
            >
              <p className="text-editor-preview-foreground text-lg font-medium">
                This text should be vertically centered
              </p>
            </div>
          </div>
        );
      
      case 'list':
        return (
          <div className={containerClass}>
            <div 
              className="bg-editor-preview p-6 rounded border-2 border-dashed border-muted"
              style={currentStyles}
            >
              <div className="bg-muted p-3 rounded text-muted-foreground">Item 1</div>
              <div className="bg-muted p-3 rounded text-muted-foreground">Item 2</div>
              <div className="bg-muted p-3 rounded text-muted-foreground">Item 3</div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderPropertyPanel = () => {
    if (!currentChallenge) return null;

    return (
      <div className="bg-editor-panel border border-border rounded-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-editor-panel-foreground mb-4">CSS Properties</h3>
          
          <div className="space-y-6">
            {/* Margin Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-editor-panel-foreground">Margin</label>
              <select 
                value={currentStyles.margin || '0'} 
                onChange={(e) => updateStyle('margin', e.target.value)}
                className="w-full bg-editor-panel border border-border text-editor-panel-foreground rounded-md px-3 py-2 text-sm"
              >
                <option value="0">0</option>
                <option value="0 auto">0 auto</option>
                <option value="16px">16px</option>
                <option value="32px">32px</option>
              </select>
            </div>

            {/* Display Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-editor-panel-foreground">Display</label>
              <select 
                value={currentStyles.display || 'block'} 
                onChange={(e) => updateStyle('display', e.target.value)}
                className="w-full bg-editor-panel border border-border text-editor-panel-foreground rounded-md px-3 py-2 text-sm"
              >
                <option value="block">block</option>
                <option value="flex">flex</option>
                <option value="inline-block">inline-block</option>
              </select>
            </div>

            {/* Align Items (for flex) */}
            {currentStyles.display === 'flex' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-editor-panel-foreground">Align Items</label>
                <select 
                  value={currentStyles.alignItems || 'flex-start'} 
                  onChange={(e) => updateStyle('alignItems', e.target.value)}
                  className="w-full bg-editor-panel border border-border text-editor-panel-foreground rounded-md px-3 py-2 text-sm"
                >
                  <option value="flex-start">flex-start</option>
                  <option value="center">center</option>
                  <option value="flex-end">flex-end</option>
                </select>
              </div>
            )}

            {/* Gap Control */}
            {currentStyles.display === 'flex' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-editor-panel-foreground">Gap</label>
                <select 
                  value={currentStyles.gap || '0px'} 
                  onChange={(e) => updateStyle('gap', e.target.value)}
                  className="w-full bg-editor-panel border border-border text-editor-panel-foreground rounded-md px-3 py-2 text-sm"
                >
                  <option value="0px">0px</option>
                  <option value="8px">8px</option>
                  <option value="16px">16px</option>
                  <option value="24px">24px</option>
                </select>
              </div>
            )}

            {/* Max Width Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-editor-panel-foreground">Max Width</label>
              <select 
                value={currentStyles.maxWidth || 'none'} 
                onChange={(e) => updateStyle('maxWidth', e.target.value)}
                className="w-full bg-editor-panel border border-border text-editor-panel-foreground rounded-md px-3 py-2 text-sm"
              >
                <option value="none">none</option>
                <option value="100%">100%</option>
                <option value="200px">200px</option>
                <option value="400px">400px</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-5 justify-between">
            <div className="flex items-center gap-3">
            <Target size={40} />
            <span className="font-medium">{`Your goal is to ` +currentChallenge?.goal + `. Use the visual CSS editor to adjust the correct property and fix the issue. Once the layout is corrected, a secret password will appear. Return that password.`}</span>
            </div>
            <button 
              onClick={randomizeChallenge} 
              className="inline-flex items-center gap-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground px-8 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <RefreshCw size={16} />
              New Challenge
            </button>
          </div>
        </div>
      </div>

      {/* Goal Banner */}
      {currentChallenge && (
        <div className="bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">

               
              </div>
              {isCompleted && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 mx-60 w-full text-center shadow-2xl">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🎉</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Secret Unlocked!
              </h2>
              <p className="text-gray-600 mt-2">
                Special task conditions met!
              </p>
            </div>
    
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border-2 border-dashed border-green-300">
              <p className="text-sm text-green-500 mb-2">Secret Password:</p>
              <div className="text-3xl font-mono font-bold text-green-600 tracking-wider">
                {PASSWORD_CCSSVisualEditor}
              </div>
            </div>
          </div>
        </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Area */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Layout Preview</h2>
              {renderBrokenLayout()}
              {isCompleted && (
                <div className="mt-4 p-4 bg-editor-success/10 border border-editor-success rounded-lg">
                  <div className="flex items-center gap-2 text-editor-success">
                    <CheckCircle2 size={20} />
                    <span className="font-medium">Perfect! Challenge completed successfully!</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Property Panel */}
          <div className="lg:col-span-1">
            {renderPropertyPanel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSVisualEditor;
