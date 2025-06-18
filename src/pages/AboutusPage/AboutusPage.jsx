import React from "react";
import "./AboutusPage.css";
import EthereumLogo from '../../assets/Eth-logo.svg';
import Card from "./card";



const achievements=[
  
  {
    "title": "ETHIndia Hackathon ",
   "conductedby" : "Devfolio",
    "Mode": "Offline",
    "winner":  "Prateush Sharma",
    "description" : "PrivInsure uses Multi-Party Computation (MPC) to let users check insurance eligibility without revealing personal health data or policy rules, ensuring complete privacy for both parties.",
     "image":  "https://devfolio-prod.s3.ap-south-1.amazonaws.com/hackathons/d64ead180bfc42bda8cee408f6d39b80/assets/cover/316.png",
  },
  {
    "title": "ETHIndia Hackathon",
   "conductedby" : "Devfolio",
    "Mode": "Offline",
    "winner":  "Ayush Ranjan",
    "description" : "A decentralized AML Compliance AVS that flags suspicious DeFi transactions without intermediaries—ensuring transparency, trust, and resistance to manipulation.",
    "image":  "https://devfolio-prod.s3.ap-south-1.amazonaws.com/hackathons/d64ead180bfc42bda8cee408f6d39b80/assets/cover/316.png",
  },

  {
    "title": "Eolas X Algo: Agent Skills Hackathon",
   "conductedby" : "Eolas",
    "Mode": "Online",
    "winner":  " Ram Swaroop Avula and Pavantej Nayini",
    "description" : "Won the prize for their project AI Trump News Agent, an AI-powered tool that tracks, analyzes, and reports on Trump related news. The tool features real-time news aggregation and filtering, summarization, tone customization, fact-checking, and AI generated memes and soundbites.",
    "image": "https://pbs.twimg.com/media/Gmf7Qo2W4AASpQU.jpg"
  },
  {
   "title": "ETHGlobal Tokyo ",
   "conductedby" : "ETHGlobal",
    "Mode": "Offline",
    "winner":  "Aayush Giri",
    "description" : "Clamp is a project that helps users with low crypto literacy invest in digital assets using smart contract wallets. It won multiple awards at ETHGlobal, including Best Innovation (Bunzz), Just Deploy Prize (Scroll), and Pool Prize (Polygon Labs).",
    "image": "https://camo.githubusercontent.com/9fb2fd14ee20b2c03cac48d70458788da33c55d92e5600aaecbf262f578f69c4/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f657468676c6f62616c2d6170692d70726f64756374696f6e2f6576656e7473253246656f61707725324662616e6e6572253246313637383237343836393330385f746f6b796f5f62616e6e6572322e6a7067"
  },
   {
    "title": "Mode AI Agent Hackathon",
   "conductedby" : "Mode",
    "Mode": "Online",
    "winner":  "Ayush Ranjan and Om Santoshwar",
    "description" : " DeFi Score is an AI agent that calculates a user's credit score by analyzing their past on-chain transactions which helps lending protocols assess a user's trustworthiness. It won the Top Project Bounty in the hackathon.",
    "image": "https://i.ytimg.com/vi/LY_EP3axAkQ/maxresdefault.jpg"
  },
   {
    "title": "Starknet Winter Hackathon",
   "conductedby" : "Starknet Foundation",
    "Mode": "Online",
    "winner":  "Ayush Ranjan and Om Santoshwar",
    "description" : " StarkFPI is a Telegram Mini App built on Starknet that enables international travelers to make UPI payments in India using AI agents and ZK proofs for secure, seamless transactions.",
    "image": "https://www.starknet.io/wp-content/uploads/2025/02/image-scaled.jpg"
  },
  {
    "title": "Agentic Ethereum Hackathon",
   "conductedby" : "ETHGlobal",
    "Mode": "Online",
    "winner":  "Anushka Somani",
    "description" : "Clash of Clout is a dApp blending AI-generated memes with crypto trends, featuring social engagement tracking, token staking, and gamified competitions powered by Ethereum and Flow chain.",
    "image": "https://pbs.twimg.com/media/GhbVrIxbUAAWfPZ.jpg"
  },
   {
    "title": "Agentic Ethereum Hackathon",
   "conductedby" : "ETHGlobal",
    "Mode": "Online",
    "winner":  "Akash Mundari, Avula Ram Swaroop and Bhavesh Singh Tomer",
    "description" : "Their project, YieldSage, is an AI-powered platform that analyzes various **DeFi protocols and pools, comparing key parameters like-Returns,Fees,Liquidity,Risks.Using integrated AI agents, YieldSage recommends the best investment opportunities based on real-time data analysis.",
    "image": "https://pbs.twimg.com/media/GhbVrIxbUAAWfPZ.jpg"
  },
  {
    "title": "Agentic Ethereum Hackathon",
   "conductedby" : "ETHGlobal",
    "Mode": "Online",
    "winner":  "Prateush Sharma",
    "description" : "Marp Trade is an AI-powered decentralized trading system for STRK/USDT, using multiple strategies and AI models like reinforcement learning and sentiment analysis to optimize trades and manage risk.",
    "image": "https://pbs.twimg.com/media/GhbVrIxbUAAWfPZ.jpg"
  },
   {
    "title": "Aleph Hackathon",
   "conductedby" : "Aleph Hackathon",
    "Mode": "Online",
    "winner":  "Prateush Sharma",
    "description" : "Won the prize for their project Stellar Orbit.Stellar Orbit is an AI-powered IDE designed to simplify smart contract development on the Stellar Blockchain. With seamless AI-assisted coding, debugging, and deployment, it eliminates the need for complex command-line interactions. The project earned them a well-deserved $2000 prize for revolutionizing Stellar development.",
    "image": "https://www.coinfabrik.com/wp-content/uploads/2024/08/aleph.jpg"
  },
  {
    "title": "Base Hackathon",
   "conductedby" : "Base.org in collaboration with Virtual and Hyperbolic",
    "Mode": "Online",
    "winner":  "Prateush Sharma",
    "description" : "Built a machine learning model using Graph Neural Networks and Zero-Knowledge ML to classify crypto wallets as safe, risky, or dangerous, achieving top accuracy in scam detection while preserving privacy.",
    "image": "https://cdn.dorahacks.io/static/files/193ec23561ad7935693f81d49d3a27d8.png"
  },
]


const AboutusPage = () => {
  return (
    <div className="super--containner">
    <div className="main--containner">
      <h1>❓About Us</h1>
      <div className="content1">

        <p>
          <strong>Indian Institute of Technology (Indian School of Mines), Dhanbad, commonly known as IIT(ISM) Dhanbad</strong>, is one of India’s premier engineering and research institutes. Established in 1926 and elevated to an IIT in 2016, the institute has a rich legacy in technical education and scientific innovation. With a dynamic student community and a growing focus on emerging technologies, IIT(ISM) continues to foster a culture of curiosity, interdisciplinary exploration, and forward-thinking development.
        </p>
        <p> We are a team of individuals from multiple disciplines, driven by the desire of implementing solutions ubounded by the limits of knowledge or techical know-how. 
          Cyberlabs is the official programming club of IIT(ISM) Dhanbad which acts as a platform for the people enthusiastic about technology to work together.
          It was founded post inpiration on the footsteps of MIT MEDIA LABS by an enthusiatic and ticking learner 
          who discovered a scope beyond rote learning and plain-vanilla implementations of the common problems and sci-fi solutions.</p>
          <p>
            We, at Cyberlabs work in many feilds, namely, Web, Android, Machine learning and Deep learning, Blockchain, Information Security and UX. Regular sessions are held for each field. The main aim of our club is to promote a diverse product development as well as R&D Culture amongst the students of IIT(ISM), Dhanbad
          </p>
        <p>
          Within <strong>Cyberlabs, the Blockchain division</strong> stands as a vibrant community of visionaries, builders and enthusiasts united by a shared passion  for decentralized technology
          and the future of the web. Our members explore everything from smart contracts and DeFi to zk-proofs, pushing boundaries
          with every block we build.</p>
          <p><strong> Cyberlabs is where future Web3 leaders are forged.</strong></p>
        
        
        
      </div><br />
      <div className="content2">
       <h1>🎯Achievements</h1>
       <div className="cards-">
        {
           achievements.map((achievement, index) => (
             <Card key={index} achievement={achievement} />
          ))
        }
       </div>
       
      
        </div>
    </div>
    </div>
  );
};

export default AboutusPage;
