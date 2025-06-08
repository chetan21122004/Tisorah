import PatternDemo from '../components/PatternDemo';

export default function PatternDemoPage() {
  return (
    <div className="min-h-screen">
      <div className="py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">Geometry Pattern Demo</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            This page demonstrates various ways to use the rotated geometry pattern in the Tisorah website.
            The pattern has been rotated 90 degrees and can be applied with different overlays and opacities.
          </p>
        </div>
      </div>
      
      <PatternDemo />
    </div>
  );
} 