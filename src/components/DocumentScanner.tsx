import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileSearch, ShieldCheck, AlertCircle, AlertTriangle, Loader2, X } from "lucide-react";
import { scanDocumentForCompliance } from "../services/geminiService";

interface ScanResult {
  status: "compliant" | "warning" | "error";
  findings: string[];
  suggestions: string[];
  extractedData: any;
}

interface DocumentScannerProps {
  isDarkMode: boolean;
}

export default function DocumentScanner({ isDarkMode }: DocumentScannerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setIsScanning(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result?.toString().split(',')[1];
        if (base64) {
          const res = await scanDocumentForCompliance(base64, file.type);
          setResult(res);
        }
        setIsScanning(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      setIsScanning(false);
    }
  };

  const clear = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <section id="scanner" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="glass-card p-12 border-gold/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -mr-32 -mt-32" />
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Automated <span className="text-gold">Pre-Audit</span> Scanner</h2>
            <p className="text-silver/60 max-w-2xl mx-auto font-light">
              Upload your invoices or financial statements for an instant AI-powered compliance check against FIRS mandatory fields.
            </p>
          </div>

          {!result ? (
            <div className="max-w-xl mx-auto">
              {!file ? (
                <label className="group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-3xl cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:scale-110 transition-transform">
                      <Upload size={32} />
                    </div>
                    <p className="mb-2 text-sm text-silver font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-silver/40 uppercase tracking-widest">PDF, PNG, JPG (MAX. 5MB)</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.png,.jpg,.jpeg" />
                </label>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-navy/50 border border-white/10 p-8 rounded-3xl flex flex-col items-center"
                >
                  <FileSearch size={48} className="text-gold mb-4" />
                  <p className="text-white font-bold mb-1">{file.name}</p>
                  <p className="text-silver/40 text-xs mb-6 lowercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  
                  <div className="flex gap-4 w-full">
                    <button 
                      onClick={handleScan}
                      disabled={isScanning}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      {isScanning ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={18} />
                          Start Scan
                        </>
                      )}
                    </button>
                    <button 
                      onClick={clear}
                      className="btn-ghost"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8"
            >
              {/* Result Summary */}
              <div className={`p-8 rounded-3xl border ${
                result.status === 'compliant' ? 'bg-green-500/5 border-green-500/20' : 
                result.status === 'warning' ? 'bg-yellow-500/5 border-yellow-500/20' : 
                'bg-red-500/5 border-red-500/20'
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  {result.status === 'compliant' ? <ShieldCheck className="text-green-500" size={32} /> : 
                   result.status === 'warning' ? <AlertTriangle className="text-yellow-500" size={32} /> : 
                   <AlertCircle className="text-red-500" size={32} />}
                  <h3 className="text-2xl font-bold capitalize">{result.status} Status</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-silver/40 uppercase tracking-widest mb-2">Findings</h4>
                    <ul className="space-y-2">
                      {result.findings.map((f, i) => (
                        <li key={i} className="text-sm text-silver/80 flex gap-2">
                          <span className="text-gold">•</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {result.suggestions.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-silver/40 uppercase tracking-widest mb-2">Required Actions</h4>
                      <ul className="space-y-2">
                        {result.suggestions.map((s, i) => (
                          <li key={i} className="text-sm text-gold/80 flex gap-2">
                            <span className="text-gold">!</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Data Extraction */}
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h4 className="text-xs font-bold text-silver/40 uppercase tracking-widest mb-6">Extracted Metadata</h4>
                <div className="space-y-4">
                  {Object.entries(result.extractedData).map(([key, val]: [string, any]) => (
                    <div key={key} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-silver/60 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-white font-medium text-sm">{String(val)}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={clear}
                  className="w-full mt-8 btn-ghost text-sm"
                >
                  Scan Another Document
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
