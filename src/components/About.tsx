import React from 'react';
import { ShieldCheck, Award, TrendingUp, Sparkles, Quote } from 'lucide-react';

interface AboutProps {
  onOpenMentorship: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenMentorship }) => {
  return (
    <section id="about" className="py-24 bg-neutral-900 text-neutral-100 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-emerald-400 font-semibold mb-2">
            <span>The Empowerment Body Legacy</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span className="text-neutral-400">Founded for Sovereign Autonomy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
            The Story Behind EB Wealth
          </h2>
          <p className="text-base text-neutral-300 mt-4 leading-relaxed">
            EB Wealth was born out of <strong>Empowerment Body</strong>—a foundational philosophy that true sovereignty requires the alignment of personal discipline, intelligent capital stewardship, and modern technological leverage.
          </p>
        </div>

        {/* Story Grid: The Philosophy & The Founder Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: High-Res CEO Photo with Elegant Framing */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative group">
              {/* Outer decorative gradient border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/30 via-amber-500/20 to-blue-500/30 blur-sm opacity-75 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
                <img
                  src="https://res.cloudinary.com/frl7thhq/image/upload/v1791447447/9a493f0e-a0ed-4fd1-ae45-37d9f285a283.png"
                  alt="Founder & CEO of EB Wealth"
                  className="w-full h-auto object-cover object-center aspect-[3/4] transition duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle bottom gradient vignette */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent p-6 pt-16">
                  <div className="text-lg font-bold text-white font-display">
                    Founder & Chief Executive Officer
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">
                    EB Wealth · Empowerment Body
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-1">
                    <span>Private Capital Strategist</span>
                    <span>·</span>
                    <span>AI Systems Architect</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Trust Badges below photo */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-950/80 border border-neutral-800 rounded-xl text-center">
              <div>
                <span className="block text-xs font-bold text-white">10+ Years</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Capital Strategy</span>
              </div>
              <div className="border-x border-neutral-800">
                <span className="block text-xs font-bold text-emerald-400">100% Direct</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">CEO Advisory</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-amber-400">Global</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Member Network</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Vision & Bio */}
          <div className="lg:col-span-7 space-y-8">
            {/* The Vision & Empowerment Body Origin */}
            <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
              <p>
                In an era dominated by noise, sensationalized trading advice, and complex financial gatekeepers, most high earners remain trapped in the trading of their finite time for capital. Even successful business operators frequently leave their excess liquidity unprotected against inflation, fee drag, and sudden tax liabilities.
              </p>
              <p>
                <strong>Empowerment Body</strong> was founded to shatter that cycle. We believe true wealth is not merely an arbitrary net worth figure—it is the freedom to command your schedule, protect your family’s legacy, and operate with calm authority.
              </p>
              <p>
                As Founder and CEO, my mission is simple: demystify the multi-family office playbook and hand you the exact asset allocation models, syndication frameworks, and private equity principles used by the top 1%. We then fuse this financial mastery with custom AI prompt engineering workflows, allowing you to run your enterprise with unprecedented speed and profit margins.
              </p>
            </div>

            {/* Personal Quote Card */}
            <div className="p-6 bg-neutral-950/90 border-l-4 border-emerald-500 border-y border-r border-neutral-800/80 rounded-r-2xl relative shadow-md">
              <Quote className="w-8 h-8 text-emerald-500/20 absolute right-4 top-4" />
              <p className="text-sm sm:text-base italic text-neutral-200 font-serif leading-relaxed">
                "Wealth is quiet. It doesn't scream for attention. It is built systematically through asymmetrical risk management, multi-generational entity design, and adopting the highest-leverage technological tools before the rest of the market catches on."
              </p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400">— Chief Executive Officer, EB Wealth</span>
                <span className="text-neutral-500 text-[11px]">Personal Manifesto</span>
              </div>
            </div>

            {/* Core Tenets Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Capital Preservation First
                </h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  Rule 1: Never lose principal. Rule 2: Build defensive moat structures before seeking aggressive upside.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl">
                <TrendingUp className="w-5 h-5 text-blue-400 mb-2" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Asymmetric Alpha
                </h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  Vetting private credit, real estate syndications, and unlisted deals where institutional yields exceed public markets.
                </p>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl">
                <Sparkles className="w-5 h-5 text-amber-400 mb-2" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Applied AI Leverage
                </h4>
                <p className="text-xs text-neutral-400 leading-normal">
                  Harnessing specialized prompt architectures and autonomous pipelines to scale your business operations 10x.
                </p>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenMentorship}
                className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-xs rounded-xl transition-all shadow-md cursor-pointer"
              >
                Request Private Advisory With CEO
              </button>
              <span className="text-xs text-neutral-400">
                Direct WhatsApp advisory included in executive tiers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
