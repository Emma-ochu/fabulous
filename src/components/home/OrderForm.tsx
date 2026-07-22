import { useState } from "react";
import { z } from "zod";
import { CheckCircle, AlertCircle, MessageCircle } from "lucide-react";

const orderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  secondPhone: z.string().optional(),
  state: z.string().min(2, "State is required"),
  address: z.string().min(10, "Full delivery address required"),
  quantity: z.string().regex(/^[12]$/, "Select a quantity"),
});

type OrderForm = z.infer<typeof orderSchema>;

const emptyForm: OrderForm = {
  name: "",
  phone: "",
  secondPhone: "",
  state: "",
  address: "",
  quantity: "" as OrderForm["quantity"],
};

const quantityOptions = [
  { value: "1", label: "1 Set", price: 25000 },
  { value: "2", label: "2 Sets", price: 44000 },
];

const states = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];

const OrderForm = () => {
  const [formData, setFormData] = useState<OrderForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof OrderForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData(emptyForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
    const selectedQty = quantityOptions.find((q) => q.value === data.quantity);

    const message = [
      `Hi, I'd like to place an order.`,
      ``,
      `*Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      data.secondPhone ? `*Second Number:* ${data.secondPhone}` : "",
      `*State:* ${data.state}`,
      `*Delivery Address:*`,
      `${data.address}`,
      ``,
      `*Quantity:*`,
      `${selectedQty?.label}`,
      ``,
      `*Amount:*`,
      `₦${selectedQty?.price.toLocaleString()}`,
      ``,
      `Thank you.`,
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
          <p className="text-gray-300 mb-2">
            We've opened WhatsApp for you.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Send the message to confirm your order and discuss details.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="text-[#C9A227] hover:text-white transition-colors text-sm"
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
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Get Your Skincare
          </h2>
          <p className="text-gray-300 text-sm">
            Fill the form below and we'll reach out to you on WhatsApp to confirm your order and answer any questions.
          </p>
        </div>

        {/* Form */}
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
                errors.name ? "border-red-300 ring-1 ring-red-300" : "border-gray-200"
              } focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-colors`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
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
                errors.phone ? "border-red-300 ring-1 ring-red-300" : "border-gray-200"
              } focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-colors`}
              placeholder="e.g. 08012345678"
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

          {/* Second Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Second Number <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              value={formData.secondPhone}
              onChange={(e) => handleChange("secondPhone", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-colors"
              placeholder="Backup number"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Your State <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.state ? "border-red-300 ring-1 ring-red-300" : "border-gray-200"
              } focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-colors bg-white`}
            >
              <option value="">Select your state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.state}
              </p>
            )}
          </div>

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
                errors.address ? "border-red-300 ring-1 ring-red-300" : "border-gray-200"
              } focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-colors resize-none`}
              placeholder="Street, area, landmark"
            />
            {errors.address && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.address}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How many would you like? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {quantityOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    formData.quantity === option.value
                      ? "border-[#C9A227] bg-[#C9A227]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="quantity"
                    value={option.value}
                    checked={formData.quantity === option.value}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    className="w-4 h-4 text-[#C9A227] border-gray-300 focus:ring-[#C9A227]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.quantity && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.quantity}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-xl hover:bg-[#128C7E] active:scale-[0.98] transition-all duration-200 font-semibold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <MessageCircle className="w-4 h-4" />
            Continue to WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;