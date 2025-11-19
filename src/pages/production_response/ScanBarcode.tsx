import { useState } from "react";
import dynamic from "next/dynamic";

// Load scanner without SSR (for Next.js)
const BarcodeScannerComponent = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
);

const ScanBarcode = () => {
  const [barcode, setBarcode] = useState<string | null>(null);

  return (
    <div className="p-4 mt-5">
      <h2 className="text-lg font-semibold mb-2">📷 Scan Barcode</h2>

      <div className="w-full max-w-xl border border-gray-400 rounded bg-black">
        <BarcodeScannerComponent
          width={500}
          height={300}
          onUpdate={(err, result) => {
            if (result) {
              setBarcode(result.text);
              console.log("📦 Scanned:", result.text);
              // Optional: call API here to auto-complete
            }
          }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-700">
        <strong>Scanned Barcode:</strong> {barcode ?? "Not scanned yet"}
      </p>
    </div>
  );
};

export default ScanBarcode;
