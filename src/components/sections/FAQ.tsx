"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "item-1",
    question: "What is HRSEO and how does it work?",
    answer: "HRSEO is a comprehensive SEO tool designed to help businesses improve their search engine rankings. It provides keyword research, SERP analysis, rank tracking, and backlink analysis through an intuitive interface that makes SEO accessible to everyone."
  },
  {
    id: "item-2", 
    question: "How accurate is the keyword research data?",
    answer: "Our keyword research data is sourced from multiple reliable databases and updated regularly. We provide accurate search volume, competition metrics, and trend data to help you make informed SEO decisions."
  },
  {
    id: "item-3",
    question: "Can I track my competitors' rankings?",
    answer: "Yes! HRSEO includes comprehensive competitor analysis features. You can track competitor rankings, analyze their backlink profiles, and discover the keywords they're targeting to stay ahead in your market."
  },
  {
    id: "item-4",
    question: "Is there a free trial available?",
    answer: "We offer a 14-day free trial with full access to all features. No credit card required to get started. You can explore all our tools and see how HRSEO can improve your SEO strategy."
  },
  {
    id: "item-5",
    question: "How often is the ranking data updated?",
    answer: "Ranking data is updated daily for most keywords. Premium plans include real-time tracking for critical keywords, ensuring you never miss important ranking changes."
  },
  {
    id: "item-6",
    question: "Do you provide customer support?",
    answer: "Yes, we provide comprehensive customer support including live chat, email support, and extensive documentation. Our team is available to help you get the most out of HRSEO."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="flex flex-col items-center justify-center w-full relative px-5 md:px-10 py-20">
      <div className="border border-border mx-5 md:mx-4 relative w-full max-w-5xl">
        {/* Left diagonal lines - more subtle */}
        <div className="absolute top-0 -left-4 md:-left-14 h-full w-4 md:w-14 text-[#F15A29]/20 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>
        
        {/* Right diagonal lines - more subtle */}
        <div className="absolute top-0 -right-4 md:-right-14 h-full w-4 md:w-14 text-[#F15A29]/20 bg-[size:10px_10px] [background-image:repeating-linear-gradient(315deg,currentColor_0_1px,#0000_0_50%)]"></div>
        
        {/* Content */}
        <div className="py-20 px-6 md:px-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about HRSEO and how it can help improve your SEO strategy.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border border-border rounded-lg px-6 bg-card hover:bg-accent/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-medium text-foreground hover:text-[#F15A29] transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}