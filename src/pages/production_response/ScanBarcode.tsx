import React, { useState } from "react";
import dynamic from "next/dynamic";

interface ScannerResult {
  getText(): string;
  text: string;
}

interface BarcodeScannerProps {
  width?: number | string;
  height?: number | string;
  onUpdate: (err: unknown, result?: ScannerResult | null) => void;
  facingMode?: "user" | "environment";
  torch?: boolean;
  delay?: number;
}

const BarcodeScannerComponent = dynamic<BarcodeScannerProps>(
  //@ts-ignore - necessary if the library doesn't export a clean default for Next.js dynamic
  () => import("react-qr-barcode-scanner"),
  { ssr: false },
);

const ScanBarcode: React.FC = () => {
  const [barcode, setBarcode] = useState<string | null>(null);

  return (
    <div className="p-4 mt-5">
      <h2 className="text-lg font-semibold mb-2">📷 Scan Barcode</h2>

      <div className="w-full max-w-xl border border-gray-400 rounded bg-black overflow-hidden">
        <BarcodeScannerComponent
          width={500}
          height={300}
          onUpdate={(err: unknown, result?: ScannerResult | null) => {
            if (result) {
              setBarcode(result.text);
              console.log("Scanned:", result.text);
            }
            if (err) {
            }
          }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-700">
        <span className="font-bold">Scanned Barcode:</span>
        {barcode ?? "Not scanned yet"}
      </p>
    </div>
  );
};

export default ScanBarcode;
