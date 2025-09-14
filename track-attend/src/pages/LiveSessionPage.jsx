import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const QR_REFRESH_INTERVAL = 30; // seconds
const MAIN_SESSION_DURATION = 10 * 60 * 1000; // 10 minutes

export default function LiveSessionPage() {
  const { courseName } = useParams();
  const navigate = useNavigate();

  const [sessionActive, setSessionActive] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [countdown, setCountdown] = useState(QR_REFRESH_INTERVAL);
  const [mainSessionExpiresAt, setMainSessionExpiresAt] = useState(null);

  const generateNewQrCode = useCallback(() => {
    const randomToken = Math.random().toString(36).substring(2, 10);
    const newQrData = JSON.stringify({
      courseName,
      sessionId: `${courseName}-${Date.now()}`,
      token: randomToken,
    });
    setQrData(newQrData);
    setCountdown(QR_REFRESH_INTERVAL);
  }, [courseName]);


  const handleStartSession = () => {
    setMainSessionExpiresAt(Date.now() + MAIN_SESSION_DURATION);
    generateNewQrCode();
    setSessionActive(true);
  };

  useEffect(() => {
    if (!sessionActive) return;

    const timer = setInterval(() => {
      // Check for main session expiry
      if (Date.now() > mainSessionExpiresAt) {
        setSessionActive(false);
        setQrData(null);
        setMainSessionExpiresAt(null);
        return; 
      }

      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          generateNewQrCode();
          return QR_REFRESH_INTERVAL;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionActive, mainSessionExpiresAt, generateNewQrCode]);

  const progressPercentage = (countdown / QR_REFRESH_INTERVAL) * 100;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} /> Go Back to Dashboard
        </button>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-2">
            Live Attendance Session: {courseName}
          </h1>
          <p className="text-gray-600 mb-8">
            A new, secure QR code will be generated periodically.
          </p>

          {!sessionActive ? (
            <div className="text-center">
              <button
                onClick={handleStartSession}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 flex 
                items-center gap-2 mx-auto text-lg transition-colors"
              >
                <QrCode /> Generate QR Code
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <p className="text-lg font-medium">
                Ask students to scan the code below:
              </p>

              {qrData && (
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-white rounded-lg shadow-inner">
                    <QRCodeCanvas value={qrData} size={256} />
                  </div>
                  
                  <div className="w-full max-w-sm mt-6 text-center">
                     <p className="text-gray-600 font-semibold">
                        New QR code in <span className="text-blue-600 text-xl">{countdown}</span> seconds
                     </p>
                     <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                           className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-linear" 
                           style={{ width: `${progressPercentage}%` }}>
                        </div>
                     </div>
                  </div>

                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
