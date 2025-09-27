import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LeyCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'stats';
  hoverable?: boolean;
}

const LeyCard = ({ 
  children, 
  className, 
  variant = 'default',
  hoverable = false 
}: LeyCardProps) => {
  const variants = {
    default1: '',
    default: 'card-ley',
    gradient: 'card-gradient',
    stats: 'bg-primary text-primary-foreground rounded-2xl p-6 shadow-primary',
  };

  return (
    <motion.div
      initial={hoverable ? { scale: 1 } : false}
      whileHover={hoverable ? { scale: 1.02, y: -4 } : {}}
      transition={{ duration: 0.2 }}
      className={cn(
        variants[variant],
        hoverable && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default LeyCard;