import { useEffect } from 'react';
import useToggle from '@/hooks/useToggle';

const useKeyPress = (key: string) => {
  const [isKeyPressed, toggleIsKeyPressed] = useToggle();

  useEffect(() => {
    const keyDown = (evt: KeyboardEvent) => {
      if (evt.key === key) toggleIsKeyPressed(true);
    };
    const keyUp = (evt: KeyboardEvent) => {
      if (evt.key === key) toggleIsKeyPressed(false);
    };

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    };
  }, []);

  return isKeyPressed;
};

export default useKeyPress;
