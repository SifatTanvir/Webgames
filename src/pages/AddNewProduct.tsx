import React, { useState, useMemo, useEffect, FC, useRef } from "react";

// --- CONSTANTS ---
export const TASK_ID_AddNewProduct = "ecommerce-productmanagement-addproduct";
export const PASSWORD_AddNewProduct = "PASSWORD-989fd8-AUTOMATION";

// --- STATIC DATA FOR TASK VALIDATION ---
const PRODUCT_TO_ADD = {
  name: "QuantumGlow LED Monitor",
  price: "699.99",
  description: "A 32-inch 4K UHD monitor with next-gen quantum dot technology.",
};
const PRODUCT_TO_EDIT = {
  price: "649.99",
  description:
    "A 32-inch 4K UHD monitor with next-gen quantum dot technology. Now with extended warranty.",
};
const PRODUCT_TO_DELETE_NAME = "TerraFlex Running Shoes";

// --- TYPESCRIPT INTERFACES ---
interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

// --- MOCK DATA ---
const seedProducts: Omit<Product, "id" | "imageUrl">[] = [
  {
    name: "AcousticBliss Headphones",
    price: "199.99",
    description: "Noise-cancelling over-ear headphones.",
  },
  {
    name: "ErgoMotion Office Chair",
    price: "349.50",
    description: "Ergonomic mesh chair with lumbar support.",
  },
  {
    name: "Gourmet Coffee Grinder",
    price: "89.99",
    description: "Burr grinder with 40 settings.",
  },
  {
    name: "TerraFlex Running Shoes",
    price: "129.95",
    description: "Lightweight and durable trail running shoes.",
  },
];

// --- INLINE SVG ICONS ---
const PlusIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);
const PencilIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
const TrashIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);
const CheckCircleIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const InfoIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const COLOR_THEMES = ["red", "pink", "orange"];
const colorClass = (base: string, color: string, shade: string) =>
  `${base}-${color}-${shade}`;

const ManageFullProductLifecycle: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [taskProgress, setTaskProgress] = useState({
    added: false,
    edited: false,
    deleted: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [showGenericSuccessModal, setShowGenericSuccessModal] = useState(false);
  const [themeColor, setThemeColor] = useState("red");
  const addedProductIdRef = useRef<string | null>(null);
  const deletedProductNamesRef = useRef<Set<string>>(new Set());
  const editedProductIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const newColor =
      COLOR_THEMES[Math.floor(Math.random() * COLOR_THEMES.length)];
    setThemeColor(newColor);
  }, []);

  useMemo(() => {
    const initialProducts = seedProducts.map((p) => ({
      ...p,
      id: crypto.randomUUID(),
      imageUrl: `https://picsum.photos/seed/${p.name}${Math.random()}/400/300`,
    }));
    setProducts(initialProducts.sort(() => Math.random() - 0.5));
  }, []);

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormState({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormState({ name: "", price: "", description: "" });
  };

  const handleDeleteClick = (productId: string, productName: string) => {
    deletedProductNamesRef.current.add(productName);

    if (
      productName === PRODUCT_TO_DELETE_NAME &&
      products.find((p) => p.id === productId)
    ) {
      setTaskProgress((prev) => ({ ...prev, deleted: true }));
    }

    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleFinalSubmit = () => {
    const onlyCorrectAdded =
      taskProgress.added && addedProductIdRef.current !== null;
    const onlyCorrectEdited =
      taskProgress.edited &&
      editedProductIdsRef.current.has(addedProductIdRef.current!) &&
      editedProductIdsRef.current.size === 1;
    const onlyCorrectDeleted =
      taskProgress.deleted &&
      deletedProductNamesRef.current.size === 1 &&
      deletedProductNamesRef.current.has(PRODUCT_TO_DELETE_NAME);

    if (onlyCorrectAdded && onlyCorrectEdited && onlyCorrectDeleted) {
      setShowModal(true);
    } else {
      setShowGenericSuccessModal(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingProduct) {
      const isCorrectProductToEdit =
        editingProduct.name === PRODUCT_TO_ADD.name &&
        editingProduct.id === addedProductIdRef.current;
      const isCorrectEditData =
        formState.price.trim() === PRODUCT_TO_EDIT.price &&
        formState.description.trim() === PRODUCT_TO_EDIT.description;

      if (isCorrectProductToEdit && isCorrectEditData) {
        setTaskProgress((prev) => ({ ...prev, edited: true }));
      }

      editedProductIdsRef.current.add(editingProduct.id);

      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formState } : p
        )
      );
      handleCancelEdit();
    } else {
      const isCorrectProduct =
        formState.name.trim() === PRODUCT_TO_ADD.name &&
        formState.price.trim() === PRODUCT_TO_ADD.price &&
        formState.description.trim() === PRODUCT_TO_ADD.description;

      const newProduct: Product = {
        id: crypto.randomUUID(),
        ...formState,
        imageUrl: `https://picsum.photos/seed/${
          formState.name
        }${Math.random()}/400/300`,
      };

      if (isCorrectProduct) {
        setTaskProgress((prev) => ({ ...prev, added: true }));
        addedProductIdRef.current = newProduct.id;
      }

      setProducts((prev) => [newProduct, ...prev]);
      setFormState({ name: "", price: "", description: "" });
    }
  };

  return (
    <div
      className={`min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-500 bg-gradient-to-br ${colorClass(
        "from",
        themeColor,
        "100"
      )} to-slate-100 dark:from-${themeColor}-900 dark:to-slate-900`}
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <h1
            className={`text-3xl font-bold tracking-tight ${colorClass(
              "text",
              themeColor,
              "700"
            )} dark:text-${themeColor}-300`}
          >
            Full-Cycle Product Management
          </h1>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-slate-900 dark:text-white">
                {editingProduct ? (
                  <>
                    <PencilIcon className="w-5 h-5 mr-2 text-amber-500" /> Edit
                    Product
                  </>
                ) : (
                  <>
                    <PlusIcon
                      className={`w-5 h-5 mr-2 ${colorClass(
                        "text",
                        themeColor,
                        "500"
                      )}`}
                    />{" "}
                    Add Product
                  </>
                )}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    disabled={!!editingProduct}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Price ($)
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formState.price}
                    onChange={(e) =>
                      setFormState({ ...formState, price: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formState.description}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={
                      !(
                        formState.name &&
                        formState.price &&
                        formState.description
                      )
                    }
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors duration-200
                                             ${
                                               editingProduct
                                                 ? `${colorClass(
                                                     "bg",
                                                     themeColor,
                                                     "500"
                                                   )} hover:${colorClass(
                                                     "bg",
                                                     themeColor,
                                                     "600"
                                                   )} text-white`
                                                 : `${colorClass(
                                                     "bg",
                                                     themeColor,
                                                     "600"
                                                   )} hover:${colorClass(
                                                     "bg",
                                                     themeColor,
                                                     "700"
                                                   )} text-white`
                                             }
                                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${colorClass(
                                               "ring",
                                               themeColor,
                                               "500"
                                             )} dark:focus:ring-offset-slate-800
                                             ${
                                               !(
                                                 formState.name &&
                                                 formState.price &&
                                                 formState.description
                                               )
                                                 ? "opacity-50 cursor-not-allowed"
                                                 : ""
                                             }`}
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="w-full flex justify-center py-2 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <button
              onClick={handleFinalSubmit}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors duration-200 text-white focus:outline-none focus:ring-2 bg-blue-400 focus:ring-offset-2  dark:focus:ring-offset-slate-800`}
            >
              Submit Final
            </button>
          </div>
          <div className="lg:col-span-2 bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
              Current Inventory ({products.length})
            </h3>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-start sm:items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150 border-b border-slate-200 dark:border-slate-700 last:border-b-0"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover bg-slate-200 dark:bg-slate-700 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 dark:text-white">
                      {product.name}
                    </h4>
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                      ${product.price}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 hidden md:block">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-1 sm:mt-0">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="flex items-center text-xs px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors whitespace-nowrap"
                    >
                      <PencilIcon className="w-3 h-3 mr-1" /> Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteClick(product.id, product.name)
                      }
                      className="flex items-center text-xs px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-colors whitespace-nowrap"
                    >
                      <TrashIcon className="w-3 h-3 mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal for final password reveal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-green-400 relative animate-fadeIn">
            <CheckCircleIcon className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
              All Tasks Completed!
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-200 mb-4">
              You have successfully added, edited, and deleted the required
              products.
            </p>
            <div className="bg-green-100 dark:bg-green-800/50 border border-green-400 rounded-lg p-4 mt-2">
              <p className="font-bold text-green-700 dark:text-green-200 mb-1">
                Password Unlocked:
              </p>
              <p className="font-mono text-2xl select-all text-green-800 dark:text-green-100">
                {PASSWORD_AddNewProduct}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Modal for generic success */}
      {showGenericSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          aria-modal="true"
          role="dialog"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-blue-400 relative animate-fadeIn">
            <InfoIcon className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">
              Submission Received
            </h2>
            <p className="text-lg text-slate-700 dark:text-slate-200">
              Your actions have been recorded.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFullProductLifecycle;
