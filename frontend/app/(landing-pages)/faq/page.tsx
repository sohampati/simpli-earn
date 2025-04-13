import NavBar from "@/components/Navbar";
import Head from 'next/head';

const faqs = [
  {
    question: "How do I get started?",
    answer: "Press Try Now! Or go to Home and paste in a YouTube link of an earnings call.",
  },
  {
    question: "What are the key features?",
    answer: "SimpliEarn offers a range of features including a clear, beginner-friendly summary of each earnings call with hoverable definitions for financial terms. A time-linked transcript allows users to jump to specific moments in the video. The platform includes a sentiment visualization chart showing emotion changes over time, based on both voice and text analysis. Users can also view a 48-hour stock price chart following the call and interact with a RAG-powered chatbot that answers personalized questions using the content of the call. Users can input a YouTube link of an earnings call or choose from a list of past calls for on-demand analysis.",
  },
  {
    question: "What makes SimpliEarn unique?",
    answer: "SimpliEarn is built specifically for novice investors who may feel overwhelmed by traditional financial reports. Unlike existing tools, it simplifies complex terminology, provides sentiment analysis across both audio and text, and integrates educational elements into a single dashboard. Its interactive chatbot makes learning more engaging, and there are no current products that offer this type of user-friendly earnings call analysis.",
  },
  {
    question: "Who is SimpliEarn for?",
    answer: "SimpliEarn is for retail investors, new traders, and anyone looking to build business and financial literacy. It's ideal for those who want to understand a company's performance without needing a background in finance.",
  },
];

export default function FAQ() {
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
      <Head>
        <title>FAQ | SimpliEarn</title>
      </Head>
      <NavBar />
      <div style={{ padding: '20px', marginTop: '80px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px' }}>FAQ</h1>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              style={{ 
                marginBottom: '20px', 
                borderBottom: '1px solid #333', 
                paddingBottom: '20px' 
              }}
            >
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#81D18D' }}>{faq.question}</h3>
              <p style={{ lineHeight: '1.6' }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}