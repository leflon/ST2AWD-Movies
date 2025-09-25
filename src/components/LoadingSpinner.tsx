import { Loader2 } from 'lucide-react';

/**
 * Props for LoadingSpinner component
 */
interface LoadingSpinnerProps {
  /** Size of the spinner icon in pixels */
  size?: number;
  /** Additional CSS classes to apply */
  className?: string;
  /** Loading text to display below the spinner */
  text?: string;
}

/**
 * Loading spinner component with optional text
 * Displays an animated spinning icon with customizable size and loading text
 */
export default function LoadingSpinner({
  size = 24,
  className = '',
  text = 'Loading...',
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 size={size} className='animate-spin text-primary mb-2' />
      {text && <div className='text-gray-500'>{text}</div>}
    </div>
  );
}
