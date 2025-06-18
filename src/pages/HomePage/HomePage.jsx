import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './HomePage.css';
import EthereumLogo from '../../assets/Eth-logo2.svg';
import {
  Timeline as TimelineIcon,
  Code as CodeIcon,
  PeopleAlt as PeopleAltIcon,
  TrendingUp as TrendingUpIcon,
  Celebration as CelebrationIcon,
  RocketLaunch as RocketLaunchIcon,
} from '@mui/icons-material';

const HomePage = () => {

  const [stats, setStats] = useState({
    dapps: 0,
    developers: 0,
    transactions: 0,
  });

  useEffect(() => {
    const targets = { dapps: 1500, developers: 50000, transactions: 1200000 };
    Object.keys(targets).forEach(key => {
      let current = 0;
      const increment = Math.ceil(targets[key] / 100); 
      const interval = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(interval);
        }
        setStats(prev => ({ ...prev, [key]: current }));
      }, 20); 
    });
  }, []);

  const milestones = [
    {
      year: '2025',
      title: 'A Decade of Innovation!',
      description: 'Celebrating 10 years of decentralized progress and looking to the future.',
      icon: <PeopleAltIcon />,
    },
    {
      year: '2022',
      title: 'The Merge',
      description: 'Ethereum transitions from Proof-of-Work to Proof-of-Stake, drastically reducing energy consumption.',
      icon: <TimelineIcon />,
    },
    {
      year: '2021',
      title: 'NFT Mania',
      description: 'Non-Fungible Tokens enter mainstream consciousness, revolutionizing digital ownership.',
      icon: <CelebrationIcon />,
    },
    {
      year: '2020',
      title: 'DeFi Summer',
      description: 'Decentralized Finance applications explode in popularity, locking billions in value.',
      icon: <CodeIcon />,
    },
    {
      year: '2017',
      title: 'ICO Boom & ERC-20',
      description: 'The ERC-20 token standard fuels a wave of Initial Coin Offerings, showcasing Ethereum\'s versatility.',
      icon: <TrendingUpIcon />,
    },
    {
      year: '2015',
      title: 'Ethereum Genesis',
      description: 'The Ethereum network officially launches, enabling smart contracts and dApps.',
      icon: <RocketLaunchIcon/>
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const heroTextVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10,
        delay: 0.3,
      },
    },
  };
  
  const heroLogoVariants = {
    initial: { scale: 0.5, opacity: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.5
      } 
    },
  };

  return (
    <motion.div
      className="homepage-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >

      <motion.section className="hero-section">
        <motion.div className="hero-content" variants={itemVariants}>
          <motion.h1 variants={heroTextVariants}>
            <span className="institute-name">IIT(ISM) Dhanbad Presents</span>
            <br />
            Celebrating <span className="highlight">10 Years</span> of Ethereum
          </motion.h1>
          <motion.p variants={heroTextVariants} style={{ transitionDelay: '0.1ms' }}>
            A decade of decentralization, innovation, and community.
            <br />
            Explore the journey and what's next.
          </motion.p>
          <motion.button 
            className="cta-button"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(134, 168, 231, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
            style={{ transitionDelay: '0.7s' }}
            onClick={() => window.location.href = "../about"}
          >
            Discover More
          </motion.button>
        </motion.div>
        <motion.div 
            className="hero-logo-container"
            variants={heroLogoVariants}
            initial="initial"
            animate="animate"
        >
          <motion.img
            src={EthereumLogo}
            alt="Ethereum Logo"
            className="hero-logo"
            animate={{
              y: [0, -10, 0, 10, 0], 
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.section>

      <motion.section className="stats-section" variants={itemVariants}>
        <motion.h2>Ethereum by the Numbers</motion.h2>
        <div className="stats-grid">
          <motion.div className="stat-card" whileHover={{ y: -5, boxShadow: "0px 8px 20px rgba(127, 127, 213, 0.3)" }}>
            <h3>
              <motion.span>
                {Math.floor(stats.dapps).toLocaleString()}
              </motion.span>+
            </h3>
            <p>DApps Deployed</p>
            <CodeIcon style={{ fontSize: 40, color: '#86a8e7' }} />
          </motion.div>
          <motion.div className="stat-card" whileHover={{ y: -5, boxShadow: "0px 8px 20px rgba(127, 127, 213, 0.3)" }}>
            <h3>
              <motion.span>
                {Math.floor(stats.developers).toLocaleString()}
              </motion.span>+
            </h3>
            <p>Active Developers</p>
            <PeopleAltIcon style={{ fontSize: 40, color: '#86a8e7' }} />
          </motion.div>
          <motion.div className="stat-card" whileHover={{ y: -5, boxShadow: "0px 8px 20px rgba(127, 127, 213, 0.3)" }}>
            <h3>
              <motion.span>
                {Math.floor(stats.transactions).toLocaleString()}
              </motion.span>+
            </h3>
            <p>Daily Transactions (Avg)</p>
            <TrendingUpIcon style={{ fontSize: 40, color: '#86a8e7' }} />
          </motion.div>
        </div>
      </motion.section>
   
      <motion.section className="milestones-section" variants={itemVariants}>
        <motion.h2>Key Milestones</motion.h2>
        <div className="milestones-timeline">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="milestone-card"
              custom={index}
              initial="hidden"
              whileInView="visible" 
              viewport={{ once: true, amount: 0.3 }} 
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                visible: { 
                  opacity: 1, 
                  x: 0, 
                  transition: { 
                    type: 'spring', 
                    stiffness: 50, 
                    delay: 0.2 * index 
                  } 
                },
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0px 10px 30px rgba(134, 168, 231, 0.25)",
                borderColor: '#86a8e7'
              }}
            >
              <div className="milestone-icon">{milestone.icon}</div>
              <div className="milestone-content">
                <h3>{milestone.year}- {milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
     
      <motion.section className="future-section" variants={itemVariants}>
        <h2>The Next Decade of Ethereum</h2>
        <p>
          Ethereum continues to evolve, focusing on scalability, security, and sustainability.
          Join the community in building the future of the decentralized web.
        </p>
        <motion.button
          className="cta-button large-cta"
          whileHover={{ scale: 1.05, backgroundColor: "#86a8e7", color: "#1a1a2e" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = "../trivia"}
        >
          Get Involved
        </motion.button>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;