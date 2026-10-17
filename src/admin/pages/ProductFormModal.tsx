import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
  Plus,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any; // If editing
  onSuccess: () => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  product,
  onSuccess,
}) => {
  const { token } = useAdminAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [teluguName, setTeluguName] = useState('');
  const [category, setCategory] = useState<'veg' | 'non-veg' | 'combo'>('veg');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState<number | ''>(95);
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number>(50);
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Medium' | 'Spicy' | 'Extra Spicy'>('Medium');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [shelfLife, setShelfLife] = useState('3 Months');
  const [storage, setStorage] = useState('Store in a cool, dry place. Use dry spoon.');
  const [images, setImages] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);

  // Status & Uploading
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setTeluguName(product.teluguName || '');
      setCategory(product.category || 'veg');
      setSubCategory(product.subCategory || '');
      setPrice(product.price || '');
      setOriginalPrice(product.originalPrice || '');
      setStock(product.stock !== undefined ? product.stock : 50);
      setSpiceLevel(product.spiceLevel || 'Medium');
      setShortDescription(product.shortDescription || '');
      setDescription(product.description || '');
      setIngredientsText(
        Array.isArray(product.ingredients) ? product.ingredients.join(', ') : ''
      );
      setShelfLife(product.shelfLife || '3 Months');
      setStorage(product.storage || 'Store in a cool, dry place.');
      setImages(Array.isArray(product.images) ? product.images : []);
      setIsActive(product.isActive !== undefined ? product.isActive : true);
      setFeatured(!!product.featured);
      setBestSeller(!!product.bestSeller);
    } else {
      // Reset form
      setName('');
      setTeluguName('');
      setCategory('veg');
      setSubCategory('');
      setPrice(95);
      setOriginalPrice('');
      setStock(50);
      setSpiceLevel('Medium');
      setShortDescription('');
      setDescription('');
      setIngredientsText('Hand-ground Spices, Edible Oil, Salt');
      setShelfLife('3 Months');
      setStorage('Store in a cool, dry place. Use dry spoon.');
      setImages([]);
      setIsActive(true);
      setFeatured(false);
      setBestSeller(false);
    }
    setError('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  // Cloudinary Image Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, WEBP)');
      return;
    }

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setImages((prev) => [...prev, data.url]);
      } else {
        setError(data.message || 'Image upload failed');
      }
    } catch (err: any) {
      console.error('Image upload error:', err);
      setError('Failed to upload image to Cloudinary');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Product Name is required');
      return;
    }
    if (price === '' || Number(price) <= 0) {
      setError('Please provide a valid price');
      return;
    }

    setIsSubmitting(true);

    const ingredients = ingredientsText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      name: name.trim(),
      teluguName: teluguName.trim() || undefined,
      category,
      subCategory: subCategory.trim() || undefined,
      price: Number(price),
      originalPrice: originalPrice !== '' ? Number(originalPrice) : undefined,
      stock: Number(stock),
      spiceLevel,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      ingredients,
      shelfLife,
      storage,
      images,
      isActive,
      featured,
      bestSeller,
    };

    try {
      const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
      const method = product ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess();
        onClose();
      } else {
        setError(data.message || 'Failed to save product');
      }
    } catch (err: any) {
      console.error('Save product error:', err);
      setError('Failed to connect to server');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {product ? 'Edit Product' : 'Add New Pickle Product'}
            </h2>
            <p className="text-xs text-slate-400">
              {product
                ? `Updating ${product.name}`
                : 'Fill details and upload image to list on TastyPickle'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Section: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Boneless Chicken Pickle"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Telugu Regional Name (Optional)
                </label>
                <input
                  type="text"
                  value={teluguName}
                  onChange={(e) => setTeluguName(e.target.value)}
                  placeholder="e.g. చికెన్ పచ్చడి"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none bg-white"
                >
                  <option value="veg">Veg Pickle</option>
                  <option value="non-veg">Non-Veg Pickle</option>
                  <option value="combo">Combo Pack</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sub-Category / Main Ingredient
                </label>
                <input
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  placeholder="e.g. Chicken, Mango, Prawns"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Spice Heat Level
                </label>
                <select
                  value={spiceLevel}
                  onChange={(e) => setSpiceLevel(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none bg-white"
                >
                  <option value="Mild">Mild</option>
                  <option value="Medium">Medium</option>
                  <option value="Spicy">Spicy</option>
                  <option value="Extra Spicy">Extra Spicy</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Pricing & Inventory */}
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              2. Price & Inventory (Standard 250g Bottle)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Selling Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                  placeholder="95"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Original MRP (₹) (Optional)
                </label>
                <input
                  type="number"
                  min="1"
                  value={originalPrice}
                  onChange={(e) =>
                    setOriginalPrice(e.target.value ? Number(e.target.value) : '')
                  }
                  placeholder="e.g. 120"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Stock Quantity (Bottles)
                </label>
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  placeholder="50"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Image Upload with Cloudinary */}
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                3. Product Images (Cloudinary)
              </h3>
              <span className="text-[11px] text-slate-400">
                {images.length} image{images.length !== 1 ? 's' : ''} attached
              </span>
            </div>

            {/* Images Gallery */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {images.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-50"
                  >
                    <img
                      src={url}
                      alt={`Product thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-90 hover:opacity-100 shadow transition-opacity"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-black/70 text-white text-[9px] font-bold rounded-md uppercase tracking-wider">
                        Main Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload Box */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="cloudinaryUpload"
              />
              <label
                htmlFor="cloudinaryUpload"
                className={`flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-red-600 bg-slate-50 hover:bg-red-50/40 text-slate-700 text-xs font-bold cursor-pointer transition-all w-full ${
                  isUploading ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    <span>Uploading to Cloudinary...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-red-700" />
                    <span>Click to Upload Product Photo (Cloudinary)</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Section: Descriptions & Details */}
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              4. Descriptions & Ingredients
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Catchy Summary
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Tender boneless chicken morsels cooked in aromatic spices..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Detailed Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Traditional heirloom recipe passed down through generations..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ingredients (comma separated)
              </label>
              <input
                type="text"
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                placeholder="Prime Chicken, Edible Oil, Spices, Salt, Mustard"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Section: Status Toggles */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-red-700 rounded focus:ring-red-600"
              />
              <span className="text-xs font-bold text-slate-800">Available / Active</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-red-700 rounded focus:ring-red-600"
              />
              <span className="text-xs font-bold text-slate-800">Featured Banner</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={bestSeller}
                onChange={(e) => setBestSeller(e.target.checked)}
                className="w-4 h-4 text-red-700 rounded focus:ring-red-600"
              />
              <span className="text-xs font-bold text-slate-800">Best Seller Badge</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="px-6 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving to MongoDB...</span>
                </>
              ) : (
                <span>{product ? 'Save Changes' : 'Publish Product'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
