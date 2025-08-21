import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, X, QrCode, CheckCircle, AlertCircle } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubmissionData) => void;
  challengeTitle?: string;
  pointsReward?: number;
}

interface SubmissionData {
  photos: File[];
  qrData?: string;
  description: string;
  category: string;
}

const categories = [
  { id: 'smartphones', label: 'Smartphones & Tablets', points: 50 },
  { id: 'laptops', label: 'Laptops & Computers', points: 100 },
  { id: 'batteries', label: 'Batteries', points: 25 },
  { id: 'cables', label: 'Cables & Chargers', points: 15 },
  { id: 'monitors', label: 'Monitors & TVs', points: 150 },
  { id: 'other', label: 'Other Electronics', points: 30 }
];

export default function SubmissionModal({ isOpen, onClose, onSubmit, challengeTitle, pointsReward }: SubmissionModalProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [qrData, setQrData] = useState<string>('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrScannerRef = useRef<Html5QrcodeScanner | null>(null);

  const handlePhotoCapture = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `ewaste-${Date.now()}.jpg`, { type: 'image/jpeg' });
            setPhotos(prev => [...prev, file]);
          }
        }, 'image/jpeg', 0.8);
      }
      
      // Stop camera
      const stream = video.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setPhotos(prev => [...prev, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const startQRScanning = () => {
    setIsScanning(true);
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
    
    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        setQrData(decodedText);
        scanner.clear();
        setIsScanning(false);
      },
      (error) => {
        console.warn(`QR scan error: ${error}`);
      }
    );
    
    qrScannerRef.current = scanner;
  };

  const stopQRScanning = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.clear();
      setIsScanning(false);
    }
  };

  const handleSubmit = async () => {
    if (photos.length === 0 || !category) {
      alert('Please add at least one photo and select a category');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit({
      photos,
      qrData: scanResult,
      description,
      category
    });
    
    // Reset form
    setPhotos([]);
    setQrData('');
    setDescription('');
    setCategory('');
    setScanResult('');
    setStep(1);
    setIsSubmitting(false);
    onClose();
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {challengeTitle ? `Submit for: ${challengeTitle}` : 'Submit E-Waste'}
              </h2>
              {pointsReward && (
                <p className="text-emerald-600 font-medium">Earn up to {pointsReward} points</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNum ? <CheckCircle className="h-5 w-5" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-emerald-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Take Photos of Your E-Waste</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={handlePhotoCapture}
                    className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 transition-colors"
                  >
                    <Camera className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-600">Take Photo</span>
                  </button>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-600">Upload Photos</span>
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* Camera View */}
                <video ref={videoRef} className="w-full rounded-lg mb-4 hidden" />
                <canvas ref={canvasRef} className="hidden" />
                
                {videoRef.current?.srcObject && (
                  <div className="text-center mb-4">
                    <button
                      onClick={capturePhoto}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Capture Photo
                    </button>
                  </div>
                )}

                {/* Photo Preview */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`E-waste ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={photos.length === 0}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Scan QR Code (Optional)</h3>
                <p className="text-gray-600 mb-4">
                  If your e-waste has a QR code for tracking, scan it here for bonus points!
                </p>

                {!isScanning && !scanResult && (
                  <button
                    onClick={startQRScanning}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <QrCode className="h-5 w-5" />
                    <span>Start QR Scanning</span>
                  </button>
                )}

                {isScanning && (
                  <div>
                    <div id="qr-reader" className="mb-4"></div>
                    <button
                      onClick={stopQRScanning}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Stop Scanning
                    </button>
                  </div>
                )}

                {scanResult && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">QR Code Scanned Successfully!</span>
                    </div>
                    <p className="text-green-700 mt-1 text-sm">Data: {scanResult}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Details</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label} (+{cat.points} points)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the condition, brand, or any other details..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Submission Summary</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {photos.length} photo{photos.length !== 1 ? 's' : ''} attached</li>
                    {scanResult && <li>• QR code scanned (+10 bonus points)</li>}
                    {category && (
                      <li>• Category: {categories.find(c => c.id === category)?.label}</li>
                    )}
                    <li className="font-medium text-emerald-600">
                      • Estimated points: {category ? categories.find(c => c.id === category)?.points || 0 : 0}{scanResult ? ' + 10' : ''} points
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !category}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit E-Waste</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}