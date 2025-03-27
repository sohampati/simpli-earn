import NavBar from "@/app/components/navbar";
import Head from 'next/head';

const faqs = [
  {
    question: "How do I get started?",
    answer: "Press Try Now!",
  },
  {
    question: "What?",
    answer: "Yes!",
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