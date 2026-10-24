import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Power,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { ProductFormModal } from './ProductFormModal';

export const AdminProducts: React.FC = () => {
  const { token } = useAdminAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'veg' | 'non-veg' | 'combo' | 'kharam-podi'>('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Delete confirmation modal state
  const [deleteCandidate, setDeleteCandidate] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error('Fetch products error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  // Toggle active status
  const handleToggleStatus = async (product: any) => {
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !product.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, isActive: !p.isActive } : p))
        );
      }
    } catch (err) {
      console.error('Toggle status error:', err);
    }
  };

  // Confirm soft-delete / archive
  const handleConfirmDelete = async () => {
    if (!deleteCandidate) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${deleteCandidate.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === deleteCandidate.id ? { ...p, isActive: false } : p))
        );
        setDeleteCandidate(null);
      }
    } catch (err) {
      console.error('Delete product error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Product Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your authentic veg & non-veg pickles, prices, stock, and photos
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
            title="Refresh product list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 active:bg-red-900 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, category, or meat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 bg-slate-50/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              categoryFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => setCategoryFilter('veg')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              categoryFilter === 'veg'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Veg Pickles ({products.filter((p) => p.category === 'veg').length})
          </button>
          <button
            onClick={() => setCategoryFilter('non-veg')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              categoryFilter === 'non-veg'
                ? 'bg-red-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Non-Veg Pickles ({products.filter((p) => p.category === 'non-veg').length})
          </button>
          <button
            onClick={() => setCategoryFilter('combo')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              categoryFilter === 'combo'
                ? 'bg-purple-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Combo Packs ({products.filter((p) => p.category === 'combo').length})
          </button>
          <button
            onClick={() => setCategoryFilter('kharam-podi')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              categoryFilter === 'kharam-podi'
                ? 'bg-amber-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Kharam Podi ({products.filter((p) => p.category === 'kharam-podi').length})
          </button>
        </div>
      </div>

      {/* Product Table (Desktop & Tablet) & Cards (Mobile) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center animate-pulse space-y-3">
            <div className="w-8 h-8 border-3 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400 font-semibold">Loading product catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No products found</p>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or add a new pickle product.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-6">Product</th>
                    <th className="py-3.5 px-6">Category</th>
                    <th className="py-3.5 px-6">Price</th>
                    <th className="py-3.5 px-6">Stock</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      className={`hover:bg-slate-50/60 transition-colors ${
                        !p.isActive ? 'opacity-60 bg-slate-50/30' : ''
                      }`}
                    >
                      {/* Product Thumbnail & Name */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                            {p.images && p.images[0] ? (
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <Package className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{p.name}</span>
                              {p.bestSeller && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                                  Bestseller
                                </span>
                              )}
                            </div>
                            {p.teluguName && (
                              <div className="text-[11px] text-slate-400 font-medium">
                                {p.teluguName}
                              </div>
                            )}
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                              ID: {p.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            p.category === 'combo'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : p.category === 'veg'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {p.category === 'combo' ? 'Combo Pack' : p.category === 'veg' ? 'Veg' : 'Non-Veg'}
                        </span>
                        {p.subCategory && (
                          <div className="text-[11px] text-slate-400 mt-1">
                            {p.subCategory}
                          </div>
                        )}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="font-extrabold text-slate-900 text-sm">
                          ₹{p.price}
                        </span>
                        {p.originalPrice && (
                          <span className="text-slate-400 text-xs line-through ml-1.5">
                            ₹{p.originalPrice}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 block">250g Standard</span>
                      </td>

                      {/* Stock */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`font-semibold text-xs ${
                            p.stock > 10 ? 'text-slate-800' : 'text-amber-600 font-bold'
                          }`}
                        >
                          {p.stock} bottles
                        </span>
                      </td>

                      {/* Active Status */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(p)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                            p.isActive
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Click to toggle active status"
                        >
                          <Power className="w-3 h-3" />
                          <span>{p.isActive ? 'Active' : 'Inactive'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedProduct(p);
                              setIsFormOpen(true);
                            }}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteCandidate(p)}
                            className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                            title="Deactivate / Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <div key={p.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {p.images && p.images[0] ? (
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Package className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{p.name}</h3>
                        <p className="text-xs text-slate-400">{p.teluguName}</p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.category === 'combo'
                              ? 'bg-purple-50 text-purple-700'
                              : p.category === 'veg'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {p.category === 'combo' ? 'Combo Pack' : p.category === 'veg' ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-extrabold text-slate-900 text-base">₹{p.price}</p>
                      <p className="text-[10px] text-slate-400">Stock: {p.stock}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(p)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                        p.isActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      <Power className="w-3 h-3" />
                      <span>{p.isActive ? 'Active' : 'Archived'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(p);
                          setIsFormOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteCandidate(p)}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        product={selectedProduct}
        onSuccess={fetchProducts}
      />

      {/* Delete / Archive Confirmation Dialog */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">
                Deactivate "{deleteCandidate.name}"?
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Are you sure you want to delete this product? To protect historical orders,
                this will safely archive and hide the product from the storefront.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Archiving...' : 'Yes, Deactivate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
