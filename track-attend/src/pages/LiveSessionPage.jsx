import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, QrCode } from "lucide-react";
import {QRCodeCanvas} from "qrcode.react";

export default function LiveSessionPage() {
  const { courseName } = useParams();
  const navigate = useNavigate();

  const [sessionActive, setSessionActive] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  const SESSION_DURATION = 5 * 60 * 1000; // 5 minutes (demo)

  const handleStartSession = () => {
    const newSessionId = `${courseName}-${Date.now()}`; // unique QR content
    setSessionId(newSessionId);
    setExpiresAt(Date.now() + SESSION_DURATION);
    setSessionActive(true);
  };

  // Auto-expire QR
  useEffect(() => {
    if (!expiresAt) return;

    const timer = setInterval(() => {
      if (Date.now() > expiresAt) {
        setSessionActive(false);
        setSessionId(null);
        setExpiresAt(null);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

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
            Generate a unique QR code for students to scan for today's class.
          </p>

          {!sessionActive ? (
            <div className="text-center">
              <button
                onClick={handleStartSession}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 flex 
                items-center gap-2 mx-auto text-lg"
              >
                <QrCode /> Generate QR Code
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <p className="text-lg font-medium">
                Ask students to scan the code below:
              </p>

              {sessionId && (
                <div className="flex flex-col items-center">
                  <QRCodeCanvas value={sessionId} size={256} />
                  <p className="mt-4 text-gray-500 text-sm">
                    Expires at:{" "}
                    {new Date(expiresAt).toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
