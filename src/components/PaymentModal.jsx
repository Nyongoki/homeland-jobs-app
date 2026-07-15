import { useState, useEffect } from "react";

export default function PaymentModal({ isOpen, onClose, job, onSuccess }) {
  const [phase, setPhase] = useState("idle");
  const [phone, setPhone] = useState("0712345678");
  const [simulateFailure, setSimulateFailure] = useState(false);

  // phase resets to idle each time the modal opens so a previous failure/success doesn't persist into a new session
  useEffect(() => {
    if (isOpen) setPhase("idle");
  }, [isOpen]);

  const handlePay = () => {
    setPhase("sending");
    // Simulate API request to initiate payment prompt
    setTimeout(() => {
      setPhase("waiting");
      // Simulate waiting for M-Pesa customer approval callback
      setTimeout(() => {
        setPhase(simulateFailure ? "failed" : "success");
        if (!simulateFailure) onSuccess();
      }, 3000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    /* Backdrop overlay */
    <div className="absolute inset-0 bg-black/50 z-40 flex items-end">
      <div className="w-full bg-white dark:bg-gray-800 rounded-t-3xl p-6 shadow-2xl border-t border-gray-100 dark:border-gray-700 max-h-[90%] overflow-y-auto">

        {/* Grab bar indicator */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {phase === "idle" && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Fund Escrow</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Secure payment for <span className="font-medium text-gray-800 dark:text-gray-200">{job.title}</span>
            </p>

            {/* Amount display (read-only) */}
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-550 dark:text-gray-450 mb-1.5">Amount</label>
            <div className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-xl text-gray-850 dark:text-gray-100 font-bold mb-4">
              KES {job.budget.toLocaleString("en-KE")}
            </div>

            {/* Phone number input field */}
            <label htmlFor="mpesa-phone" className="block text-xs font-semibold uppercase tracking-wider text-gray-550 dark:text-gray-450 mb-1.5">M-Pesa phone number</label>
            <input
              id="mpesa-phone"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-250 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm transition-all"
            />

            {/* Simulate failure toggle container */}
            <div className="flex items-center justify-between mb-6 py-3.5 border-t border-b border-gray-100 dark:border-gray-750">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Simulate failure (testing)</span>
              <button
                role="switch"
                aria-checked={simulateFailure}
                onClick={() => setSimulateFailure(f => !f)}
                className={`relative w-10 h-5 rounded-full transition-colors duration-250 focus:outline-none ${simulateFailure ? "bg-red-500" : "bg-gray-300 dark:bg-gray-650"}`}
                aria-label="Simulate payment failure toggle"
              >
                <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-250 ${simulateFailure ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>

            <button
              onClick={handlePay}
              className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md active:scale-[0.99]"
            >
              Pay via M-Pesa
            </button>
            <button 
              onClick={onClose} 
              className="w-full py-2.5 text-gray-500 dark:text-gray-400 text-xs font-medium mt-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
          </>
        )}

        {phase === "sending" && (
          <div className="flex flex-col items-center py-8 gap-4 select-none">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-semibold text-gray-850 dark:text-white text-sm">Sending STK Push…</p>
            <p className="text-xs text-gray-500 dark:text-gray-450">Contacting M-Pesa servers</p>
          </div>
        )}

        {phase === "waiting" && (
          <div className="flex flex-col items-center py-8 gap-4 select-none">
            <div className="text-5xl animate-bounce">📱</div>
            <p className="font-semibold text-gray-850 dark:text-white text-sm text-center">
              Check your phone — M-Pesa prompt sent
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-450 text-center max-w-[80%]">
              Enter your M-Pesa PIN on the popup on your screen to confirm payment
            </p>
          </div>
        )}

        {phase === "success" && (
          <div className="flex flex-col items-center py-6 gap-3 select-none">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-2xl text-green-600 dark:text-green-400 font-bold border border-green-200 dark:border-green-800">
              ✓
            </div>
            <p className="font-bold text-gray-900 dark:text-white text-base">Escrow Funded Successfully</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Receipt: <span className="font-mono font-semibold bg-gray-50 dark:bg-gray-900 px-1.5 py-0.5 rounded border border-gray-100 dark:border-gray-800">NLJ7RT61SV</span></p>
            <p className="text-xs text-gray-550 dark:text-gray-400">
              Amount: <span className="font-semibold text-gray-850 dark:text-gray-200">KES {job.budget.toLocaleString("en-KE")}</span>
            </p>
            <button
              onClick={onClose}
              className="mt-4 w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        )}

        {phase === "failed" && (
          <div className="flex flex-col items-center py-6 gap-3 select-none">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-2xl text-red-600 dark:text-red-400 font-bold border border-red-200 dark:border-red-800">
              ✗
            </div>
            <p className="font-bold text-red-700 dark:text-red-400 text-base">Payment Failed</p>
            <p className="text-xs text-gray-550 dark:text-gray-400 text-center max-w-[85%]">
              Insufficient funds or transaction cancelled. Please top up your M-Pesa wallet and try again.
            </p>
            <button
              onClick={() => setPhase("idle")}
              className="mt-4 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              Retry
            </button>
            <button 
              onClick={onClose} 
              className="text-gray-500 dark:text-gray-400 text-xs font-medium py-2 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
