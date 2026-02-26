import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { AIModelTrainingClient } from "@/components/services/AIModelTrainingClient";

const capabilities = [
  {
    title: "Custom Fine-Tuning",
    description:
      "Train models on your proprietary data for domain-specific performance that generic AI can't match.",
  },
  {
    title: "RAG Pipeline Development",
    description:
      "Build retrieval-augmented generation systems that ground AI responses in your knowledge base.",
  },
  {
    title: "Prompt Engineering",
    description:
      "Systematic prompt optimization, evaluation frameworks, and regression testing for production AI.",
  },
  {
    title: "AI Agent Architectures",
    description:
      "Multi-agent systems, tool-use integration, and autonomous workflow orchestration.",
  },
  {
    title: "Evaluation & Monitoring",
    description:
      "Automated quality scoring, hallucination detection, and continuous model performance tracking.",
  },
];

export const metadata: Metadata = {
  title: "Custom AI Model Training | Quartermasters",
  description: "Custom fine-tuning, RAG pipelines, prompt engineering, AI agent architectures, and model evaluation for production AI systems.",
  openGraph: {
    title: "Custom AI Model Training | Quartermasters",
    description: "Custom fine-tuning, RAG pipelines, prompt engineering, AI agent architectures, and model evaluation for production AI systems.",
    url: 'https://quartermasters.me/ai-model-training',
  }
};

export default function AIModelTrainingPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Custom AI Model Training",
        description: "Production-grade AI model training, fine-tuning, and deployment for enterprise applications.",
        url: "https://quartermasters.me/ai-model-training",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <AIModelTrainingClient capabilities={capabilities} />
    </>
  );
}
