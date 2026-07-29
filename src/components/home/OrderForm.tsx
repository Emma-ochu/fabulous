import { useState } from "react";
import { z } from "zod";
import { CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { featuredProducts } from "../../data/products";
import { sadoerProduct } from "../../data/sadoer";
import { CustomProductSelect } from "./CustomProductSelect";
import CustomStateSelect from "./CustomSttateSelect";

// Safe catalog builder preventing undefined map crashes
const safeFeatured = Array.isArray(featuredProducts) ? featuredProducts : [];
const safeSadoer = Array.isArray(sadoerProduct) ? sadoerProduct : [];

const catalogProducts = [
  {
    id: "medicube-night-mask",
    name: "Medicube Kojic Acid Night Wrapping Mask",
    category: "Medicube",
    price: 15000,
  },
  ...safeFeatured.map((p) => ({
    id: `featured-${p.id}`,
    name: p.name,
    category: p.brand || "Featured",
    price: p.price,
  })),
  ...safeSadoer.map((p) => ({
    id: `sadoer-${p.id}`,
    name: p.name,
    category: "SADOER",
    price: p.price,
  })),
];

const orderSchema = z.object({
  name: z.string().trim().min(1, "Full name required"),
  phone: z.string().trim().min(10, "Valid phone number required"),
  secondPhone: z.string().optional(),
  state: z.string().trim().min(1, "State is required"),
  address: z.string().trim().min(5, "Delivery address required"),
  productId: z.string().default(catalogProducts[0]?.id || ""),
  quantity: z.string().default("1"),
});

type OrderForm = z.infer<typeof orderSchema>;

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
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];

const OrderForm = () => {
  const [formData, setFormData] = useState<OrderForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>(
    {}
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedProduct =
    catalogProducts.find((p) => p.id === formData.productId) || catalogProducts[0];
  const qtyNumber = parseInt(formData.quantity) || 1;
  const totalPrice = selectedProduct ? selectedProduct.price * qtyNumber : 0;

  const handleChange = (field: keyof OrderForm, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (hasSubmitted && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setHasSubmitted(false);
    setFormData(emptyForm);
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

    const message = [
      `🛍️ *NEW ORDER REQUEST* 🛍️`,
      ``,
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      data.secondPhone ? `*Second Number:* ${data.secondPhone}` : "",
      `*State:* ${data.state}`,
      `*Delivery Address:* ${data.address}`,
      ``,
      `*Product:* ${selectedProduct?.name || "Selected Item"} (${
        selectedProduct?.category || "General"
      })`,
      `*Quantity:* ${data.quantity} ${
        parseInt(data.quantity) === 1 ? "unit" : "units"
      }`,
      `*Total Amount:* ₦${totalPrice.toLocaleString()}`,
      ``,
      `Please confirm availability and delivery timelines.`,
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/2347048603741?text=${encoded}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="order" className="bg-[#2E2E2E] py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <CheckCircle className="w-16 h-16 text-[#C9A227] mx-auto mb-6" />
          <h2 className="font-serif text-3xl text-white mb-4">Order Sent!</h2>
          <p className="text-gray-300 mb-2">We've opened WhatsApp for you.</p>
          <p className="text-gray-400 text-sm mb-8">
            Send the message to confirm your order details with us.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="text-[#C9A227] hover:text-white transition-colors text-sm font-medium"
          >
            Place another order
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="bg-[#2E2E2E] py-16 md:py-24">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Get Your Skincare
          </h2>
          <p className="text-gray-300 text-sm">
            Fill the form below and we'll reach out to you on WhatsApp to confirm
            your order and answer any questions.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 md:p-8 space-y-5"
          noValidate
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.name ? "border-red-400 bg-red-50/30" : "border-gray-200"
              } focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-colors`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Your Phone / Whatsapp Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.phone ? "border-red-400 bg-red-50/30" : "border-gray-200"
              } focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-colors`}
              placeholder="e.g. 08012345678"
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
              </p>
            )}
          </div>

          {/* Second Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Second Number{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              value={formData.secondPhone}
              onChange={(e) => handleChange("secondPhone", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-colors"
              placeholder="Backup number"
            />
          </div>

          {/* Custom State Select */}
          <CustomStateSelect
            options={states}
            value={formData.state}
            onChange={(value) => handleChange("state", value)}
            error={errors.state}
          />
          {errors.state && (
            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.state}
            </p>
          )}

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Delivery Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.address ? "border-red-400 bg-red-50/30" : "border-gray-200"
              } focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-colors resize-none`}
              placeholder="Street, area, landmark"
            />
            {errors.address && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.address}
              </p>
            )}
          </div>

          {/* Custom Product Selector */}
          <CustomProductSelect
            products={catalogProducts}
            selectedId={formData.productId}
            onSelect={(id) => handleChange("productId", id)}
            error={errors.productId}
          />

          {/* Quantity Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How many would you like? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {["1", "2", "3", "4"].map((qty) => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => handleChange("quantity", qty)}
                  className={`py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    formData.quantity === qty
                      ? "border-[#C9A227] bg-[#C9A227] text-white shadow-sm"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {qty} {qty === "1" ? "Unit" : "Units"}
                </button>
              ))}
            </div>
          </div>

          {/* Live Order Summary */}
          <div className="bg-[#FAF8F4] border border-[#C9A227]/30 p-4 rounded-xl flex items-center justify-between text-sm">
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Selected Item
              </p>
              <p className="font-semibold text-gray-800 line-clamp-1">
                {selectedProduct?.name} ({qtyNumber}x)
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Total
              </p>
              <p className="font-bold text-lg text-[#2E2E2E]">
                ₦{totalPrice.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-xl hover:bg-[#128C7E] active:scale-[0.98] transition-all duration-200 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <MessageCircle className="w-5 h-5" />
            Continue to WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;