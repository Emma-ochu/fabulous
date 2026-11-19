import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] bg-[#FAF8F4] flex items-center justify-center px-6 py-20">
        <div className="text-center">
          <h1 className="font-serif text-6xl text-[#2E2E2E]">404</h1>
          <p className="mt-4 text-gray-600">Page not found</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-[#C9A227] hover:text-[#b08d1f] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
