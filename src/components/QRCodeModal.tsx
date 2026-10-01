import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, Check, X, Smartphone, Presentation } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUrl?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  defaultUrl = 'http://localhost:5173',
}) => {
  const [targetUrl, setTargetUrl] = useState<string>(defaultUrl);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(targetUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: '#20C7B7',   // AI Teal
          light: '#071A2B',  // Midnight Blue
        },
        errorCorrectionLevel: 'H',
      })
        .then((url) => setDataUrl(url))
        .catch(console.error);
    }
  }, [targetUrl, isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'StormSentinels_PPT_QR_Scanner.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071A2B]/90 backdrop-blur-md p-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-6 border border-[#20C7B7]/40 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-[#9DB4C7] hover:text-white hover:bg-[#14344D] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 text-[#20C7B7] mb-1">
          <QrCode className="w-6 h-6" />
          <span className="text-xs font-black tracking-widest uppercase font-mono">
            POWERPOINT SCANNER GENERATOR
          </span>
        </div>
        <h3 className="text-xl font-black text-white">SCAN TO OPEN PROTOTYPE</h3>
        <p className="text-xs text-[#9DB4C7] mt-1 mb-5">
          Scan with any mobile camera or attach this high-resolution QR code to your PowerPoint presentation slides.
        </p>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center bg-[#071A2B] rounded-2xl p-5 border border-[#20C7B7]/30 shadow-inner mb-5">
          {dataUrl ? (
            <img
              src={dataUrl}
              alt="StormSentinels PPT Scanner QR Code"
              className="w-56 h-56 rounded-xl border border-[#20C7B7]/40 shadow-lg"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-[#9DB4C7] text-xs">
              Generating Scanner...
            </div>
          )}
          <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#20C7B7] font-mono">
            <Smartphone className="w-4 h-4 animate-bounce" />
            <span>SCAN WITH PHONE CAMERA</span>
          </div>
        </div>

        {/* Editable URL Input */}
        <div className="space-y-3 mb-5">
          <div>
            <label className="text-[11px] font-bold text-[#9DB4C7] uppercase tracking-wider block mb-1">
              Target Demo / Presentation URL:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="flex-1 bg-[#071A2B] border border-[#9DB4C7]/20 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#20C7B7]"
                placeholder="http://localhost:5173 or http://192.168.1.x:5173"
              />
              <button
                onClick={handleCopyUrl}
                className="p-2 rounded-xl bg-[#0D2638] text-[#64D8FF] border border-[#64D8FF]/30 hover:bg-[#14344D] transition-all text-xs"
                title="Copy URL"
              >
                {copied ? <Check className="w-4 h-4 text-[#35D07F]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#20C7B7] to-[#29B6F6] hover:opacity-95 text-[#071A2B] font-black px-4 py-3 rounded-xl shadow-lg transition-all text-xs tracking-wider uppercase"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD PNG FOR POWERPOINT (.PNG)</span>
          </button>
        </div>

        <div className="mt-4 p-3 bg-[#0D2638] rounded-xl border border-[#9DB4C7]/15 flex items-start gap-2 text-[11px] text-[#9DB4C7]">
          <Presentation className="w-4 h-4 text-[#FFB84D] shrink-0 mt-0.5" />
          <span>
            <strong>PPT Tip:</strong> Drag and drop the downloaded `.png` or file `public/stormsentinels_qr.png` directly onto your PowerPoint slide!
          </span>
        </div>
      </div>
    </div>
  );
};
