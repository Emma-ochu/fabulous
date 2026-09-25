import { useState } from "react";
import { z } from "zod";
import { CheckCircle, AlertCircle, MessageCircle, X } from "lucide-react";
import { featuredProducts } from "../../data/products";
import { sadoerProduct } from "../../data/sadoer";
import { CustomProductSelect } from "./CustomProductSelect";
import { CustomStateSelect } from "./CustomStateSelect";
import { normalizeNigerianPhone, formatPhoneDisplay } from "../../utils/phone";

// Safe catalog builder strictly containing Medicube, Featured, and Sadoer
const safeFeatured = Array.isArray(featuredProducts) ? featuredProducts : [];
const safeSadoer = Array.isArray(sadoerProduct) ? sadoerProduct : [];

const rawCatalog = [
  {
    id: "medicube-night-mask",
    name: "Medicube Kojic Acid Night Wrapping Mask",
    category: "Medicube",
    price: 25000,
    inStock: true,
  },
  ...safeFeatured.map((p) => ({
    id:
      String(p.id).startsWith("featured-") ? String(p.id) : `featured-${p.id}`,
    name: p.name,
    category: p.brand || "Featured",
    price: p.price,
    inStock: p.inStock ?? true,
  })),
  ...safeSadoer.map((p) => ({
    id: String(p.id).startsWith("sadoer-") ? String(p.id) : `sadoer-${p.id}`,
    name: p.name,
    category: "SADOER",
    price: p.price,
    inStock: p.inStock ?? true,
  })),
];

const catalogProducts = rawCatalog.filter(
  (product, index, self) =>
    index ===
    self.findIndex(
      (p) => p.name.toLowerCase().trim() === product.name.toLowerCase().trim(),
    ),
);

// Zod Validation Schema
const orderSchema = z.object({
  name: z.string().trim().min(1, "Full name required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine((val) => normalizeNigerianPhone(val).isValid, {
      message:
        "Enter a valid 11-digit Nigerian phone number (e.g. 08012345678)",
    }),
  secondPhone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (!val || val.length === 0) return true;
        return normalizeNigerianPhone(val).isValid;
      },
      { message: "Enter a valid 11-digit backup phone number" },
    ),
  state: z.string().trim().min(1, "State is required"),
  address: z.string().trim().min(5, "Delivery address required"),
  productId: z.string().default(catalogProducts[0]?.id || ""),
  quantity: z
    .string()
    .default("1")
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 1, {
      message: "Quantity must be at least 1 unit",
    }),
});

type OrderForm = z.infer<typeof orderSchema>;

interface CartItem {
  productId: string;
  quantity: number;
}

const emptyForm: OrderForm = {
  name: "",
  phone: "",
  secondPhone: "",
  state: "",
  address: "",
  productId: catalogProducts[0]?.id || "",
  quantity: "1",
};

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

interface OrderFormProps {
  selectedProductId?: string;
}

const OrderForm = ({ selectedProductId }: OrderFormProps) => {
  const [formData, setFormData] = useState<OrderForm>(emptyForm);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: emptyForm.productId, quantity: 1 },
  ]);
  const [isCustomQty, setIsCustomQty] = useState(false);
  const [prevSelectedProductId, setPrevSelectedProductId] = useState<
    string | undefined
  >(undefined);
  const [errors, setErrors] = useState<
    Partial<Record<keyof OrderForm, string>>
  >({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const findProduct = (productId: string) =>
    catalogProducts.find(
      (p) =>
        p.id === productId ||
        p.id === `featured-${productId}` ||
        p.id === `sadoer-${productId}`,
    );

  const selectProduct = (productId: string) => {
    const product = findProduct(productId);
    if (!product) return;

    const existingItem = cartItems.find(
      (item) => item.productId === product.id,
    );
    setFormData((prev) => ({
      ...prev,
      productId: product.id,
      quantity: String(existingItem?.quantity || 1),
    }));

    if (!existingItem) {
      setCartItems((prev) => [...prev, { productId: product.id, quantity: 1 }]);
    }
    setIsCustomQty(false);
  };

  const removeProduct = (productId: string) => {
    if (cartItems.length === 1) return;

    const nextItems = cartItems.filter((item) => item.productId !== productId);
    const nextActiveItem = nextItems[0];
    setCartItems(nextItems);
    setFormData((prev) => ({
      ...prev,
      productId: nextActiveItem.productId,
      quantity: String(nextActiveItem.quantity),
    }));
  };

  // Sync auto-selected product during render when selectedProductId changes
  if (selectedProductId !== prevSelectedProductId) {
    setPrevSelectedProductId(selectedProductId);

    if (selectedProductId) {
      const matchedProduct = catalogProducts.find(
        (p) =>
          p.id === selectedProductId ||
          p.id === `featured-${selectedProductId}` ||
          p.id === `sadoer-${selectedProductId}`,
      );

      const nextProductId =
        matchedProduct ? matchedProduct.id : selectedProductId;

      selectProduct(nextProductId);
    }
  }

  // Safe lookup for active product
  const selectedProduct = findProduct(formData.productId) || catalogProducts[0];

  const qtyNumber = Math.max(1, parseInt(formData.quantity) || 1);
  const totalPrice = cartItems.reduce((total, item) => {
    const product = findProduct(item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const handleChange = (field: keyof OrderForm, value: string) => {
    let formattedValue = value;

    if (field === "phone" || field === "secondPhone") {
      formattedValue = formatPhoneDisplay(value);
    }

    const updated = { ...formData, [field]: formattedValue };
    setFormData(updated);

    if (field === "quantity") {
      const nextQuantity = Math.max(1, parseInt(formattedValue) || 1);
      setCartItems((prev) =>
        prev.map((item) =>
          item.productId === formData.productId ?
            { ...item, quantity: nextQuantity }
          : item,
        ),
      );
    }

    if (hasSubmitted && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setHasSubmitted(false);
    setIsCustomQty(false);
    setFormData(emptyForm);
    setCartItems([{ productId: emptyForm.productId, quantity: 1 }]);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const result = orderSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof OrderForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof OrderForm;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const data = result.data;
    const phoneNorm = normalizeNigerianPhone(data.phone);
    const secondPhoneNorm =
      data.secondPhone ? normalizeNigerianPhone(data.secondPhone) : null;

    const message = [
      `\u{1F4E6} *NEW ORDER REQUEST*`,
      ``,
      `*Customer Details:*`,
      `• Name: ${data.name}`,
      `• Phone: ${phoneNorm.international}`,
      secondPhoneNorm?.isValid ?
        `• Backup Phone: ${secondPhoneNorm.international}`
      : "",
      `• State: ${data.state}`,
      `• Delivery Address: ${data.address}`,
      ``,
      `*Order Summary:*`,
      ...cartItems.map((item) => {
        const product = findProduct(item.productId);
        return `• ${product?.name || "Selected Item"} (${product?.category || "General"}) x${item.quantity}`;
      }),
      `• Total Amount: ₦${totalPrice.toLocaleString()}`,
      ``,
      `Please confirm availability and delivery timelines. Thank you!`,
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/2347048603741?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        id='order'
        className='bg-gradient-to-b from-[#FAF8F4] via-[#F4EFEA] to-[#FAF8F4] py-20'
      >
        <div className='max-w-xl mx-auto px-6 text-center'>
          <CheckCircle className='w-16 h-16 text-[#C9A227] mx-auto mb-6' />
          <h2 className='font-serif text-3xl text-[#24211D] mb-4'>
            Order Sent!
          </h2>
          <p className='text-stone-600 mb-2'>We've opened WhatsApp for you.</p>
          <p className='text-stone-500 text-sm mb-8'>
            Send the message to confirm your order details with us.
          </p>
          <button
            type='button'
            onClick={handleReset}
            className='text-[#C9A227] hover:text-white transition-colors text-sm font-medium'
          >
            Place another order
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id='order'
      className='relative overflow-hidden bg-gradient-to-b from-[#FAF8F4] via-[#F4EFEA] to-[#FAF8F4] py-16 md:py-24'
    >
      <div className='absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none' />
      <div className='max-w-xl mx-auto px-6'>
        <div className='text-center mb-10'>
          <p className='uppercase tracking-[0.3em] text-[10px] font-semibold text-[#B89218] mb-3'>
            Private Concierge
          </p>
          <h2 className='font-serif text-3xl md:text-4xl text-[#24211D] mb-4'>
            Get Your Skincare
          </h2>
          <p className='text-stone-600 text-sm leading-relaxed'>
            Fill the form below and we'll reach out to you on WhatsApp to
            confirm your order and answer any questions.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='relative bg-[#FFFDF9] rounded-3xl p-6 md:p-8 space-y-5 border border-[#D4AF37]/30 shadow-2xl shadow-stone-300/40'
          noValidate
        >
          {/* Name */}
          <div>
            <label className='block text-xs font-semibold uppercase tracking-[0.12em] text-stone-700 mb-1.5'>
              Your Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ?
                  "border-red-400 bg-red-50/30"
                : "border-[#E7DED2] bg-[#FAF8F4]"
              } focus:border-[#C9A227] focus:ring-4 focus:ring-[#C9A227]/15 focus:outline-none transition-all placeholder:text-stone-400`}
              placeholder='Enter your full name'
            />
            {errors.name && (
              <p className='mt-1.5 text-xs text-red-500 flex items-center gap-1'>
                <AlertCircle className='w-3.5 h-3.5' /> {errors.name}
              </p>
            )}
          </div>

          {/* Primary Phone */}
          <div>
            <label className='block text-xs font-semibold uppercase tracking-[0.12em] text-stone-700 mb-1.5'>
              Your Phone / WhatsApp Number{" "}
              <span className='text-red-500'>*</span>
            </label>
            <input
              type='tel'
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.phone ?
                  "border-red-400 bg-red-50/30"
                : "border-[#E7DED2] bg-[#FAF8F4]"
              } focus:border-[#C9A227] focus:ring-4 focus:ring-[#C9A227]/15 focus:outline-none transition-all placeholder:text-stone-400`}
              placeholder='e.g. 0801 234 5678'
              maxLength={13}
            />
            {errors.phone && (
              <p className='mt-1.5 text-xs text-red-500 flex items-center gap-1'>
                <AlertCircle className='w-3.5 h-3.5' /> {errors.phone}
              </p>
            )}
          </div>

          {/* Second Phone */}
          <div>
            <label className='block text-xs font-semibold uppercase tracking-[0.12em] text-stone-700 mb-1.5'>
              Second Number{" "}
              <span className='text-gray-400 font-normal'>(optional)</span>
            </label>
            <input
              type='tel'
              value={formData.secondPhone}
              onChange={(e) => handleChange("secondPhone", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.secondPhone ?
                  "border-red-400 bg-red-50/30"
                : "border-[#E7DED2] bg-[#FAF8F4]"
              } focus:border-[#C9A227] focus:ring-4 focus:ring-[#C9A227]/15 focus:outline-none transition-all placeholder:text-stone-400`}
              placeholder='Backup number e.g. 0901 234 5678'
              maxLength={13}
            />
            {errors.secondPhone && (
              <p className='mt-1.5 text-xs text-red-500 flex items-center gap-1'>
                <AlertCircle className='w-3.5 h-3.5' /> {errors.secondPhone}
              </p>
            )}
          </div>

          {/* Custom State Select */}
          <div>
            <CustomStateSelect
              options={states}
              value={formData.state}
              onChange={(value) => handleChange("state", value)}
              error={errors.state}
            />
            {errors.state && (
              <p className='mt-1.5 text-xs text-red-500 flex items-center gap-1'>
                <AlertCircle className='w-3.5 h-3.5' /> {errors.state}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className='block text-xs font-semibold uppercase tracking-[0.12em] text-stone-700 mb-1.5'>
              Delivery Address <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.address ?
                  "border-red-400 bg-red-50/30"
                : "border-[#E7DED2] bg-[#FAF8F4]"
              } focus:border-[#C9A227] focus:ring-4 focus:ring-[#C9A227]/15 focus:outline-none transition-all placeholder:text-stone-400 resize-none`}
              placeholder='Street, area, landmark'
            />
            {errors.address && (
              <p className='mt-1.5 text-xs text-red-500 flex items-center gap-1'>
                <AlertCircle className='w-3.5 h-3.5' /> {errors.address}
              </p>
            )}
          </div>

          {/* Custom Product Selector */}
          <CustomProductSelect
            products={catalogProducts}
            selectedId={selectedProduct?.id || formData.productId}
            onSelect={selectProduct}
            error={errors.productId}
          />

          {/* Selected products */}
          <div className='space-y-2'>
            <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B89218]'>
              Your selection ({cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"})
            </p>
            {cartItems.map((item) => {
              const product = findProduct(item.productId);
              const isActive = item.productId === formData.productId;
              return (
                <div
                  key={item.productId}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${
                    isActive ?
                      "border-[#C9A227]/50 bg-[#FAF8F4]"
                    : "border-[#E7DED2] bg-white"
                  }`}
                >
                  <button
                    type='button'
                    onClick={() => selectProduct(item.productId)}
                    className='min-w-0 flex-1 text-left'
                  >
                    <span className='block truncate text-sm font-medium text-stone-800'>
                      {product?.name}
                    </span>
                    <span className='text-[10px] uppercase tracking-[0.16em] text-stone-400'>
                      {item.quantity} {item.quantity === 1 ? "unit" : "units"}
                    </span>
                  </button>
                  {cartItems.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeProduct(item.productId)}
                      aria-label={`Remove ${product?.name}`}
                      className='rounded-full p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Luxury Skincare Standard Quantity Selector */}
          <div>
            <div className='flex items-center justify-between mb-1.5'>
              <label className='block text-xs font-semibold uppercase tracking-[0.12em] text-stone-700'>
                Quantity <span className='text-red-500'>*</span>
              </label>
              {isCustomQty && (
                <button
                  type='button'
                  onClick={() => {
                    setIsCustomQty(false);
                    handleChange("quantity", "1");
                  }}
                  className='text-xs font-medium text-[#C9A227] hover:underline transition-all'
                >
                  ← Back to options
                </button>
              )}
            </div>

            {!isCustomQty ?
              <div className='grid grid-cols-5 gap-2'>
                {["1", "2", "3", "4"].map((q) => {
                  const isSelected = formData.quantity === q;
                  return (
                    <button
                      key={q}
                      type='button'
                      onClick={() => handleChange("quantity", q)}
                      className={`py-3 rounded-xl border text-sm font-medium transition-all duration-150 ${
                        isSelected ?
                          "border-[#C9A227] bg-[#C9A227] text-white shadow-sm font-semibold"
                        : "border-[#E7DED2] bg-[#FAF8F4] text-stone-700 hover:border-[#C9A227]/60 hover:bg-white"
                      }`}
                    >
                      {q} {q === "1" ? "Unit" : "Units"}
                    </button>
                  );
                })}
                <button
                  type='button'
                  onClick={() => {
                    setIsCustomQty(true);
                    if (["1", "2", "3", "4"].includes(formData.quantity)) {
                      handleChange("quantity", "5");
                    }
                  }}
                  className={`py-3 rounded-xl border text-xs font-semibold transition-all duration-150 ${
                    parseInt(formData.quantity) >= 5 ?
                      "border-[#C9A227] bg-[#C9A227] text-white shadow-sm"
                    : "border-[#E7DED2] bg-[#FAF8F4] text-stone-600 hover:border-[#C9A227]/60 hover:bg-white"
                  }`}
                >
                  5+ Custom
                </button>
              </div>
            : <div className='relative'>
                <input
                  type='number'
                  min='1'
                  value={formData.quantity}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d+$/.test(val)) {
                      handleChange("quantity", val);
                    }
                  }}
                  onBlur={() => {
                    if (!formData.quantity || parseInt(formData.quantity) < 1) {
                      handleChange("quantity", "1");
                    }
                  }}
                  placeholder='Enter number of units'
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.quantity ?
                      "border-red-400 bg-red-50/30"
                    : "border-[#E7DED2] bg-[#FAF8F4]"
                  } focus:border-[#C9A227] focus:ring-4 focus:ring-[#C9A227]/15 focus:outline-none transition-all placeholder:text-stone-400 text-sm font-medium text-stone-800`}
                  autoFocus
                />
                <span className='absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 pointer-events-none'>
                  {parseInt(formData.quantity) === 1 ? "Unit" : "Units"}
                </span>
              </div>
            }

            {errors.quantity && (
              <p className='mt-1.5 text-xs text-red-500 flex items-center gap-1'>
                <AlertCircle className='w-3.5 h-3.5' /> {errors.quantity}
              </p>
            )}
          </div>

          {/* Live Order Summary */}
          <div className='bg-[#FAF8F4] border border-[#C9A227]/40 p-4 rounded-2xl flex items-center justify-between text-sm shadow-sm'>
            <div>
              <p className='text-[10px] text-[#B89218] font-semibold uppercase tracking-[0.2em]'>
                Selected Item
              </p>
              <p className='font-serif text-base text-stone-800 line-clamp-1'>
                {selectedProduct?.name} ({qtyNumber}x)
              </p>
            </div>
            <div className='text-right'>
              <p className='text-[10px] text-[#B89218] font-semibold uppercase tracking-[0.2em]'>
                Total
              </p>
              <p className='font-serif font-semibold text-lg text-[#24211D]'>
                ₦{totalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full flex items-center justify-center gap-2 bg-[#1C1C1C] text-white px-6 py-4 rounded-xl hover:bg-[#C9A227] active:scale-[0.98] transition-all duration-300 font-semibold text-xs uppercase tracking-[0.14em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2'
          >
            <MessageCircle className='w-5 h-5 text-[#DFBF64]' />
            Order via WhatsApp Concierge
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
