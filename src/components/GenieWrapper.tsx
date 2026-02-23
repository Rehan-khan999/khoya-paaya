import { ThreeCanvas } from './ThreeCanvas';
import { GenieChatPanel } from './GenieChatPanel';
import { GenieLampEnvironment } from './GenieLampEnvironment';

/**
 * GenieWrapper - Renders both the 3D genie canvas and the chat panel independently.
 * They are NOT wrapped in the same container - each is positioned independently.
 * The genie/lamp stay fixed; only the chat panel is draggable.
 */
export const GenieWrapper = () => {
  return (
    <>
      {/* Magical environment effects - behind lamp (z-index 4) */}
      <GenieLampEnvironment />
      
      {/* Three.js Canvas - fixed bottom-right, genie and lamp stay in place */}
      <ThreeCanvas />
      
      {/* Chat panel - independently positioned and draggable */}
      <GenieChatPanel />
    </>
  );
};
