import React from 'react';
import {
  Settings,
  ShieldCheck,
  Database,
  Cloud,
  Phone,
  Truck,
  Package,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { TASTYPICKLE_WHATSAPP_NUMBER } from '../../context/CartContext';

export const AdminSettings: React.FC = () => {
  const { admin } = useAdminAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Admin Settings & System Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Store configurations, active cloud integrations, and credentials overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Admin Account Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-red-700" />
            <span>Admin Authentication</span>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Admin Username:</span>
              <span className="font-bold text-slate-900">{admin?.adminId || 'admin'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Session Type:</span>
              <span className="font-medium text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Signed JWT Bearer
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Security Mode:</span>
              <span className="font-medium text-slate-800">Server-Side Verified</span>
            </div>
          </div>
        </div>

        {/* MongoDB Connection Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
            <Database className="w-5 h-5 text-emerald-600" />
            <span>Database Integration</span>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Database Engine:</span>
              <span className="font-bold text-slate-900">MongoDB Atlas</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Database Name:</span>
              <span className="font-bold text-slate-900">tastypickle</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Collections:</span>
              <span className="font-medium text-slate-800">products, orders</span>
            </div>
          </div>
        </div>

        {/* Cloudinary Integration Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
            <Cloud className="w-5 h-5 text-blue-600" />
            <span>Cloudinary Media Storage</span>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Cloud Name:</span>
              <span className="font-bold text-slate-900">b3phezvf</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Preset:</span>
              <span className="font-mono text-slate-800">gift_byrashi_product</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Image Pipeline:</span>
              <span className="font-medium text-emerald-700">Auto-Optimized CDN</span>
            </div>
          </div>
        </div>

        {/* Store Shipping & Dispatch Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm">
            <Truck className="w-5 h-5 text-purple-600" />
            <span>Store Dispatch Rules</span>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Standard Delivery Charge:</span>
              <span className="font-bold text-slate-900">₹80 Flat Across India</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Standard Bottle Size:</span>
              <span className="font-bold text-slate-900">250g Glass Jar</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">WhatsApp Dispatch Helpline:</span>
              <span className="font-bold text-slate-900 font-mono">+91 {TASTYPICKLE_WHATSAPP_NUMBER}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security notice */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-start gap-3 text-slate-600 text-xs">
        <Info className="w-4 h-4 shrink-0 text-slate-500 mt-0.5" />
        <p className="leading-relaxed">
          All private credentials (MongoDB connection string, Cloudinary API secrets, and JWT secret)
          are securely protected in the environment configuration (`.env`) and never exposed to the client-side browser.
        </p>
      </div>
    </div>
  );
};
