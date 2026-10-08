import React from 'react';
import { ShieldCheck, Award, TrendingUp, Sparkles, Quote, Check, ArrowRight, BookOpen, Compass, Mail, Phone } from 'lucide-react';
import { PageId } from '../types/navigation';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenMentorship: () => void;
  onOpenDisclosures: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenMentorship,
  onOpenDisclosures
}) => {
  return (
    <div className="pt-24 pb-20 text-neutral-100 bg-neutral-950">
      {/* Header Banner */}
      <section className="relative py-16 border-b border-neutral-900 bg-gradient-to-b from-neutral-900/60 to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-3">
            <span>About Empowerment Body & EB Wealth</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Our Origins & Vision</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display max-w-4xl">
            Building Sovereign Wealth Through Discipline, Capital & AI Leverage.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mt-4 leading-relaxed">
            The mission of EB Wealth is rooted in Empowerment Body: transforming high earners from reactive workers into calm, self-directed capital allocators equipped with institutional tools.
          </p>
        </div>
      </section>

      {/* Main Section: The CEO & Founder Executive Profile */}
      <section className="py-20 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: High-Res CEO Photo in a Tailored Suit */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative group">
                {/* Subtle luxury glow border */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/40 via-amber-500/30 to-blue-600/40 blur-md opacity-75 group-hover:opacity-100 transition duration-500" />

                <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
                  <img
                    src="https://res.cloudinary.com/frl7thhq/image/upload/v1791447447/9a493f0e-a0ed-4fd1-ae45-37d9f285a283.png"
                    alt="Founder and Chief Executive Officer of EB Wealth"
                    className="w-full h-auto object-cover object-center aspect-[3/4] transition duration-500 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Scrim overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent p-6 pt-16">
                    <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block mb-0.5">
                      Empowerment Body & EB Wealth
                    </span>
                    <h3 className="text-xl font-bold text-white font-display">
                      Founder & Chief Executive Officer
                    </h3>
                    <p className="text-xs text-neutral-300 mt-0.5">
                      Private Capital Strategist · AI Systems Architect
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Credentials Bar */}
              <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs">
                  <span className="text-neutral-400">Executive Credentials</span>
                  <span className="text-emerald-400 font-mono text-[11px]">VERIFIED LEADERSHIP</span>
                </div>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Founder & CEO, Empowerment Body Global & EB Wealth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Over a decade advising high-net-worth portfolios & private deals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Pioneer in applied AI prompt architectures for enterprise efficiency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct fiduciary advisor to founders, family offices, and operators</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: In-Depth Biography & Vision Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  Leadership Biography
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
                  A Message From the Chief Executive Officer
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p>
                    Throughout my career across private capital, real estate syndications, and business operations, I observed a tragic paradox: brilliant, hardworking individuals who generate enormous top-line income, yet remain in constant financial vulnerability.
                  </p>
                  <p>
                    They are burdened by predatory advisor fees, trapped in high-tax structures, and exposed to unpredictable inflation. At the same time, their businesses are choked by operational friction, forcing founders to sacrifice their physical well-being and personal peace for incremental gains.
                  </p>
                  <p>
                    <strong>Empowerment Body</strong> was born to eliminate this compromise. We recognize that true sovereignty is multifaceted: it demands physical discipline, ruthless operational clarity, and institutional-grade capital stewardship.
                  </p>
                  <p>
                    At EB Wealth, we remove the middlemen. We provide our members with the exact frameworks used by family offices to allocate into private debt, syndicated real estate, and global index alpha. And through our proprietary AI prompt engineering architectures, we give executives the technological leverage to multiply their operational output without expanding headcount.
                  </p>
                </div>
              </div>

              {/* CEO Manifesto Quote Box */}
              <div className="p-6 sm:p-7 bg-neutral-900/90 border-l-4 border-emerald-500 border-y border-r border-neutral-800 rounded-r-2xl relative shadow-lg">
                <Quote className="w-8 h-8 text-emerald-500/20 absolute right-4 top-4" />
                <p className="text-base sm:text-lg italic text-neutral-200 font-serif leading-relaxed">
                  "Wealth is quiet power. It is not about conspicuous consumption or frantic speculation. True wealth is having a fortress balance sheet, zero dependency on any single employer or customer, and automated systems that work for you around the clock."
                </p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-400">— Founder & CEO, EB Wealth</span>
                  <span className="text-neutral-500">Executive Manifesto</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenMentorship}
                  className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Connect with Leadership in EB Wealth App</span>
                </button>
                <button
                  onClick={() => onNavigate('academy')}
                  className="py-3 px-5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-xs rounded-xl border border-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Explore EB Wealth Academy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Story of Empowerment Body Section */}
      <section className="py-20 border-b border-neutral-900 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2 block">
              Foundational Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
              The Empowerment Body Philosophy
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 mt-3">
              Why we view capital allocation as the ultimate expression of personal sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                01. Capital Sovereignty
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Relying solely on active earned income is a point of vulnerability. We teach members how to build compounding asset engines that generate sustainable cashflow independent of their physical labor.
              </p>
            </div>

            <div className="p-7 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                02. Asymmetrical Upside
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Wall Street sells high-fee, average-return funds. We train our community to spot institutional mispricings in private debt, commercial real estate syndicates, and distressed opportunities with capped downside.
              </p>
            </div>

            <div className="p-7 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                03. Technological Leverage
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Capital without time is an incomplete victory. By deploying custom AI prompt engineering workflows and autonomous pipelines, we recover hundreds of hours annually so you can live with presence and clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact & Community Presence */}
      <section className="py-20 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                A Worldwide Community
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
                An Intimate Network of Founders, Investors & Allocators
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                EB Wealth is not an impersonal mass-market course platform. Our community spans over 24 countries, bringing together serial founders, physicians, high-earning tech directors, and private equity operators committed to generational legacy.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
                  <div className="text-2xl font-bold text-white font-display">£50M+</div>
                  <div className="text-xs text-neutral-400 mt-1">Advised Capital Volume</div>
                </div>
                <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-400 font-display">UK-Based</div>
                  <div className="text-xs text-neutral-400 mt-1">Global Private Clients</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-neutral-900/80 border border-neutral-800 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold text-white font-display">
                Connect Directly With Our Advisory Office
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Whether you represent a private family office seeking syndication deal flow or an entrepreneur preparing for a liquidity event, we invite private inquiries.
              </p>
              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="mailto:ebnetworks@outlook.com" className="hover:text-white transition-colors">
                    ebnetworks@outlook.com
                  </a>
                </div>
                <div className="flex items-center gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800/80">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="tel:+447365230302" className="hover:text-white transition-colors">
                    +447365230302
                  </a>
                </div>
              </div>
              <button
                onClick={onOpenMentorship}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Download App to Initiate Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Notice */}
      <section className="py-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
            <span>
              <strong>Regulatory Notice:</strong> Biographies, executive statements, and historical achievements are provided for educational and informational background. EB Wealth does not act as a registered broker-dealer.
            </span>
            <button
              onClick={onOpenDisclosures}
              className="text-emerald-400 hover:text-emerald-300 underline font-medium whitespace-nowrap cursor-pointer"
            >
              Statutory Disclosures
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
