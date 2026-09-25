import Layout from "../components/layout/Layout";
import OrderForm from "../components/home/OrderForm";

const Checkout = () => (
  <Layout>
    <main className='bg-[#FAF8F4]'>
      <section className='mx-auto max-w-5xl px-6 pb-4 pt-12 md:px-10 md:pt-16'>
        <p className='text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B89218]'>
          Private concierge
        </p>
        <h1 className='mt-3 font-serif text-4xl text-stone-900 sm:text-5xl'>
          Complete your order.
        </h1>
        <p className='mt-4 max-w-xl text-sm leading-7 text-stone-600'>
          Your selections are saved. Add your delivery details below and we will
          confirm everything with you on WhatsApp.
        </p>
      </section>
      <OrderForm showIntro={false} />
    </main>
  </Layout>
);

export default Checkout;
