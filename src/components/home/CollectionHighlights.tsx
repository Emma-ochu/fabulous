import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getProductBySlug } from "../../data/catalog";
import LazyImage from "./LazyImage";

const medicube = getProductBySlug("medicube-kojic-acid-night-wrapping-mask");
const sadoer = getProductBySlug("collagen-body-lotion");

const CollectionHighlights = () => {
  if (!medicube || !sadoer) return null;

  return (
    <section className='border-y border-[#E7DED2] bg-[#F4EFEA]'>
      <div className='mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-2 md:px-10 md:py-20'>
        <article className='grid items-center gap-6 rounded-3xl border border-[#D8CDBE] bg-[#FFFDF9] p-5 sm:grid-cols-[0.8fr_1fr] sm:p-7'>
          <LazyImage
            src={medicube.image}
            alt={medicube.name}
            className='aspect-square w-full rounded-2xl bg-[#FAF8F4]'
            imgClassName='object-contain'
          />
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B89218]'>
              Overnight ritual
            </p>
            <h2 className='mt-3 font-serif text-3xl leading-tight text-stone-900'>
              A softer start to tomorrow.
            </h2>
            <p className='mt-3 text-sm leading-6 text-stone-600'>
              Meet our Medicube night treatment, chosen for a simple evening
              ritual and a rested-looking finish.
            </p>
            <Link
              to={`/products/${medicube.slug}`}
              className='mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8A6A0D] hover:text-stone-900'
            >
              Discover Medicube <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </article>
        <article className='grid items-center gap-6 rounded-3xl border border-[#D8CDBE] bg-[#FFFDF9] p-5 sm:grid-cols-[0.8fr_1fr] sm:p-7'>
          <LazyImage
            src={sadoer.image}
            alt={sadoer.name}
            className='aspect-square w-full rounded-2xl bg-[#FAF8F4]'
            imgClassName='object-contain'
          />
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B89218]'>
              SADOER Products
            </p>
            <h2 className='mt-3 font-serif text-3xl leading-tight text-stone-900'>
              Everyday care, made easy.
            </h2>
            <p className='mt-3 text-sm leading-6 text-stone-600'>
              Explore nourishing formulas and simple additions for a more
              considered routine.
            </p>
            <Link
              to='/products'
              className='mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8A6A0D] hover:text-stone-900'
            >
              Explore Our Collection of Sadoer <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CollectionHighlights;
