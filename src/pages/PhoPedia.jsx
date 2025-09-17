import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Utensils, Leaf, Droplets, Zap } from 'lucide-react';
import { phoPedia } from '../data/mockData';

const PhoPedia = () => {
  const [selectedCategory, setSelectedCategory] = useState('basics');

  const categories = [
    { id: 'basics', name: 'Pho Basics', icon: BookOpen },
    { id: 'broth', name: 'Broth Types', icon: Droplets },
    { id: 'noodles', name: 'Noodles', icon: Utensils },
    { id: 'garnishes', name: 'Garnishes', icon: Leaf },
    { id: 'etiquette', name: 'Pho Etiquette', icon: Star }
  ];

  const phoBasics = [
    {
      title: "What is Pho?",
      content: "Pho (pronounced 'fuh') is a Vietnamese soup consisting of broth, rice noodles, herbs, and meat. It's considered Vietnam's national dish and has gained worldwide popularity for its complex, aromatic broth and fresh ingredients.",
      icon: "🍜"
    },
    {
      title: "History of Pho",
      content: "Pho originated in northern Vietnam in the early 20th century. It was influenced by French colonial cuisine and Chinese cooking techniques. The dish spread throughout Vietnam and eventually to Vietnamese communities worldwide.",
      icon: "📚"
    },
    {
      title: "Regional Variations",
      content: "Northern pho (Hanoi style) features a clear, simple broth with wider noodles. Southern pho (Saigon style) has a sweeter, more complex broth with thinner noodles and more garnishes.",
      icon: "🗺️"
    }
  ];

  const brothTypes = [
    {
      name: "Beef Broth (Pho Bo)",
      description: "The most traditional pho broth, made by simmering beef bones with spices for 6-12 hours. Rich, complex, and deeply flavorful.",
      characteristics: ["Rich and savory", "Clear golden color", "Aromatic spices", "Long cooking time"],
      icon: "🥩"
    },
    {
      name: "Chicken Broth (Pho Ga)",
      description: "Lighter alternative to beef pho, made with chicken bones. Often preferred for its cleaner, more delicate flavor profile.",
      characteristics: ["Lighter flavor", "Faster cooking", "More delicate", "Healthier option"],
      icon: "🐔"
    },
    {
      name: "Vegetarian Broth",
      description: "Modern adaptation using vegetable stock, mushrooms, and aromatic vegetables. Can be just as complex and satisfying as meat-based versions.",
      characteristics: ["Plant-based", "Mushroom depth", "Aromatic vegetables", "Modern innovation"],
      icon: "🥬"
    }
  ];

  const noodleInfo = [
    {
      type: "Thin Noodles (Banh Pho)",
      description: "Most common in southern Vietnam. Quick-cooking and absorb broth well.",
      bestFor: "Traditional pho, quick meals",
      cooking: "1-2 minutes"
    },
    {
      type: "Medium Noodles",
      description: "Balanced texture that works well with most pho styles.",
      bestFor: "Versatile choice, most restaurants",
      cooking: "2-3 minutes"
    },
    {
      type: "Thick Noodles",
      description: "More substantial chew, popular in northern Vietnam.",
      bestFor: "Heartier pho, northern style",
      cooking: "3-4 minutes"
    }
  ];

  const garnishes = [
    {
      name: "Cilantro",
      description: "Fresh, citrusy herb that adds brightness to the rich broth.",
      flavor: "Fresh, citrusy",
      usage: "Sprinkle on top"
    },
    {
      name: "Thai Basil",
      description: "Distinctive anise-like flavor that's essential for authentic pho.",
      flavor: "Anise, slightly sweet",
      usage: "Add leaves whole"
    },
    {
      name: "Bean Sprouts",
      description: "Crunchy texture and mild flavor that balances the richness.",
      flavor: "Mild, crunchy",
      usage: "Add fresh or blanched"
    },
    {
      name: "Lime",
      description: "Acidity cuts through the richness and brightens the flavors.",
      flavor: "Tart, acidic",
      usage: "Squeeze juice in"
    },
    {
      name: "Jalapeños",
      description: "Adds heat and spice to customize your pho experience.",
      flavor: "Spicy, fresh",
      usage: "Slice thinly"
    }
  ];

  const etiquette = [
    {
      title: "Slurping is Encouraged",
      description: "In Vietnamese culture, slurping shows appreciation for the food. It's not rude - it's respectful!",
      tip: "Don't be shy about making noise while eating."
    },
    {
      title: "Customize Your Bowl",
      description: "Pho is meant to be personalized. Add garnishes gradually to find your perfect balance.",
      tip: "Start with a few garnishes and add more as you go."
    },
    {
      title: "Use Both Chopsticks and Spoon",
      description: "Chopsticks for noodles and meat, spoon for broth. This is the traditional way to eat pho.",
      tip: "Hold chopsticks in your dominant hand, spoon in the other."
    },
    {
      title: "Don't Mix Everything at Once",
      description: "Add garnishes gradually to appreciate how each ingredient changes the flavor profile.",
      tip: "Try the broth first, then add herbs and other garnishes one by one."
    }
  ];

  const renderContent = () => {
    switch (selectedCategory) {
      case 'basics':
        return (
          <div style={{ display: 'grid', gap: '20px' }}>
            {phoBasics.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: '25px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ fontSize: '32px' }}>{item.icon}</div>
                  <h3 style={{ margin: 0, color: '#333' }}>{item.title}</h3>
                </div>
                <p style={{ color: '#666', lineHeight: '1.6' }}>{item.content}</p>
              </motion.div>
            ))}
          </div>
        );

      case 'broth':
        return (
          <div style={{ display: 'grid', gap: '20px' }}>
            {brothTypes.map((broth, index) => (
              <motion.div
                key={broth.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: '25px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ fontSize: '32px' }}>{broth.icon}</div>
                  <h3 style={{ margin: 0, color: '#333' }}>{broth.name}</h3>
                </div>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>
                  {broth.description}
                </p>
                <div>
                  <h4 style={{ marginBottom: '10px', color: '#333' }}>Characteristics:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {broth.characteristics.map((char, i) => (
                      <span
                        key={i}
                        style={{
                          background: '#ff6b6b',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '16px',
                          fontSize: '14px'
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'noodles':
        return (
          <div style={{ display: 'grid', gap: '20px' }}>
            {noodleInfo.map((noodle, index) => (
              <motion.div
                key={noodle.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: '25px' }}
              >
                <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>{noodle.type}</h3>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>
                  {noodle.description}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <strong style={{ color: '#333' }}>Best for:</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>{noodle.bestFor}</p>
                  </div>
                  <div>
                    <strong style={{ color: '#333' }}>Cooking time:</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>{noodle.cooking}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'garnishes':
        return (
          <div style={{ display: 'grid', gap: '20px' }}>
            {garnishes.map((garnish, index) => (
              <motion.div
                key={garnish.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: '25px' }}
              >
                <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>{garnish.name}</h3>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>
                  {garnish.description}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <strong style={{ color: '#333' }}>Flavor:</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>{garnish.flavor}</p>
                  </div>
                  <div>
                    <strong style={{ color: '#333' }}>Usage:</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>{garnish.usage}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'etiquette':
        return (
          <div style={{ display: 'grid', gap: '20px' }}>
            {etiquette.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: '25px' }}
              >
                <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>{item.title}</h3>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>
                  {item.description}
                </p>
                <div style={{
                  background: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #ff6b6b'
                }}>
                  <strong style={{ color: '#ff6b6b' }}>Pro Tip:</strong>
                  <p style={{ margin: '5px 0 0 0', color: '#666' }}>{item.tip}</p>
                </div>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '30px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
          <BookOpen size={32} color="#ff6b6b" />
          <h1 style={{ margin: 0, color: '#333' }}>Pho-pedia</h1>
        </div>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Everything you need to know about pho, from basics to expert tips
        </p>
      </motion.div>

      {/* Category Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          overflowX: 'auto',
          paddingBottom: '10px'
        }}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                border: '2px solid',
                borderRadius: '25px',
                background: selectedCategory === category.id ? '#ff6b6b' : 'white',
                color: selectedCategory === category.id ? 'white' : '#ff6b6b',
                borderColor: '#ff6b6b',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <Icon size={18} />
              {category.name}
            </button>
          );
        })}
      </motion.div>

      {/* Content */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default PhoPedia;
