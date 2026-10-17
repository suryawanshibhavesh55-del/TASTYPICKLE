import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { products as initialProducts } from '../data/products';

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  refreshProducts: () => Promise<void>;
  getProductBySlug: (slug: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLiveProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setProductsList(data.data);
      }
    } catch (err) {
      console.warn('Could not fetch dynamic products from API, using fallback data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveProducts();
  }, []);

  const getProductBySlug = (slug: string) => {
    return productsList.find((p) => p.slug === slug);
  };

  return (
    <ProductContext.Provider
      value={{
        products: productsList,
        isLoading,
        refreshProducts: fetchLiveProducts,
        getProductBySlug,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useLiveProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    // Graceful fallback to initial products if used outside provider
    return {
      products: initialProducts,
      isLoading: false,
      refreshProducts: async () => {},
      getProductBySlug: (slug: string) => initialProducts.find((p) => p.slug === slug),
    };
  }
  return context;
};
