import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// --- 1. REMOVED: The 'qrcode.react' import is no longer needed. ---
import { ArrowLeft, QrCode } from "lucide-react";

export default function LiveSessionPage() {
  const { courseName } = useParams();
  const navigate = useNavigate();

  // We still use this state to switch between showing the button and the placeholder
  const [sessionActive, setSessionActive] = useState(false);
  // --- 2. REMOVED: The 'qrValue' state is no longer needed. ---

  // --- 3. SIMPLIFIED: This function now only toggles the view. ---
  // All the logic for creating session data has been temporarily removed.
  const handleStartSession = () => {
    setSessionActive(true);
  };

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
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto text-lg"
              >
                <QrCode /> Generate QR Code
              </button>
            </div>
          ) : (
            // --- 4. REPLACED: The QR code is now a styled placeholder box. ---
            <div className="flex flex-col items-center gap-6">
              <p className="text-lg font-medium">
                Ask students to scan the code below:
              </p>
              {/* This is the new placeholder element */}
              <div className="w-64 h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center p-4">
                <QrCode size={48} className="text-gray-400 mb-4" />
                <h4 className="font-semibold text-gray-600">
                  QR Code will be displayed here
                </h4>
                <p className="text-sm text-gray-500">
                  Functionality to be added.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

