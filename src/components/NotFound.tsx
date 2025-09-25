import { Link } from 'react-router';
import { ArrowLeft, AlertCircle } from 'lucide-react';

type Props = {
  title?: string;
  message?: string;
  backPath?: string;
  backLabel?: string;
};

export default function NotFound({
  title = 'Not Found',
  message = 'The content you are looking for could not be found.',
  backPath = '/',
  backLabel = 'Back to Home'
}: Props) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
          <h1 className="text-3xl font-bold text-text mb-2">{title}</h1>
          <p className="text-gray-600">{message}</p>
        </div>

        <Link
          to={backPath}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft size={16} />
          {backLabel}
        </Link>
      </div>
    </div>
  );
}
