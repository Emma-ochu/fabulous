import { useState } from "react";
import { z } from "zod";
import { AlertCircle, CheckCircle, MessageCircle } from "lucide-react";
import { getProductById } from "../../data/catalog";
import { useCart } from "../../hooks/useCart";
import { CustomStateSelect } from "./CustomStateSelect";
import { formatPhoneDisplay, normalizeNigerianPhone } from "../../utils/phone";

const orderSchema = z.object({
  name: z.string().trim().min(1, "Full name required"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine(
      (value) => normalizeNigerianPhone(value).isValid,
      "Enter a valid 11-digit Nigerian phone number (e.g. 08012345678)",
    ),
  secondPhone: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || normalizeNigerianPhone(value).isValid,
      "Enter a valid 11-digit backup phone number",
    ),
  state: z.string().trim().min(1, "State is required"),
  address: z.string().trim().min(5, "Delivery address required"),
});

type OrderFormData = z.infer<typeof orderSchema>;
type FormErrors = Partial<Record<keyof OrderFormData, string>> & {
  cart?: string;
};

const emptyForm: OrderFormData = {
  name: "",
  phone: "",
  secondPhone: "",
  state: "",
  address: "",
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
  showIntro?: boolean;
}

const OrderForm = ({ showIntro = true }: OrderFormProps) => {
  const { items, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState<OrderFormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof OrderFormData, value: string) => {
    const formattedValue =
      field === "phone" || field === "secondPhone" ?
        formatPhoneDisplay(value)
      : value;
    setFormData((current) => ({ ...current, [field]: formattedValue }));
    if (hasSubmitted) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);

    if (items.length === 0) {
      setErrors({
        cart: "Add at least one available product before checking out.",
      });
      return;
    }

    const result = orderSchema.safeParse(formData);
    if (!result.success) {
      const nextErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof OrderFormData;
        nextErrors[field] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    const data = result.data;
    const phone = normalizeNigerianPhone(data.phone);
    const backupPhone =
      data.secondPhone ? normalizeNigerianPhone(data.secondPhone) : null;
    const orderLines = items.map((item) => {
      const product = getProductById(item.productId);
      return `- ${product?.name || "Selected item"} (${product?.category || "Skincare"}) x${item.quantity} - NGN${((product?.price || 0) * item.quantity).toLocaleString()}`;
    });
    const message = [
      "NEW ORDER REQUEST",
      "",
      "Customer Details:",
      `- Name: ${data.name}`,
      `- Phone: ${phone.international}`,
      backupPhone?.isValid ?
        `- Backup Phone: ${backupPhone.international}`
      : "",
      `- State: ${data.state}`,
      `- Delivery Address: ${data.address}`,
      "",
      "Order Summary:",
      ...orderLines,
      `- Total Amount: NGN${subtotal.toLocaleString()}`,
      "",
      "Please confirm availability and delivery timelines. Thank you!",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/2347048603741?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        id='order'
        className='bg-gradient-to-b from-[#FAF8F4] via-[#F4EFEA] to-[#FAF8F4] py-20'
      >
        <div className='mx-auto max-w-xl px-6 text-center'>
          <CheckCircle className='mx-auto mb-6 h-16 w-16 text-[#C9A227]' />
          <h2 className='mb-4 font-serif text-3xl text-[#24211D]'>
            Order sent.
          </h2>
          <p className='mb-2 text-stone-600'>
            WhatsApp is open with your order details.
          </p>
          <p className='mb-8 text-sm text-stone-500'>
            Send the message to confirm availability and delivery with us.
          </p>
          <button
            type='button'
            onClick={() => {
              setSubmitted(false);
              setHasSubmitted(false);
              setFormData(emptyForm);
              clearCart();
            }}
            className='text-sm font-medium text-[#C9A227] hover:text-stone-900'
          >
            Return to shopping
          </button>
        </div>
      </section>
    );
  }

  const fieldClass = (field: keyof OrderFormData) =>
    `w-full rounded-xl border px-4 py-3 outline-none transition-all placeholder:text-stone-400 focus:border-[#C9A227] focus:ring-4 focus:ring-[#C9A227]/15 ${errors[field] ? "border-red-400 bg-red-50/30" : "border-[#E7DED2] bg-[#FAF8F4]"}`;
  const fieldError = (field: keyof OrderFormData) =>
    errors[field] && (
      <p className='mt-1.5 flex items-center gap-1 text-xs text-red-500'>
        <AlertCircle className='h-3.5 w-3.5' />
        {errors[field]}
      </p>
    );

  return (
    <section
      id='order'
      className='relative overflow-hidden bg-gradient-to-b from-[#FAF8F4] via-[#F4EFEA] to-[#FAF8F4] py-16 md:py-24'
    >
      <div className='mx-auto max-w-xl px-6'>
        {showIntro && (
          <div className='mb-10 text-center'>
            <p className='mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B89218]'>
              Private concierge
            </p>
            <h2 className='mb-4 font-serif text-3xl text-[#24211D] md:text-4xl'>
              Complete your order
            </h2>
            <p className='text-sm leading-relaxed text-stone-600'>
              Share your details and we will confirm your selected products,
              availability, and delivery on WhatsApp.
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className='relative space-y-5 rounded-3xl border border-[#D4AF37]/30 bg-[#FFFDF9] p-6 shadow-2xl shadow-stone-300/40 md:p-8'
          noValidate
        >
          <div>
            <label className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-stone-700'>
              Your name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              value={formData.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className={fieldClass("name")}
              placeholder='Enter your full name'
            />
            {fieldError("name")}
          </div>
          <div>
            <label className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-stone-700'>
              Phone / WhatsApp number <span className='text-red-500'>*</span>
            </label>
            <input
              type='tel'
              value={formData.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              className={fieldClass("phone")}
              placeholder='e.g. 0801 234 5678'
              maxLength={13}
            />
            {fieldError("phone")}
          </div>
          <div>
            <label className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-stone-700'>
              Backup number{" "}
              <span className='font-normal text-stone-400'>(optional)</span>
            </label>
            <input
              type='tel'
              value={formData.secondPhone}
              onChange={(event) =>
                handleChange("secondPhone", event.target.value)
              }
              className={fieldClass("secondPhone")}
              placeholder='e.g. 0901 234 5678'
              maxLength={13}
            />
            {fieldError("secondPhone")}
          </div>
          <div>
            <CustomStateSelect
              options={states}
              value={formData.state}
              onChange={(value) => handleChange("state", value)}
              error={errors.state}
            />
            {fieldError("state")}
          </div>
          <div>
            <label className='mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-stone-700'>
              Delivery address <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={formData.address}
              onChange={(event) => handleChange("address", event.target.value)}
              rows={3}
              className={`${fieldClass("address")} resize-none`}
              placeholder='Street, area, landmark'
            />
            {fieldError("address")}
          </div>
          <div className='rounded-2xl border border-[#C9A227]/40 bg-[#FAF8F4] p-4'>
            <div className='flex items-center justify-between'>
              <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B89218]'>
                Your selection
              </p>
              <p className='text-xs text-stone-500'>
                {items.reduce((total, item) => total + item.quantity, 0)} units
              </p>
            </div>
            {items.length === 0 ?
              <p className='mt-3 text-sm text-stone-600'>
                Your bag is empty. Add a product before checking out.
              </p>
            : <div className='mt-3 space-y-2'>
                {items.map((item) => {
                  const product = getProductById(item.productId);
                  return (
                    <div
                      key={item.productId}
                      className='flex justify-between gap-3 text-sm text-stone-700'
                    >
                      <span className='min-w-0 truncate'>
                        {product?.name} x {item.quantity}
                      </span>
                      <span className='shrink-0 font-medium'>
                        NGN
                        {(
                          (product?.price || 0) * item.quantity
                        ).toLocaleString()}
                      </span>
                    </div>
                  );
                })}
                <div className='mt-3 flex justify-between border-t border-[#D8CDBE] pt-3 font-serif text-lg text-stone-900'>
                  <span>Total</span>
                  <span>NGN{subtotal.toLocaleString()}</span>
                </div>
              </div>
            }
            {errors.cart && (
              <p className='mt-2 flex items-center gap-1 text-xs text-red-500'>
                <AlertCircle className='h-3.5 w-3.5' />
                {errors.cart}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='flex w-full items-center justify-center gap-2 rounded-xl bg-[#1C1C1C] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#C9A227] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2'
          >
            <MessageCircle className='h-5 w-5 text-[#DFBF64]' />
            Order via WhatsApp concierge
          </button>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
